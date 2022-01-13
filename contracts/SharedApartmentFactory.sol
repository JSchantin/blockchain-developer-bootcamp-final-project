// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";


/// @title Shared Apartment
/// @notice A smart contract that enables an owner to collect rent from a shared apartment
contract SharedApartmentFactory is ReentrancyGuard {

  // Variables

  uint8 private maxRenters = 25; // max renters to prevent for loop in collectRent() getting to big and exeeding the block gas limit

  mapping (address => Apartment) public addressToApartment;

  struct Apartment {
    address owner;
    mapping(address => Renter) renters;
    address[] renterAddresses;
    Rent rent;
  }
  struct Renter {
    address renterAddress;
    uint renterId;
    uint16 strikes;
    bool paidRent;
  }

  struct Rent {
    uint ammount;
    uint collectable;
    uint lastCollected;
  }


  // Events

  event renterAdded(address indexed renter);
  event renterRemoved(address indexed renter);
  event rentPaid(address indexed renter);
  event rentSet(uint indexed rent);
  event rentCollected(uint indexed rentCollected, uint indexed time);
  event apartmentCreated(address indexed creator);

  // Modifiers

  /// @notice makes sure that the address is a renter in the apartment 
  /// @param _renterAddress the address to confirm of the renter
  /// @param _owner the owner of the apartment
  modifier isRenter(address _renterAddress, address _owner) {
    require(_renterAddress == addressToApartment[_owner].renters[_renterAddress].renterAddress, "Address is not a renter!");
    _;
  }

  /// @notice makes sure the address has created an apartment
  /// @param _owner the address to confirm of the owner
  modifier hasApartment(address _owner) {
    require(addressToApartment[_owner].owner == _owner, "This address does not have an apartment!");
    _;
  }

  // Functions

  constructor() {

  }

  /// @notice fallback function always reverts
  fallback() external payable {
    revert("Use the payRent function to pay rent!");
  }

  /// @notice receive function always reverts
  receive() external payable {
    revert("Use the payRent function to pay rent!");
  }

  /// @notice returns the address of a specified renter
  /// @param _owner the owner of the apartment
  /// @param _id the renter id
  /// @return renters the address of the renter via renter id
  function getRenterAddress(address _owner, uint _id) external view returns(address renters) {
    return(addressToApartment[_owner].renterAddresses[_id]);
  }

  /// @notice A function that returns the amount of renters registerd in an Apartment
  /// @param _owner the owneraddress of the apartment
  /// @return uint lenght of renterAddresses array
  function getRenterAddressesLength(address _owner) external view returns(uint) {
    return addressToApartment[_owner].renterAddresses.length;
  }

  /// @notice returns a renter via address
  /// @param _owner the owner of the apartment
  /// @param _renterAddress the renters eth address
  /// @return renter a Renter by address
  function getRenter(address _owner, address _renterAddress) external view returns(Renter memory renter) {
    return(addressToApartment[_owner].renters[_renterAddress]);
  }

  /// @notice creates a new apartment and fills it with default values, checks that it doesnt allready exist, emits event
  function createApartment() external {
    require(addressToApartment[msg.sender].owner != msg.sender, "You allready have an apartment! Delete it before creating a new one.");
    Rent memory rent = Rent(100000,0,block.timestamp - 31 days);
    Apartment storage apartment = addressToApartment[msg.sender];
    apartment.owner = msg.sender;
    apartment.rent = rent;

    emit apartmentCreated(msg.sender);
  }

  /// @notice deletes the apartment of the message sender
  function deleteApartment() external hasApartment(msg.sender) {
    delete addressToApartment[msg.sender];
  }

  /// @notice Adds a Renter and makes sure the renter can not be added twice
  /// @param  _renterAddress the eth address of the renter to be added
  function addRenter(address _renterAddress) external hasApartment(msg.sender) {
    // make sure renters can't be addet twice
    require(_renterAddress != addressToApartment[msg.sender].renters[_renterAddress].renterAddress, "renter allready added!");
    require(addressToApartment[msg.sender].renterAddresses.length < maxRenters, "Max number of renters reached!");

    // add the renter
    Renter memory renter = Renter(_renterAddress, addressToApartment[msg.sender].renterAddresses.length, 0, false);
    addressToApartment[msg.sender].renters[_renterAddress] = renter;
    addressToApartment[msg.sender].renterAddresses.push(_renterAddress);

    emit renterAdded(renter.renterAddress);
  }

    /// @notice removes a Renter that has been added previousely
    /// @param  _renterAddress the eth address of the renter to be removed
  function removeRenter(address _renterAddress) external hasApartment(msg.sender) isRenter(_renterAddress, msg.sender) {
    emit renterRemoved(_renterAddress);

    addressToApartment[msg.sender].renters[addressToApartment[msg.sender].renterAddresses[addressToApartment[msg.sender].renterAddresses.length - 1]].renterId = addressToApartment[msg.sender].renters[_renterAddress].renterId; // give new renter id to renter that takes the place of the renter to delete
    addressToApartment[msg.sender].renterAddresses[addressToApartment[msg.sender].renters[_renterAddress].renterId] = addressToApartment[msg.sender].renterAddresses[addressToApartment[msg.sender].renterAddresses.length - 1]; // overwrite renterAddresses address of the renter to delete with last address of this array
    // delete renter address from renterAddresses and delete renter from renters mapping
    addressToApartment[msg.sender].renterAddresses.pop();
    delete addressToApartment[msg.sender].renters[_renterAddress];
  }

    /// @notice The owner sets a new rent
    /// @param  _rent the new rent
  function setRent(uint _rent) external hasApartment(msg.sender) {
    addressToApartment[msg.sender].rent.ammount = _rent;

    emit rentSet(addressToApartment[msg.sender].rent.ammount);
  }

    /// @notice Checks if 30 days passed since the rent was last collected, transferes the "rent to collect" to the owner, gives renters strikes accordingly and resets their rent paid status
  function collectRent() external hasApartment(msg.sender) nonReentrant() {
    require(block.timestamp >= addressToApartment[msg.sender].rent.lastCollected + 30 days, "Rent was allready collected this month!");
    (bool sent, bytes memory data) = payable(addressToApartment[msg.sender].owner).call{value: addressToApartment[msg.sender].rent.collectable}("");
    require(sent, "Failed to send Ether");
    emit rentCollected(addressToApartment[msg.sender].rent.collectable, block.timestamp);
    addressToApartment[msg.sender].rent.lastCollected = block.timestamp;
    addressToApartment[msg.sender].rent.collectable = 0;

    for(uint i = 0; i < addressToApartment[msg.sender].renterAddresses.length; i++) {
      //punish renters
      if(!(addressToApartment[msg.sender].renters[addressToApartment[msg.sender].renterAddresses[i]].paidRent)) {
        addressToApartment[msg.sender].renters[addressToApartment[msg.sender].renterAddresses[i]].strikes++;
      }
      //reset paidRent
      addressToApartment[msg.sender].renters[addressToApartment[msg.sender].renterAddresses[i]].paidRent = false;
    }
  }

  /// @notice allows the renter to pay rent, after it checks if the renter pays the right amount and has not allready paid rent
  /// @param _apartmentOwner the address of the owner
  function payRent(address _apartmentOwner) external payable hasApartment(_apartmentOwner) isRenter(msg.sender, _apartmentOwner) {
    require(msg.value == addressToApartment[_apartmentOwner].rent.ammount, "You must pay the correct ammount!");
    require(!(addressToApartment[_apartmentOwner].renters[msg.sender].paidRent), "You have allready paid rent this month!");

    addressToApartment[_apartmentOwner].renters[msg.sender].paidRent = true;
    addressToApartment[_apartmentOwner].rent.collectable += msg.value;

    emit rentPaid(msg.sender);
  }
}
