define(['backbone', 'mustache', 'text!/templates/songThumb.tmpl'], function () {
  var Backbone = arguments[0];
  var Mustache = arguments[1];
  var template = arguments[2];

  return Backbone.View.extend({
  	initialize: function () {
  		this.model.on('change', function () {
  			this.render();	
  		}, this);
  	},

    render: function () {
      this.$el.html(Mustache.render(template, this.model.toJSON()));
      return this;
    }
  });
});