var Player = (function(){
  return {
    hand: [],
    score: function() {
      return this.hand.reduce(function(total, card) {
        return total + card.value;
      }, 0)
    },
    showHitStand: function(){
      $('.decision').show();
    },
    startCards: function(cards){
      while(this.hand.length < 2){
        this.hand.push(cards.shift());
      }

      console.log(this.score());
      if(this.score() < 21){
        var $decision = $(`
            <div class="decision">
              <input type="submit" value="Hit" id="hit">
              <input type="submit" value="Stand" id="stand">
            </div>
          `);
        $('#container').append($decision);
      }
      else {
        alert('Black jack');
      }
    },
    hit: function(cards) {
      this.hand.push(cards.shift());
    },
    stand: function() {

    }
  }
})();
