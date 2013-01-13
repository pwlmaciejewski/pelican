
define(['backbone', 'mustache', 'text!/templates/songThumb.tmpl'], function(Backbone, Mustache, template) {
  return Backbone.View.extend({
    initialize: function() {
      var _this = this;
      return this.model.on('change', function() {
        return _this.render();
      });
    },
    render: function() {
      this.$el.html(Mustache.render(template, this.model.toJSON()));
      return this;
    }
  });
});
