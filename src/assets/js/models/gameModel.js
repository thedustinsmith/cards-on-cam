(function (models, coll) {

	models.gameModel = Backbone.Model.extend({

		deal: function () {
			var piles = [this.pileOne, this.pileTwo];
			var playerPiles = [this.playerOne.pile, this.playerTwo.pile];
			// deal 6 card each to the global piles
			// then the rest of the cards go the players in alternating order
			this.deck.each(function (c, ix) {
				if (ix < 12) {
					piles[ix % 2].push(c);
				}
				else {
					playerPiles[ix%2].push(c);
				}
			});
		},

		initialize: function (o) {
			this.playerOne = new models.playerModel();
			this.playerTwo = new models.playerModel();
			this.deck = o.deck;
			this.pileOne = new coll.cardCollection();
			this.pileTwo = new coll.cardCollection();
			this.discardOne = new coll.cardCollection();
			this.discardTwo = new coll.cardCollection();
		}
	});

})(app.models, app.collections);