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

function displayOutcome(result) {
  $('.body').css('opacity', '0.3');
  $('#message').css('display', 'flex');

  $('#message').html(`<h3>${result}</h3>`);

  setTimeout(function() {
    $('.body').css('opacity', '1');
    $('#message').css('display', 'none');

    startGame();
  }, 500);
}

function startGame(){
  $('#container').empty();
  Dealer.hand = [];
  Player.hand = [];

  var $players = $(`
      <div class='player dealer'>
        <div id=dealer-hand>
        </div>
        <span id='dealer-score'>0</span>
      </div>
      <div class='player user'>
        <div id=user-hand>
        </div>
        <span id='user-score'>0</span>
        <div class="decision">
          <input type="submit" value="Hit" id="hit">
          <input type="submit" value="Stand" id="stand">
        </div>
      </div>
    `);

  $('#container').append($players);

  Dealer.startCards(cards);
  Player.startCards(cards);

  setTimeout(function() {
    if(Player.score() === 21)
      Dealer.turn();
  }, 200);

  $('#hit').on('click', function(){
    $(this).attr('disabled', 'true');
    $('#stand').attr('disabled', 'true');

    Player.hit(cards);
    $('#user-score').text(Player.score());

    setTimeout(function() {
      if(Player.score() <= 21){
        Player.showHitStand();
      }
      else {
        $('#account').text(parseInt($('#account').text())-parseInt($('#bet-total').text()));
        displayOutcome('busted');
      }
    }, 200);

  })

  $('#stand').on('click', function(){
    $(this).attr('disabled', 'true');
    $('#hit').attr('disabled', 'true');

    console.log(Dealer.turn(cards));

    setTimeout(function() {
      console.log(Dealer.score());
      if(Player.score() === Dealer.score()){
        alert("Push, no one wins");      }
      else if(Player.score() > Dealer.score() || Dealer.score() >= 22) {
        $('#account').text(parseInt($('#account').text())+parseInt($('#bet-total').text())*2);
        displayOutcome('Player Won');
      }
      else {
        $('#account').text(parseInt($('#account').text())-parseInt($('#bet-total').text()));
        displayOutcome('Dealer Won');
      }
      startGame();
    }, 900);
  })
}

$(function() {
  var Dealer = App.Dealer();
  var Player = App.Player();

  $('.game').on('submit', function(event){
    console.log('button clicked');
    event.preventDefault();

    cards.sort(function(){return 0.5-Math.random()});

    $('.body').css('opacity', '.3');
    $('#new').css('display', 'flex');
    $('.deal').css('display', 'inline-block').css('opacity', '1');

    $('.bets').on('click', function() {
      var $button = $(this).attr('id');
      var current;
      var $account = $('#account');
      switch($button){
        case 'one':
          current = parseInt($('#bet-total').text())+1;
          $account.text(parseInt($account.text())-1);
          $('#bet-total').text(current);
          break;
        case 'ten':
          current = parseInt($('#bet-total').text())+10;
          $account.text(parseInt($account.text())-10);
          $('#bet-total').text(current);
          break;
        case 'fifty':
          current = parseInt($('#bet-total').text())+50;
          $account.text(parseInt($account.text())-50);
          $('#bet-total').text(current);
          break;
        default:
          $('#container').addClass('game-wrapper');
          $('.body').css('opacity', '1');
          $('#new').css('display', 'none');
          startGame();
      }
    });
  });
})
