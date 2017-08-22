console.log("JS loaded");

var playerHand = [];
var dealerHand = [];

let tempCards = [
  {
    face:'ace',
    value: 11
  },
  {
    face: 'two',
    value: 2
  },
  { face: 'three',
    value: 3
  },
  { face: 'four',
    value: 4
  },
  {
    face: 'five',
    value: 5
  },
  { face: 'six',
    value: 6
  },
  {
    face: 'seven',
    value: 7
  },
  {
    face: 'eight',
    value: 8
  },
  {
    face: 'nine',
    value: 9
  },
  {
    face: 'ten',
    value: 10
  },
  {
    face: 'king',
    value: 10
  },
  {
    face: 'queen',
    value: 10
  },
  {
    face: 'jack',
    value: 10
  }
];


let cards = $.extend(true, [], tempCards);
cards = cards.concat($.extend(true, [], tempCards));
cards = cards.concat($.extend(true, [], tempCards));
cards = cards.concat($.extend(true, [], tempCards));

setCards();

function setCards(){
  for(let i = 0, len = cards.length; i < len; i++){
    let card = cards[i];
    switch(true){
      case (i < 13):
        card.suit = 'hearts';
        card.color = 'red';
        break;
      case (i < 26 && i >= 13):
        card.suit = 'diamonds';
        card.color= 'red';
        break;
      case (i < 39 && i >= 26):
        card.suit = 'spades';
        card.color = 'black';
        break;
      default:
        card.suit = 'clovers';
        card.color = 'black';
        break;
    }
  }
}

function getCards(cards, hand){
  for(let i=0;i < 2; i++){
    hand.push(cards.shift());
  }
}

function startGame(){
  $('#container').empty();
  Dealer.hand = [];
  Player.hand = [];

  var $players = $(`
      <div class='player dealer'>
        <div id=dealer-hand>
        </div>
        <span>0</span>
      </div>
      <div class='player user'>
        <div id=user-hand>
        </div>
        <span>0</span>
      </div>
    `);

  $('#container').append($players);

  Dealer.startCards(cards);
  Player.startCards(cards);

  console.log('cards',cards);

  $('#hit').on('click', function(){
    $('.decision').hide();
    Player.hit(cards);

    console.log('player score', Player.hand);

    setTimeout(function() {
      if(Player.score() < 21){
        Player.showHitStand();
      }
      else {
        alert("Dealer wins");
        startGame();
      }
    }, 200);

  })

  $('#stand').on('click', function(){
    $('.decision').hide();
    console.log(Dealer.turn(cards));

    setTimeout(function() {
      console.log(Dealer.score());
      if(Player.score() === Dealer.score()){
        alert("Push, no one wins");
      }
      else if(Player.score() > Dealer.score() || Dealer.score() >= 22) {
        alert("You win");
      }
      else {
        alert('Dealer wins');
      }

      startGame();
    }, 500);
  })
}

$(function() {
  var Dealer = App.Dealer();
  var Player = App.Player();

  $('.game').on('submit', function(event){
    console.log('button clicked');
    event.preventDefault();

    cards.sort(function(){return 0.5-Math.random()});

    startGame();
  })
})
