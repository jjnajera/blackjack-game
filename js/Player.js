var Player = (function(){
  return {
    hand: [],
    score: function() {
      return this.hand.reduce(function(total, card) {
        return total + card.value;
      }, 0)
    },
    showHitStand: function(){
      $('#hit').removeAttr('disabled');
      $('#stand').removeAttr('disabled');
    },
    hit: function(cards) {
      var card = cards.shift();
      this.hand.push(card);

      var $image = $(`
          <div class='cards ${card.color}-${card.face}-${card.suit}'></div>
        `);

      $('#user-hand').append($image);
      $('#user-score').text(this.score());

      var ace = this.hand.find(function(elem) {
        return elem.value === 11;
      });

        if(Player.score() < 21){
          Player.showHitStand();
        }
        else if(Player.score() === 21){
          return 'done';
        }
        else if(ace){
          ace.value = 1;
          $('#user-score').text(Player.score());
          Player.showHitStand();
        }
        else {
          $('#account').text(parseInt($('#account').text())-parseInt($('#bet-total').text()));
          return 'busted';
        }

        return 'process';
    }
  }
})();
