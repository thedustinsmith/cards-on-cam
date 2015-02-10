(function (app) {

	var CardView = function (card) {
		var details = card.split('-');
		this.suitShort = details[1];
		this.suit = app.deck.suits[this.suitShort];
		this.card = details[0];
	};

	CardView.prototype.template = $("#card-template").html();

	CardView.prototype.render = function (parent) {
		var self = this;
		parent.append(Mustache.render(self.template, {
			suit: self.suit,
			val: self.card
		}));
	};

	var holder = $("#cards");
	var cards = _.map(_.shuffle(_.clone(app.deck.cards)), function (c) {
		var cv = new CardView(c);
		cv.render(holder);
		return cv;
	});

	holder.on('click', '.card', function (ev) {
		var card = $(ev.currentTarget);
		card.toggleClass("card-flipped");
	});

	app.game = {};
	app.game.cards = cards;
})(app);