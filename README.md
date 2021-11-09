# Shared Apartment rent and voting power smart contract

## usecase
If you live in a shared apartment or something similar like a dorm it can be difficult to keep track of who paid rent and if there is a shared bank account, how the money is spent. <br>
A smart contract can fix this problem!

## workflow
- An owner creates the smart contract and sets the rent (will be payed to him)
- The owner adds addresses to the contract as renters
- each renter will have to pay the rent to the SC in order to avoid getting a strike
- renters with 3 strikes will be removed (will result in eviction)
- each renter will have to pay at least 5% (can be voluntary more) of the rent additional into the contract
- every 30 days the owner can collect the rent and 100 "Dorm Token" are minted
  - 50 of these Dorm Tokens will be given to everyone who paid into the contract
  - 50 will be given to everyone who did tasks like cleaning public areas etc. (this data collection will be off chain and will be provided by the owner when collecting the rent)
- renters can vote with these tokens about how the money in the contract is spent (for example buy new chairs, ...) in the process these tokens are burned
- the owner can remove renters form the contract
