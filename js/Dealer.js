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
        this.hand.push(cards.shift());
      }
    },
    turn: function(cards){
      if(this.score() <= 16){
        this.hand.push(cards.shift());
        this.turn();
      }
    }
  }
})();
