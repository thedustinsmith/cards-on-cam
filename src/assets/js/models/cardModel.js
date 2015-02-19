(function (app, models, coll) {

	models.cardModel = Backbone.Model.extend({

		diff: function (otherCard) {
			var thisVal = this.getIntVal();
			var otherVal = otherCard.getIntVal();

			var diff = thisVal - otherVal;
			if (diff === 12) {
				return 1;
			}
			else if (diff === -12) {
				return -1;
			}

			return diff;
		},

		getIntVal: function () {
			var v = this.get('val');
			var intVal = parseInt(v, 10);

			if (isNaN(intVal)) {
				switch (v) {
					case "J": 
						intVal = 11;
						break;
					case "Q":
						intVal = 12;
						break;
					case "K":
						intVal = 13;
						break;
					case "A":
						intVal = 14;
						break;
				}
			}

			return intVal;
		},

		initialize: function (o) {
			
		}
	});

	coll.cardCollection = Backbone.Collection.extend({
		model: models.cardModel
	});

	if (app.deck) {
		app.deck.cardArray = _.clone(app.deck.cards);
		app.deck.cards = new coll.cardCollection(app.deck.cardArray.map(function (cd, ix) {
			var c = cd.split('-');
			return {
				id: ix,
				val: c[0],
				suit: c[1],
				suitName: app.deck.suits[c[1]]
			};
		}));
	}

})(app, app.models, app.collections);