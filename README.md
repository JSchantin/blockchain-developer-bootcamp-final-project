# Final Project Ideas


# Idea 1: Block Hash guessing game on a ETH smartcontract

This Game is similar to a coin toss. <br>
The User can make a bet whether the next for this game selected Block will have an even or odd hash. (every 100th Block is selected so a game takes around 25 minutes. This variable can also be dynamic to ensure enough bets were placed.)
If he guessed right, he will earn the bets of those, who guessed wrong. <br>


## Game Phases
### Phase A: Betting phase
The next 100th Block is selected to be the betting block <br>
Users can place bets on even or odd <br>
after the 98th block the betting is closed <br>

### Phase B: Winner selection
The 100th Block is mined and the hash is even or odd <br>
Winners and losers are selected accordingly <br>
If necessary the rewards are split accordingly <br>
After that there is a 10 Block withdraw wait time to increase security and make sure the 100th block was valid <br>

## Example User Workflow
User deposits tokens to the contract <br>
User makes bet that the hash of the next 100th Block will be even <br>
wait for the next 100th Block to be mined <br>
if User wins, he will get the betts of users, which lost <br>
If user loses, he will lose his bet to the winners <br>
User van withdraw funds deposited to the contract <br>

## Possible additional features
Users can place asymetrical bets with higher rewards or lower risks, for example the last character of the hash is less/more than 5.


# Idea 2: PC games Library as NFT's on a Blockchain

There are many different platforms for buying games online (steam, ubisoft, origin, ...) but if you buy one game in one onlinestore, you cant transfer it and it is bound to this account forever. A decentraliced proof that you own a game is needed!
If each game is minted as an NFT when bought, it would be possible to sell games you dont need anymore, similiar to how it was with CD's and increase the security in case a platform gets hacked and you loose acces to your account. You would need only one Game Library in which you log in with your ETH Adress. 

To create an incentive for the game studios the number of times a game can be transfered can be limited, a freshly minted game brings special rewards or a transfer fee is implemented.

## How it would work
A game developement studio adds the possibility to buy games as NFTs.<br>
