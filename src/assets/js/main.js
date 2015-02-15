(function (app, m, c) {
	var cardTemplate = $("#card-template").html();

	var cards = _.map(_.shuffle(_.clone(app.deck.cards)), function (c) {
		var details = c.split('-');
		return new m.cardModel({
			val: details[0],
			suit: details[1],
			suitName: app.deck.suits[details[1]]
		});
	});
	var deck = new c.cardCollection(cards);
	var game = new m.gameModel({
		deck: deck
	});

	app.game = game;

	var playerView = Backbone.View.extend({

		render: function () {
			var template = $("#player-view-template").html();
			this.$el.html(template);
		},

		renderCards: function() {
			var pileHtml = this.player.pile.map(function(c) {
				return Mustache.render(cardTemplate, c.toJSON());
			});
			this.$('.player-pile').html(pileHtml);

			var handHtml = this.player.hand.map(function(c) {
				return Mustache.render(cardTemplate, c.toJSON());
			});
			this.$('.player-hand').html(handHtml);
			log(this.player.hand.length, this.$el);
		},

		setHand: function () {
			while(this.player.hand.length < 5) {
				this.player.hand.add(this.player.pile.pop());
			}
		},

		initialize: function (o) {
			this.player = o.player;
			this.render();
		}
	})

	var gameView = new (Backbone.View.extend({
		events: {
			'click .btn-deal': 'dealGame'
		},

		renderPiles: function () { 
			this.$pileEl1.find('.pile').html(this.game.pileOne.map(function (c) {
				return Mustache.render(cardTemplate, c.toJSON()); 
			}));
			this.$pileEl2.find('.pile').html(this.game.pileTwo.map(function (c) {
				return Mustache.render(cardTemplate, c.toJSON()); 
			}));
		},

		dealGame: function (ev) {
			this.game.deal();

			this.p1view.setHand();
			this.p1view.renderCards();

			this.p2view.setHand();
			this.p2view.renderCards();
			this.renderPiles();
		},

		initialize: function (o) {
			this.game = o.game;
			this.p1view = new playerView({
				el: '#p1-view',
				player: this.game.playerOne
			});
			this.p2view = new playerView({
				el: '#p2-view',
				player: this.game.playerTwo
			});

			this.$pileEl1 = this.$("#pile1");
			this.$pileEl2 = this.$("#pile2");
		}
	}))({
		el: '#game-view',
		game: game
	})


})(app, app.models, app.collections);