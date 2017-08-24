var Dealer = (function() {
  return {
    hand: [],
    score: function() {
      return this.hand.reduce(function(total, card) {
        return total + card.value;
      }, 0)
    },
    hit: function(cards) {
      var card = cards.shift();
      this.hand.push(card);

      var $image = $(`
          <div class='cards ${card.color}-${card.face}-${card.suit}'></div>
        `);

      if(this.hand.length === 2){
        $image.addClass('back-cover');
      }

      var ace = this.hand.find(function(elem) {
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

        if(Dealer.score() > 16)
            clearInterval(dealerCard);
        else{
          Dealer.hit(cards);
          $('#dealer-score').text(Dealer.score());
        }
      }, 350);

      if(this.score() >= 17)
      {
        clearInterval(dealerCard);
        console.log('clearing the interval');
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
