// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/upgrades/contracts/Initializable.sol';
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title Shared Apartment
/// @notice A smart contract that enables an owner to collect rent from a shared apartment
contract SharedApartment is Ownable {

  // Variables

  uint public rent = 100;
  uint public rentToCollect;
  uint public rentLastCollected;
  uint8 private maxRenters = 100; // max renters to prevent for loop in collectRent() getting to big

  mapping(address => Renter) public renters;
  address[] public renterAddresses;
  struct Renter {
    address renterAddress;
    uint renterId;
    uint16 strikes;
    bool paidRent;
  }


  // Events

  event renterAdded(address indexed renter);
  event renterRemoved(address indexed renter);
  event rentPaid(address indexed renter);
  event rentSet(uint indexed rent);
  event rentCollected(uint indexed rentCollected, uint indexed time);

  // Modifiers

  modifier isRenter(address _renterAddress) {
    require(_renterAddress == renters[_renterAddress].renterAddress, "Address is not a renter!");
    _;
  }

  // Functions

  constructor() {
    rentLastCollected = block.timestamp - 31 days;
  }

  /// @notice fallback function always reverts
  fallback() external payable {
    revert("Use the payRent function to pay rent!");
  }
  // /// @notice sets the rentLastCollected back 31 days. ONLY FOR DEMONSTRATION, REMOVE FUNCTION BEFORE REAL WORLD USAGE
  // function resetRentLastCollected() public {
  //   rentLastCollected = block.timestamp - 31 days;
  //   // TODO remove before usage!
  // }

  /// @notice override renouncing ownership - does nothing
  function renounceOwnership() override public pure {} // renouncing ownership would make the contract useless

  /// @notice A function that returns the amount of renters registerd in the contract
  /// @return uint lenght of renterAddresses array
  function renterAddressesLength() external view returns(uint) {
    return renterAddresses.length;
  }

  /// @notice Adds a Renter and makes sure the renter can not be added twice
  /// @param  _renterAddress the eth address of the renter to be added
  function addRenter(address _renterAddress) external onlyOwner() {
    // make sure renters can't be addet twice
    require(_renterAddress != renters[_renterAddress].renterAddress, "renter allready added!");
    require(renterAddresses.length < maxRenters);

    // add the renter
    Renter memory renter = Renter(_renterAddress, renterAddresses.length, 0, false);
    renters[_renterAddress] = renter;
    renterAddresses.push(_renterAddress);

    emit renterAdded(renter.renterAddress);
  }

    /// @notice removes a Renter that has been added previousely
    /// @param  _renterAddress the eth address of the renter to be removed
  function removeRenter(address _renterAddress) external onlyOwner() isRenter(_renterAddress) {
    emit renterRemoved(_renterAddress);

    renters[renterAddresses[renterAddresses.length - 1]].renterId = renters[_renterAddress].renterId; // give new renter id to renter that takes the place of the renter to delete
    renterAddresses[renters[_renterAddress].renterId] = renterAddresses[renterAddresses.length - 1]; // overwrite renterAddresses address of the renter to delete with last address of this array
    // delete renter address from renterAddresses and delete renter from renters mapping
    renterAddresses.pop();
    delete renters[_renterAddress];
  }

    /// @notice The owner sets a new rent
    /// @param  _rent the new rent
  function setRent(uint _rent) external onlyOwner() {
    rent = _rent;

    emit rentSet(rent);
  }

    /// @notice Checks if 30 days passed since the rent was last collected, transferes the "rent to collect" to the owner, gives renters strikes accordingly and resets their rent paid status
  function collectRent() external onlyOwner() {
    require(block.timestamp >= rentLastCollected + 30 days, "Rent was allready collected this month!");
    (bool sent, bytes memory data) = payable(owner()).call{value: rentToCollect}("");
    require(sent, "Failed to send Ether");
    emit rentCollected(rentToCollect, block.timestamp);
    rentLastCollected = block.timestamp;
    rentToCollect = 0;

    for(uint i = 0; i < renterAddresses.length; i++) {
      //punish renters
      if(!(renters[renterAddresses[i]].paidRent)) {
        renters[renterAddresses[i]].strikes++;
      }
      //reset paidRent
      renters[renterAddresses[i]].paidRent = false;
    }
  }

  /// @notice allows the renter to pay rent, after it checks if the renter pays the right amount and has not allready paid rent
  function payRent() external payable isRenter(msg.sender) {
    require(msg.value == rent, "You must pay the correct ammount!");
    require(!(renters[msg.sender].paidRent), "You have allready paid rent this month!");
    renters[msg.sender].paidRent = true;
    rentToCollect += rent;
    emit rentPaid(msg.sender);
  }
}
