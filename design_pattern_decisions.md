# design pattern decisions

## Inheritance and Interfaces
This contract inherits openzeppelins _ReentrancyGuard_ which is used in  the collectRent() function. This is the only function at risk of a reentry attack, as it is the only one thas sends ETH in the contract.

## Access Control Design Patterns
This contract uses a role based access controll. Each shared Apartment has an owner and renters with different restrictions. The owner has the abillity to add/remove renters and collect rent while the renter only has the ability to pay rent.