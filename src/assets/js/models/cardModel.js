(function (models, coll) {

	models.cardModel = Backbone.Model.extend({

		initialize: function (o) {
			this.suit = o.suit;
			this.val = o.val;
		}
	});

	coll.cardCollection = Backbone.Collection.extend({
		model: models.cardModel
	});


})(app.models, app.collections);