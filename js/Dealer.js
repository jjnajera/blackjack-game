var Dealer = (function() {
  return {
    hand: [],
    score: function() {
      return this.hand.reduce(function(total, card) {
        return total + card.value;
      }, 0)
    },
    startCards: function(cards){
      while(this.hand.length < 2){
        let card = cards.shift();
        this.hand.push(card);

        var $cardImage = $(`
            <div class='cards ${card.color}-${card.face}-${card.suit}'></div>
          `);

        if(this.hand.length === 2){
            $cardImage.addClass('back-cover');
        }

        $('#dealer-hand').append($cardImage);
      }
    },
    turn: function(cards){
      $('.cards').removeClass('back-cover');
      setTimeout(function() {
        while(Dealer.score() <= 16){
          let card = cards.shift();
          Dealer.hand.push(card);

          var $cardImage = $(`
              <div class='cards ${card.color}-${card.face}-${card.suit}'></div>
            `);

          $('#dealer-hand').append($cardImage);
        }
      }, 1000);
    }
  }
})();
