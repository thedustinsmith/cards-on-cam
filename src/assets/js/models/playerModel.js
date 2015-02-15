(function (models, coll) {

	models.playerModel = Backbone.Model.extend({

		initialize: function() {
			this.hand = new coll.cardCollection();
			this.pile = new coll.cardCollection();
		}
	});

})(app.models, app.collections);