# Blackjack-game

Github-page: https://jjnajera.github.io/blackjack-game/

Turning an interesting casino game into a web application using HTML, CSS and JavaScript.

## Rules of the Game
The main objective of the game is for the player to have a higher hand than the dealer without going over 21.

- Place a bet to before starting the game, then hit the deal button
- If your initial hand is 21, you automatically waiting
  - This is Blackjack, meaning your hand combination is an Ace with any card with a value of 10
- If you don't have a blackjack initially, you can choose to hit, Double or stand
  - Hitting will give you another card. If you hand goes over 21 you lose.
  - Double down doubles you bet, you get one card and you turn ends.
  - Standing ends your turn and begins the dealers turn
- The dealer will hit as long as his hand is less than or equal to 16.
- After the dealers turn has finished, the winner will be displayed
- After each round, make sure to place a bet each time


## Process
### Wireframe
Look at wireframe to see the design process for the game.

### Design Thinking
My approach to the game was getting the logic working, then working on the styling of the page. To get the logic working, I had to figure out how to hold all the cards in the game. I settle on an array of objects with objects holding the important information of the card like the suit, value, face, etc. Once I got the cards set up, I had to figure out how to get the player and dealer to take their turns respectively. For the player, I decided to used buttons. For the dealer I had it getting a card until its hand was over 16. Once the logic was set up, I used styling and jQuery to display the cards and scoring.

<a href="url"><img src="https://github.com/jjnajera/blackjack-game/tree/master/images/start-page.png" align="left" height="400" width="49%" ></a>

<a href="url"><img src="https://github.com/jjnajera/blackjack-game/tree/master/images/game-page.png" align="right" height="400" width="49%" ></a>

After getting the MVP set up, I went back to add features like a loading screening when the deck is being shuffled.


## Technologies Used
- CSS animations to create a loading screen when the deck is being shuffled
- setTimeout to execute functions after some time has passed. This helps in letting my code finished executing other function calls.
- setInterval to execute a block of code repeating until a condition is met.
- callback function to create synchronous sections of
- jQuery to manipulate the DOM
- Sprite sheet to use one image for all the cards and just change the location of the image

## Bugs
When the loading screen pops up, the user can hit the start button multiple times. This means when the user is placing a bet, if they hit the start button the loading will show up with betting screen. Another bug is the user can bet more than what they have. This means their account will be in the negatives.

## Future features
- Allowing the user to split their hand if their starting hand has two cards with the same value, for example: their hand has two 8s.
- Adding computer player to challenge the user. The computer will be able to count cards.
- Give the user a chance to restart the game if they lose everything
- Have the cards slide/spin to their location

## Biggest Wins and challenges
### Biggest Wins
1. Creating the array of objects cards because I ran into an issue with copies of my objects modifying the original object. I basically had a template of all the cards without their suits. When I wanted to create the 52 card deck, I copied the template objects so I can add a suit and color property. The issue was that objects point to the same reference location even if you make copies. To fix this issue I had to use jQuery's extend.

2. Another win was getting to the dealer to display his cards one at a time. Initially, when it was the dealers turn his cards will flip so quickly you couldn't tell he was getting another card. I had to used to setInterval to give each card some time to display before the next call.

### Biggest challenges
1. Was getting the dealer to display his card one at a time.
2. The timing when the user got 21 or decided to stand and letting the dealer turn begin before displaying who won the round.
3. Creating the card array of objects.
