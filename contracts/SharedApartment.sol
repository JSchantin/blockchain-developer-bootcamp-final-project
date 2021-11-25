// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

/// @notice A smart contract that enables an owner to collect rent from a shared apartment
contract SharedApartment is Ownable {

  // Variables

  uint public rent = 100;
  uint public rentToCollect;
  uint public rentLastCollected;
  uint public fund;

  mapping(address => Renter) public renters;
  address[] public renterAddresses;
  struct Renter {
    address renterAddress;
    uint renterId;
    uint16 strikes;
    uint paidExtra;
    bool paidRent;
    uint saToken;
  }


  // Events

  event renterAdded(Renter indexed renter);
  event renterRemoved(Renter indexed renter);
  event rentPaid(Renter indexed renter);
  event paidInFund(Renter indexed renter);
  event rentSet(uint indexed rent);
  event rentCollected(uint indexed rentCollected, uint indexed time);
  event saTokenGiven(address indexed givenTo, uint indexed amount);

  // Modifiers

  modifier isRenter(address _renterAddress) {
    require(_renterAddress == renters[_renterAddress].renterAddress, "Address is not a renter!");
    _;
  }

  // Functions

  constructor() {
    // for testing
    rentLastCollected = block.timestamp - 31 days;
  }

  /// @notice override renouncing ownership - does nothing
  function renounceOwnership() override public pure {} // renouncing ownership would make the contract useless

    /// @notice Adds a Renter and makes sure the renter can not be added twice
    /// @param  _renterAddress the eth address of the renter to be added
  function addRenter(address _renterAddress) external onlyOwner() {
    // make sure renters can't be addet twice
    require(_renterAddress != renters[_renterAddress].renterAddress, "renter allready added!");

    // add the renter
    Renter memory renter = Renter(_renterAddress, renterAddresses.length, 0, 0, false, 0);
    renters[_renterAddress] = renter;
    renterAddresses.push(_renterAddress);

    emit renterAdded(renter);
  }

    /// @notice removes a Renter that has been added previousely
    /// @param  _renterAddress the eth address of the renter to be removed
  function removeRenter(address _renterAddress) external onlyOwner() isRenter(_renterAddress) {
    emit renterRemoved(renters[_renterAddress]);

    // delete renter address from renterAddresses and delete renter from renters mapping
    renterAddresses[renters[_renterAddress].renterId] = renterAddresses[renterAddresses.length - 1];
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
    // TODO use other function to transfer eth
    bool sent = payable(owner()).send(rentToCollect);
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
    emit rentPaid(renters[msg.sender]);

    // give renter SharedApartment Token for paying in Time
    renters[msg.sender].saToken += 100;
    emit saTokenGiven(renters[msg.sender].renterAddress, 100);
  }

  /// @notice lets the renter pay in the fund and rewards him with saTokens
  function payInFund() external payable isRenter(msg.sender) {
    renters[msg.sender].paidExtra += msg.value;
    fund += msg.value;
    emit paidInFund(renters[msg.sender]);

    // give renter SharedApartment Token
    renters[msg.sender].saToken += msg.value;
    emit saTokenGiven(renters[msg.sender].renterAddress, msg.value);
  }
}
