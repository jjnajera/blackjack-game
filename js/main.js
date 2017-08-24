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

$(function() {
  var Dealer = App.Dealer();
  var Player = App.Player();

  $('.game').on('submit', function(event){
    console.log('button clicked');
    event.preventDefault();

    console.log(cards);
    $('#place-deal').attr('disabled', 'true').css('opacity', '0.4');


    var deckMade = createDeck(DECK_COUNT);

    $('.body').css('opacity', '.3');
    $('.waiting').css('display', 'block');

    setTimeout(function() {
      if(deckMade){
        $('.waiting').hide();
        cards.sort(function(){return 0.5-Math.random()});
        $('#new').css('display', 'flex');
        $('.deal').css('display', 'inline-block').css('opacity', '1');
      }
    },2000);

    $('.bets').on('click', function() {
        var $button = $(this).attr('id');
        placeDeal($button);
    });
  });

  function createDeck(count) {
    if(count === 0){
      setCards();
      return true;
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

  function displayOutcome(result) {
    $('.body').css('opacity', '0.3');
    $('#message').css('display', 'flex');

    $('#message').html(`<h3>${result}</h3>`);

    if(cards.length < 6) {
      cards = [];
      var deckMade = createDeck(DECK_COUNT);
      $('#message').hide();

      $('.waiting').css('display', 'flex');
    }

    setTimeout(function() {
      if(deckMade){
        $('.waiting').hide();
        cards.sort(function(){return 0.5-Math.random()});
        $('#new').css('display', 'flex');
        $('.deal').css('display', 'inline-block').css('opacity', '1');
      }
      else {
        $('#message').hide();

        if(parseInt($('#account').text()) <= 0)
        {
          $('.game-over').css('display', 'flex');
        }
        else{
          $('#new').css('display', 'flex');
          $('.deal').css('display', 'inline-block').css('opacity', '1');
        }
      }
    },2000);
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
            <input type="submit" value="Double" id="double">
          </div>
        </div>
      `);

    $('#container').append($players);

    for(let i = 0; i < 2; i++){
      Dealer.hit(cards);
      Player.hit(cards);
    }

    if(Player.score() === 21){
      dealerFinished();
    }

    $('#double').on('click', function() {
      $(this).attr('disabled', 'true');

      $('#account').text(parseInt($('#account').text())-parseInt($('#bet-total').text()));
      $('#bet-total').text(parseInt($('#bet-total').text())*2);

      Player.hit(cards);

      dealerFinished();
    });

    $('#hit').on('click', function(){
      $('#double').hide();
      disableButtons();

      var result = Player.hit(cards);
      $('#user-score').text(Player.score());

      switch (result) {
        case 'done':
          dealerFinished();
          break;
        case 'busted':
          displayOutcome(result);
      }
    })

    $('#stand').on('click', function(){
      dealerFinished();
    })
  }

  function disableButtons(){
    $('#stand').attr('disabled', 'true');
    $('#hit').attr('disabled', 'true');
  }

  function dealerFinished() {
    var dealersResult = Dealer.turn(cards);
    disableButtons();

    console.log(dealersResult);
    switch (dealersResult) {
      case 'busted':
        displayOutcome('Player won');
        break;
      case 'success':
        whoWon();
        break;
      default:
        setTimeout(dealerFinished, 500);
    }
  }

  function whoWon(){
    if(Player.score() === Dealer.score()){
        displayOutcome('Pushed');
    }
    else if((Player.score() > Dealer.score() && Player.score() <= 21) || Dealer.score() >= 22) {
      $('#account').text(parseInt($('#account').text())+parseInt($('#bet-total').text())*2);
      displayOutcome('Player Won');
    }
    else {
      $('#account').text(parseInt($('#account').text())-parseInt($('#bet-total').text()));
      displayOutcome('Dealer Won');
    }
  }

  function placeDeal($button) {
    disableButtons();
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
        Player.showHitStand();
        startGame();
    }
  }
})
