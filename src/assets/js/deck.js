(function (app) {
	var suits = {
		'C': 'clubs',
		'D': 'diamonds',
		'H': 'hearts',
		'S': 'spades'
	};
	var cards = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

	var deck = [];
	var keySuits = _.keys(suits);
	_.each(cards, function (c) {
		_.each(keySuits, function (s) {
			deck.push(c + '-' + s);
		});
	});

	app.deck = {
		cards: deck,
		suits: suits
	};
})(app);