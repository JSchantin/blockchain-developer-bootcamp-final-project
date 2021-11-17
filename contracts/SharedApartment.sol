// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

//import "@openzeppelin/contracts/access/Ownable.sol";
//import "@openzeppelin/contracts/security/Pausable.sol";

contract SharedApartment {

  // Variables
  address owner;
  uint rent;
  uint rentReadyToCollect;
  uint rentLastCollected;
  uint fund;


  mapping(address => uint) addrToRenterId;
  Renter[] renters ;
  mapping(uint => Proposal) proposals;

  struct Renter {
    address renterAddress;
    uint strikes;
    uint paidExtra;
    bool paidRent;
  }

  struct Proposal {
    address creator;
    uint voteYES;
    uint voteNO;
    uint creationTime;
  }

// Events

event renterAdded(Renter renter);
event renterRemoved(address _renterAddress);

event ownerSet(address _owner);

// Modifiers
modifier onlyOwner() {
  require(msg.sender == owner);
  _;
}

modifier onlyRenter() {
  //TODO
  _;
}

// Functions
constructor() public {
  owner = msg.sender;
  emit ownerSet(owner);
}

function addRenter(address _renterAddress) external onlyOwner() {
  addrToRenterId[_renterAddress] = renters.length;
  Renter memory renter = Renter(_renterAddress, 0, 0, false);
  renters.push(renter);
  emit renterAdded(renter);
}

function getOwner() public view returns(address _owner) {
  return owner;
}

function getRenters() public view returns(Renter[] memory) {
  return renters;
}

function removeRenter(uint _id) external onlyOwner() {
  delete addrToRenterId[renters[_id].renterAddress];
  //array and mapping rearangement
  emit renterRemoved(renters[_id].renterAddress);
  renters[_id] = renters[renters.length - 1];
  renters.pop();
  addrToRenterId[renters[_id].renterAddress] = _id;
}

function collectRent() external onlyOwner() {
  require(rentLastCollected >= rentLastCollected + 30 days, "Rent was allready collected this month!"); // owner can collect rent only once every 30 days
  bool sent = payable(owner).send(rentReadyToCollect);
  //(bool sent, bytes memory data) = owner.call{value: rentReadyToCollect}("");
  require(sent, "Failed to send Ether");
  rentLastCollected = block.timestamp;
  rentReadyToCollect = 0;

  //TODO dormtokens

//   //punish renters
//   address[] memory didntPay = paidNORent();
//   for(uint i = 0; i < didntPay.length; i++) {
//     renters[didntPay[i]].strikes++;
//   }

//   //reset renters
//   for(uint i = 0; i < rentersAddresses.length; i++) {
//     renters[rentersAddresses[i]].paidRent = false;
//   }
}

// function paidNORent() private view returns(Renter[] memory) {
//   Renter[] memory didntPay;
//   for(uint i = 0; i < renters.length; i++) {
//     if(!(renters[i].paidRent)) {
//       didntPay.push(renters[i]);
//     }
//   }
//   return didntPay;
// }

function payRent() external payable onlyRenter() {
  require(msg.value == rent, "You must pay the correct ammount!");
  require(!(renters[getRenterId(msg.sender)].paidRent), "You have allready paid rent this month!");
  renters[getRenterId(msg.sender)].paidRent = true;
  rentReadyToCollect += rent;
}

function payAdditional() external payable onlyRenter() {
  renters[getRenterId(msg.sender)].paidExtra += msg.value;
  fund += msg.value;
}

function getRenterId(address _address) public view returns(uint) {
  return addrToRenterId[_address];
}

// function createProposal() external {

// }

// function voteProposal(bool Yes) external {

// }

// function mintDormTokens() internal {

// }

// function burnDormTokens() internal {

// }
}
