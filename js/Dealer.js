var Dealer = (function() {
  return {
    hand: [],
    score: function() {
      return this.hand.reduce(function(total, card) {
        return total + card.value;
      }, 0)
    },
    hit: function(cards) {
      var dealerHand = this.hand;
      var card = cards.shift();
      dealerHand.push(card);

      var $image = $(`
          <div class='cards ${card.color}-${card.face}-${card.suit}'></div>
        `);

      if(dealerHand.length === 2){
        $image.addClass('back-cover');
      }

      var ace = dealerHand.find(function(elem) {
        return elem.value === 11;
      });

      if(this.score() >= 22 && ace){
        ace.value = 1;
      }

      $('#dealer-hand').append($image);
    },
    turn: function(cards){
      $('.cards').removeClass('back-cover');
      $('#dealer-score').text(this.score());

      var dealerCard = setInterval(function() {
        let score = Dealer.score();
        if(score > 16)
            clearInterval(dealerCard);
        else{
          Dealer.hit(cards);
          $('#dealer-score').text(score);
        }
      }, 350);

      if(this.score() >= 17)
      {
        clearInterval(dealerCard);
        if(this.score() <= 21){
          return 'success';
        }
        else {
          return 'busted';
        }
      }
    }
  }
})();
