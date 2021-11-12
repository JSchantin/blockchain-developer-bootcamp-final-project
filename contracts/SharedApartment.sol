// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract SharedApartment {

  // Variables
  address owner;
  uint rent;

  mapping(address => Renter) renters;
  mapping(uint => Proposal) proposals;

  struct Renter {
    uint strikes;
    uint extra_paid_this_month;
  }

  struct Proposal {
    address creator;
    uint voteYES;
    uint voteNO;
    uint creationTime;
  }

// Functions
function addRenter(address _renter) external onlyOwner() {

}

function removeRenter(address _renter) external onlyOwner() {

}

function collectRent() external onlyOwner() {

}

function payRent() external {

}

function payInContract() {
  
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
