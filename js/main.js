let playerHand = [];
let dealerHand = [];
let DECK_COUNT = 4;

let cards = [];

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

createDeck(DECK_COUNT*6);

function createDeck(count) {
  if(count === 0){
    setCards();
    return;
  }
  else{
    cards = cards.concat($.extend(true, [], tempCards));
    return createDeck(count-1);
  }
}

function setCards(){
  for(let i = 0, len = cards.length; i < len; i++){
    let card = cards[i];
    switch(true){
      case (i < 78):
        card.suit = 'hearts';
        card.color = 'red';
        break;
      case (i < 156 && i >= 78):
        card.suit = 'diamonds';
        card.color= 'red';
        break;
      case (i < 234 && i >= 156):
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
    $('#message').css('display', 'none');

    $('#new').css('display', 'flex');
    $('.deal').css('display', 'inline-block').css('opacity', '1');
  }, 700);
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

  if(Player.score() === 21){
    Dealer.turn();
    setTimeout(whoWon, 900);
  }

  $('#hit').on('click', function(){
    $(this).attr('disabled', 'true');
    $('#stand').attr('disabled', 'true');

    Player.hit(cards);
    $('#user-score').text(Player.score());

    var ace = Player.hand.find(function(elem) {
      return elem.value === 11;
    });

    setTimeout(function() {
      if(Player.score() < 21){
        Player.showHitStand();
      }
      else if(Player.score() === 21){
        Dealer.turn(cards);
        setTimeout(whoWon, 900);
      }
      else if(ace){
        ace.value = 1;
        $('#user-score').text(Player.score());
        Player.showHitStand();
      }
      else {
        $('#account').text(parseInt($('#account').text())-parseInt($('#bet-total').text()));
        displayOutcome('Bust');
      }
    }, 200);

  })

  $('#stand').on('click', function(){
    $(this).attr('disabled', 'true');
    $('#hit').attr('disabled', 'true');

    Dealer.turn(cards);

    setTimeout(whoWon, 900);
  })
}

function whoWon(){
  if(Player.score() === Dealer.score()){
      displayOutcome('Pushed');
  }
  else if(Player.score() > Dealer.score() || Dealer.score() >= 22) {
    $('#account').text(parseInt($('#account').text())+parseInt($('#bet-total').text())*2);
    displayOutcome('Player Won');
  }
  else {
    $('#account').text(parseInt($('#account').text())-parseInt($('#bet-total').text()));
    displayOutcome('Dealer Won');
  }
}

function placeDeal($button) {
  var current;
  var $account = $('#account');

  if($('#place-deal').is(':disabled')){
    $('#place-deal').removeAttr('disabled').css('opacity', '1');
  }

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
}

$(function() {
  var Dealer = App.Dealer();
  var Player = App.Player();

  $('.game').on('submit', function(event){
    console.log('button clicked');
    event.preventDefault();

    console.log(cards);
    $('#place-deal').attr('disabled', 'true').css('opacity', '0.4');

    cards.sort(function(){return 0.5-Math.random()});

    $('.body').css('opacity', '.3');
    $('#new').css('display', 'flex');
    $('.deal').css('display', 'inline-block').css('opacity', '1');

    $('.bets').on('click', function() {
        var $button = $(this).attr('id');
        placeDeal($button);
    });
  });
})
