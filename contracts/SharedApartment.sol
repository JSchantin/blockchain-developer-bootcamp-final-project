// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

/// @notice A smart contract that enables an owner to collect rent from a shared apartment
contract SharedApartment is Ownable {

  // Variables

  uint public rent = 300;
  uint public rentToCollect;
  uint public rentLastCollected;
  uint public fund;

  // TODO every unregisterd address mapps to renter[0] :(
  mapping(address => uint) public addrToRenterId;
  Renter[] public renters;
  struct Renter {
    address renterAddress;
    uint strikes;
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

  modifier onlyRenter() {
    require(addrToRenterId[msg.sender] != 0 || renters[0].renterAddress == msg.sender, "Only a renter can use this function!");
    _;
  }

  // Functions

  constructor() {
    // for testing
    rentLastCollected = block.timestamp - 31 days;
  }

/// @notice renouncing ownership would break the contract
  function renounceOwnership() override public pure {}

    /// @notice Adds a Renter and makes sure the renter can not be added twice
    /// @param  _renterAddress the eth address of the renter to be added
  function addRenter(address _renterAddress) external onlyOwner() {
    // make sure renters can't be addet twice
    require(addrToRenterId[_renterAddress] == 0, "renter allready added!");

    addrToRenterId[_renterAddress] = renters.length;
    Renter memory renter = Renter(_renterAddress, 0, 0, false, 0);
    renters.push(renter);

    emit renterAdded(renter);
  }

    /// @notice removes a Renter that has been added previousely
    /// @param  _renterAddress the eth address of the renter to be removed
  function removeRenter(address _renterAddress) external onlyOwner() {
    // make sure renter exists
    require(addrToRenterId[_renterAddress] != 0, "renter does not exist!");

    emit renterRemoved(renters[addrToRenterId[_renterAddress]]);

    // last element of renters array copied to "to delete" renter
    renters[addrToRenterId[_renterAddress]] = renters[renters.length - 1];
    // addrToRenterId mapping updated to the new ID in the renters array
    addrToRenterId[renters[renters.length - 1].renterAddress] = addrToRenterId[_renterAddress];
    renters.pop();
    delete addrToRenterId[_renterAddress];
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

    for(uint i = 0; i < renters.length; i++) {
      //punish renters
      if(!(renters[i].paidRent)) {
        renters[i].strikes++;
      }
      //reset paidRent
      renters[i].paidRent = false;
    }
  }

  /// @notice lets the renter pay rent, after it checks if the renter pays the right amount and has not allready paid rent
  function payRent() external payable onlyRenter() {
    require(msg.value == rent, "You must pay the correct ammount!");
    require(!(renters[addrToRenterId[msg.sender]].paidRent), "You have allready paid rent this month!");
    renters[addrToRenterId[msg.sender]].paidRent = true;
    rentToCollect += rent;
    emit rentPaid(renters[addrToRenterId[msg.sender]]);

    // give renter SharedApartment Token for paying in Time
    renters[addrToRenterId[msg.sender]].saToken += 100;
    emit saTokenGiven(renters[addrToRenterId[msg.sender]].renterAddress, 100);
  }

  /// @notice lets the renter pay in the fund, which will result in 
  function payInFund() external payable onlyRenter() {
    renters[addrToRenterId[msg.sender]].paidExtra += msg.value;
    fund += msg.value;
    emit paidInFund(renters[addrToRenterId[msg.sender]]);

    // give renter SharedApartment Token
    renters[addrToRenterId[msg.sender]].saToken += msg.value;
    emit saTokenGiven(renters[addrToRenterId[msg.sender]].renterAddress, msg.value);
  }
}
