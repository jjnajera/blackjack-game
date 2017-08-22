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
    startCards: function(cards){
      while(this.hand.length < 2){
        let card = cards.shift();
        this.hand.push(card);

        var $image = $(`
            <div class='cards ${card.color}-${card.face}-${card.suit}'></div>
          `);

        $('#user-hand').append($image);
      }


      $('#user-score').text(this.score());
    },
    hit: function(cards) {
      var card = cards.shift();
      this.hand.push(card);

      var $image = $(`
          <div class='cards ${card.color}-${card.face}-${card.suit}'></div>
        `);

      $('#user-hand').append($image);
    },
  }
})();
