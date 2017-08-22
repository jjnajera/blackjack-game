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
        let card = cards.shift();
        this.hand.push(card);

        var $image = $(`
            <div class='cards ${card.color}-${card.face}-${card.suit}'></div>
          `);

        $('#user-hand').append($image);
      }


      $('#user-score').text(this.score());
      if(this.score() < 21){
        var $decision = $(`
            <div class="decision">
              <input type="submit" value="Hit" id="hit">
              <input type="submit" value="Stand" id="stand">
            </div>
          `);
        $('.user').append($decision);
      }
      else {
        alert('Black jack');
      }
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
