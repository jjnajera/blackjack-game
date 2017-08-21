console.log("JS loaded");

var playerHand = [];
var dealerHand = [];

let cards = [
  {
    face:'ace',
    value: 11
  },
  {
    face: '2',
    value: 2
  },
  { face: '3',
    value: 3
  },
  { face: '4',
    value: 4
  },
  {
    face: '5',
    value: 5
  },
  { face: '6',
    value: 6
  },
  {
    face: '7',
    value: 7
  },
  {
    face: '8',
    value: 8
  },
  {
    face: '9',
    value: 9
  },
  {
    face: '10',
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
  }];

function getCards(cards, hand){
  for(let i=0;i < 2; i++){
    hand.push(cards.shift());
  }
}

function hitHand(score){

}

$(function() {
  var Dealer = App.Dealer();
  var Player = App.Player();

  $('.game').on('submit', function(event){
    console.log('button clicked');
    event.preventDefault();

    $('#container').empty();

    cards.sort(function(){return 0.5-Math.random()});

    Dealer.startCards(cards);
    Player.startCards(cards);

    console.log('player hand', Player.hand);
    console.log('dealer hand', Dealer.hand);
    console.log('cards',cards);

    $('#hit').on('click', function(){
      $('.decision').hide();
      Player.hit(cards);

      console.log(Player.hand);
      if(Player.score() < 21){
        Player.showHitStand();
      }
      else {
        alert("Dealer wins");
      }

      console.log(Player.score());
    })

    $('#stand').on('click', function(){
      $('.decision').hide();
      Dealer.turn(cards);

      console.log(Dealer.hand);

      if(Player.score() === Dealer.score()){
        alert("Push, no one wins");
      }
      else if(Player.score() > Dealer.score()) {
        alert("You win");
      }
      else {
        alert('Dealer wins');
      }

      console.log(Dealer.score());
  })

    // getCards(cards, dealerHand);
    // getCards(cards, playerHand);
    //
    // console.log('dealer', dealerHand);
    // console.log('player', playerHand);
    //
    // let playerScore = 0;
    // playerHand.forEach(function(card) {
    //   playerScore += card.value;
    // })
    //
    // if(playerScore < 21){
    //   var $button = $(`
    //       <div class='decision'>
    //         <input class='hit' type='submit' value='Hit'>
    //       </div>
    //     `);
    //
    //   $('#container').append($button);
    //   console.log(playerScore);
    // }
    //
    // $('.hit').on('click', function() {
    //   console.log('player wants to hit');
    //   playerHand.push(cards.shift());
    //   console.log(playerHand);
    // })
  });
})
