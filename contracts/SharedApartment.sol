// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract SharedApartment {

  // Variables
  address payable owner;
  uint rent;
  uint rentReadyToCollect;
  uint rentLastCollected;
  uint maxRenters = 20; //avoid array getting to large
  uint fund;

  address[] rentersAddresses;
  mapping(address => Renter) renters;
  mapping(uint => Proposal) proposals;

  struct Renter {
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

// Functions
function addRenter(address _renter) external onlyOwner() {
  require(renterAddreses.lenght < maxRenters, "The max. ammount of renters is allready reached!");
  renters[_renter] = Renter(0, 0, false);
  rentersAddresses.push(_renter);
}

function removeRenter(address _renter) external onlyOwner() {
  renters[_renter] = undefined;
  rentersAddresses.pop(_renter);
}

function collectRent() external onlyOwner() {
  require(rentLastCollected >= rentLastCollected + 30 days, "Rent was allready collected this month!"); // owner can collect rent only once every 30 days
  (bool sent, bytes memory data) = owner.call{value: rentReadyToCollect}("");
  require(sent, "Failed to send Ether");
  rentLastCollected = now;
  rentReadyToCollect = 0;

  //TODO dormtokens

  //punish renters
  address[] didntPay = paidNORent();
  for(uint i = 0; i < didntPay.lenght; i++) {
    renters(didntPay[i]).strikes++;
  }

  //reset renters
  for(uint i = 0; i < renters.lenght; i++) {
    renters(rentersAddresses[i]).paidRent = false;
  }
}

function paidNORent() view returns(address[]) {
  address[] didntPay;
  for(uint i = 0; i < renters.lenght; i++) {
    if(!(renters(rentersAddresses[i]).paidRent)) {
      paidRent.push(renterAddreses[i]);
    }
  }
  return didntPay;
}

function payRent() external payable {
  //TODO modifier onlyRenter
  require(msg.value == rent, "You must pay the correct ammount!");
  require(!(renters[ms.sender].paidRent), "You have allready paid rent this month!");
  renters[msg.sender].paidRent = true;
  rentReadyToCollect += rent;
}

function payAdditional() payable {
  //onlyRenter
  renters[msg.sender].paidExtra += msg.value;
  fund += msg.value;
}

function createProposal() external {

}

function voteProposal(bool Yes) external {

}

function mintDormTokens() internal {

}

function burnDormTokens() {

}
}
