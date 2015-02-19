(function (app, vs, m, c) {
	var cardTemplate = $("#card-template").html();

	// var cards = _.map(_.shuffle(_.clone(app.deck.cards)), function (c) {
	// 	var details = c.split('-');
	// 	return new m.cardModel({
	// 		val: details[0],
	// 		suit: details[1],
	// 		suitName: app.deck.suits[details[1]]
	// 	});
	// });
	var deck = new c.cardCollection(app.deck.cards.clone().shuffle());
	var game = new m.gameModel({
		deck: deck,
		id: 'firstgame'
	});
	game.fetch();
	game.set('name', 'firstgame');
	game.save();
	app.game = game;

	var playerView = Backbone.View.extend({

		events: {
			'click .card': 'cardSelect',
			'click .card.selected': 'unselectCard'
		},

		unselectCard: function (ev) {
			var card = $(ev.currentTarget).removeClass('selected');
			vs.unset('activeCard');
			gameView.unWatchForDrop();
		},

		cardSelect: function (ev) {
			ev.preventDefault();
			var card = $(ev.currentTarget);

			var sel = 'selected';
			card.toggleClass(sel).siblings().removeClass(sel);
			vs.set('activeCard', card.data('id'))
			gameView.watchForDrop();
		},

		render: function () {
			var template = $("#player-view-template").html();
			this.$el.html(template);
		},

		// renderCards: function() {
		// 	var pileHtml = this.player.pile.map(function(c) {
		// 		return Mustache.render(cardTemplate, c.toJSON());
		// 	});
		// 	this.$('.player-pile').html(pileHtml);

		// 	var handHtml = this.player.hand.map(function(c) {
		// 		return Mustache.render(cardTemplate, c.toJSON());
		// 	});
		// 	this.$('.player-hand').html(handHtml);
		// },

		setHand: function () {
			while (this.player.hand.length < 5 && this.player.pile.length) {
				this.player.hand.add(this.player.pile.pop());
			}
		},

		onDiscard: function (card) {
			this.player.hand.remove(card);
		},

		onHandAdd: function (card) {
			this.$('.player-hand').append(Mustache.render(cardTemplate, card.toJSON()));
		},

		onHandRemove: function (card) {
			var el = this.$('.player-hand .card[data-id="' + card.id + '"]');
			el.remove();
			this.setHand();
		},

		onPileAdd: function (card) {
			this.$('.player-pile').append(Mustache.render(cardTemplate, card.toJSON()));
		},

		onPileRemove: function (card) {
			var el = this.$('.player-pile .card[data-id="' + card.id + '"]');
			el.remove();
		},

		initialize: function (o) {
			this.player = o.player;
			this.render();
			vs.on('discard', _.bind(this.onDiscard, this));

			this.player.hand.on('add', _.bind(this.onHandAdd, this));
			this.player.hand.on('remove', _.bind(this.onHandRemove, this));

			this.player.pile.on('add', _.bind(this.onPileAdd, this));
			this.player.pile.on('remove', _.bind(this.onPileRemove, this));
		}
	})

	var gameView = new (Backbone.View.extend({
		events: {
			'click .btn-deal': 'dealGame',
			'click .btn-flip': 'flipCards'
		},

		watchForDrop: function () {
			$(".discard").one('click.gameview', _.bind(this.onDrop, this));
		},

		onDrop: function (ev) {
			var cardId = vs.get('activeCard');
			var card = deck.get(cardId);
			var discard = $(ev.currentTarget);
			var pile = discard.data('pile');

			var top = pile.last();
			var diff = top.diff(card);
			log(diff);
			if (Math.abs(diff) === 1) {
				pile.add(card);
			}
		},

		unWatchForDrop: function () {
			$(".dicard").off('click.gameview');
		},

		flipCards: function (ev) {
			ev.preventDefault();
			this.game.discardOne.add(this.game.pileOne.pop());
			this.game.discardTwo.add(this.game.pileTwo.pop());
		},

		renderPiles: function () { 
			this.$p1Draw.html(this.game.pileOne.map(function (c) {
				return Mustache.render(cardTemplate, c.toJSON()); 
			}));
			this.$p2Draw.html(this.game.pileTwo.map(function (c) {
				return Mustache.render(cardTemplate, c.toJSON()); 
			}));
			log(this.game);
		},

		dealGame: function (ev) {
			this.game.deal();

			this.p1view.setHand();
			this.p2view.setHand();

			this.game.set('dealt', true);
			this.game.save();
		},

		onDiscard: function (pile, card, coll) {
			var newCard = $(Mustache.render(cardTemplate, card.toJSON()));
			newCard.appendTo(pile).addClass('face-up');
			vs.trigger('discard', card);
		},

		onDraw: function (pile, card, coll) {
			var cardEl = pile.find('.card[data-id="' + card.id + '"]');
			cardEl.remove();
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

			var p1 = this.$("#pile1");
			var p2 = this.$("#pile2");
			this.$p1Draw = p1.find('.draw');;
			this.$p2Draw = p2.find('.draw');;
			this.$p1Discard = p1.find('.discard');
			this.$p1Discard.data('pile', this.game.discardOne);
			this.$p2Discard = p2.find('.discard');
			this.$p2Discard.data('pile', this.game.discardTwo);

			this.listenTo(this.game.discardOne, 'add', _.bind(this.onDiscard, this, this.$p1Discard));
			this.listenTo(this.game.discardTwo, 'add', _.bind(this.onDiscard, this, this.$p2Discard));

			this.listenTo(this.game.pileOne, 'remove', _.bind(this.onDraw, this, this.$p1Draw));
			this.listenTo(this.game.pileTwo, 'remove', _.bind(this.onDraw, this, this.$p2Draw));

			this.listenTo(this.game, 'change:dealt', _.bind(this.renderPiles, this));
		}
	}))({
		el: '#game-view',
		game: game
	})


})(app, app.viewstate, app.models, app.collections);