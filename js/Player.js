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

      var score = this.score();

      $('#user-hand').append($image);
      $('#user-score').text(score);

      var ace = this.hand.find(function(elem) {
        return elem.value === 11;
      });

      if(score < 21){
        this.showHitStand();
      }
      else if(score === 21){
        return 'done';
      }
      else if(ace){
        ace.value = 1;
        $('#user-score').text(this.score());
        this.showHitStand();
      }
      else {
        $('#bet-total').text(0);
        return 'busted';
      }

      return 'process';
    }
  }
})();
