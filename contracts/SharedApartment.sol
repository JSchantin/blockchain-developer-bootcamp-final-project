// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

contract SharedApartment {

  // Variables

  address public owner;
  uint public rent = 300;
  uint public rentReadyToCollect;
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
  }


  // Events

  event renterAdded(Renter renter);
  event renterRemoved(Renter renter);
  event ownerSet(address owner);
  event rentPaid(Renter renter);
  event paidInFund(Renter renter);
  event rentSet(uint rent);
  event rentCollected(uint rentCollected, uint time);

  // Modifiers

  modifier onlyOwner() {
    require(msg.sender == owner, "Only the owner can use this function!");
    _;
  }

  modifier onlyRenter() {
    require(addrToRenterId[msg.sender] != 0 || renters[0].renterAddress == msg.sender, "Only a renter can use this function!");
    _;
  }

  // Functions

  constructor() public {
    owner = msg.sender;
    emit ownerSet(owner);
    // for testing purposes
    rentLastCollected = block.timestamp - 31 days;
  }

  function addRenter(address _renterAddress) external onlyOwner() {
    // make sure renters can't be addet twice
    require(addrToRenterId[_renterAddress] == 0, "renter allready added!");

    addrToRenterId[_renterAddress] = renters.length;
    Renter memory renter = Renter(_renterAddress, 0, 0, false);
    renters.push(renter);

    emit renterAdded(renter);
  }

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

  function setRent(uint _rent) external onlyOwner() {
    rent = _rent;

    emit rentSet(rent);
  }

  function collectRent() external onlyOwner() {
    require(block.timestamp >= rentLastCollected + 30 days, "Rent was allready collected this month!"); // owner can collect rent only once every 30 days
    bool sent = payable(owner).send(rentReadyToCollect);
    require(sent, "Failed to send Ether");
    emit rentCollected(rentReadyToCollect, block.timestamp);
    rentLastCollected = block.timestamp;
    rentReadyToCollect = 0;

    //TODO dormtokens

    for(uint i = 0; i < renters.length; i++) {
      //punish renters
      if(!(renters[i].paidRent)) {
        renters[i].strikes++;
      }
      //reset paidRent
      renters[i].paidRent = false;
    }
  }

  function payRent() external payable onlyRenter() {
    require(msg.value == rent, "You must pay the correct ammount!");
    require(!(renters[getRenterId(msg.sender)].paidRent), "You have allready paid rent this month!");
    renters[getRenterId(msg.sender)].paidRent = true;
    rentReadyToCollect += rent;

    emit rentPaid(renters[getRenterId(msg.sender)]);
  }

  function payInFund() external payable onlyRenter() {
    renters[getRenterId(msg.sender)].paidExtra += msg.value;
    fund += msg.value;

    emit paidInFund(renters[getRenterId(msg.sender)]);
  }

  function getRenterId(address _address) public view returns(uint) {
    return addrToRenterId[_address];
  }
}
