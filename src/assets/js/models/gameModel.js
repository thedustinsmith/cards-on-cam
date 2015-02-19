(function (app, models, coll) {

	models.gameModel = Backbone.Firebase.Model.extend({

		urlRoot: app.fbRoot + 'games',

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

		parse: function (data, options) {
			log('parsing', data);

			this.playerOne.set(data.playerOne);
			this.playerTwo.set(data.playerTwo);
			this.deck.reset(data.deck);
			this.pileOne.reset(data.pileOne);
			this.pileTwo.reset(data.pileTwo);
			this.discardOne.reset(data.discardOne);
			this.discardTwo.reset(data.discardTwo);
		},

		toJSON: function() {
			var json = this.attributes;

			json.playerOne = this.playerOne.toJSON();
			json.playerTwo = this.playerTwo.toJSON();
			json.deck = this.deck.toJSON();
			json.pileOne = this.pileOne.toJSON();
			json.pileTwo = this.pileTwo.toJSON();
			json.discardOne = this.discardOne.toJSON();
			json.discardTwo = this.discardTwo.toJSON();
			return json;
		},

		initialize: function (o) {
			this.set('dealt', false);
			this.playerOne = new models.playerModel();
			this.playerTwo = new models.playerModel();
			this.deck = o.deck;
			this.pileOne = new coll.cardCollection();
			this.pileTwo = new coll.cardCollection();
			this.discardOne = new coll.cardCollection();
			this.discardTwo = new coll.cardCollection();
		}
	});

})(app, app.models, app.collections);