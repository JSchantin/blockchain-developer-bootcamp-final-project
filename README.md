# Final Project Ideas


# Idea 1: Block Hash coin toss game on a ETH smartcontract without participation fee

This Game is similar to a coin toss. <br>
The User can make a bet whether the next for this game selected Block will have an even or odd hash. (every 100th Block is selected so a game takes around 25 minutes. This variable can also be dynamic to ensure enough bets were placed.)
If he guessed right, he will earn the bets of those, who guessed wrong. <br>


## Game Phases
### Phase A: Betting phase
The next 100th Block is selected to be the betting block <br>
Users can deposit tokens and place bets on even or odd <br>
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
if User wins, he will get the bet of users, which lost <br>
If user loses, he will lose his bet to the winners <br>
User van withdraw funds deposited to the contract <br>

## Possible additional features
Users can place asymetrical bets with higher rewards or lower risks, for example the last character of the hash is less/more than 5.

# Idea 2: A Chess game on the Blockchain

For very important games of chess, it can be neccessairy to keep the record of every move made secure for a very long time and to make sure every player had the intention to move a piece exactly as he moved it. A smartcontract can be used to ensure all of this. Each move will be represented by a transaction.
