# Shared Apartment smart contract

## usecase
If you live in a shared apartment or something similar, like a dorm, it can be difficult to keep track of who paid rent.<br>
A smart contract can fix this problem!<br>
The owner of the apartment can use this smartcontract to keep track of the rent which is paid in ETH. The renters can use this smartcontract to simplify the process of paying rent.
## workflow
- An owner creates an apartment in the smartcontract and sets the rent
- The owner adds addresses as renters to the apartment
- each renter will have to pay the rent to the contract
- not paying will result in a strike, which can have consequenses
- the owner can collect the rent every 30 days
- the owner can remove renters from the apartment or delete the apartment

<br>
 ETH Address for certification: 0x057EEc37e70DdF2C4a1A4c1d06ABa7CD78C9846e
<br><br>

## Frontend
Connect to the Rinkeby testnet and explore the frontend:
https://jschantin.github.io/blockchain-developer-bootcamp-final-project/

Video walkthrough: https://drive.google.com/file/d/1mxD_1mR7CBT3dHflsl_1GzP--Z240whF/view?usp=sharing

## directory structure
All elements are in the coresponding folders following the default Truffle project structure.
The Frontend is composed of the files _index.html_ and _dapp.js_.

 # Testing and running it locally
Make sure you have npm, Metamask, Ganache and Truffle installed.

 1. clone the repository to your machine and open the terminal in the project folder
 2. Install dependencies: _npm install_
 3. start a ganache testnet on port _8545_
 4. run _truffle test_ to run the unit tests for the contract, all tests should pass
 5. run _truffle migrate_
 6. open the file _dapp.js_: navigate to line 305 and delete the rinkeby _saAddress_ line.<br>Then uncomment the localhost address and replace it with the address your contract was deployed to in the previous step.<br><br>
   _If you have VS Code and the Live Server plugin installed, start the server and skip to step 10_<br><br>
 7. run _npm install http-server -g_ to install http-server globally
 8. run _http-server_ to start the http-server and to use the frontend localy
 9. now you can access the frontend via an address provided be the http-server
 10. make sure the Metamask network is set to local Host
 11. import an account to Metamask provided by ganache to have test ether to use
 12. connect metamask to the website by clicking the "connect metamask" button
   
 Congratulations, you are now able to use the smart contract via the frontend locally!
