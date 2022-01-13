# avoiding common attacks

## SWC-107 Re-entrancy
The contract uses a re-entrancy guard in the _collectRent()_ function.

## SWC-128 DoS With Block Gas Limit
The contract limits the amount of renters possible in an apartment with the _maxRenters_ variable to prevent the loop in the _collectRent()_ function getting to big and hitting the block gas limit.

### Known possible risks
The contract uses the block timestamp so the time between the rent collections can vary slightly from exactly 30 days.<br>
Which renter has paid rent is public if you know their addresses.
