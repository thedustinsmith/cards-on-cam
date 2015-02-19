(function (models, coll) {

	models.playerModel = Backbone.Model.extend({

		toJSON: function () {
			var json = this.attributes;

			json.hand = this.hand.toJSON();
			json.pile = this.pile.toJSON();
			return json;
		},

		initialize: function() {
			this.hand = new coll.cardCollection();
			this.pile = new coll.cardCollection();
		}
	});

})(app.models, app.collections);