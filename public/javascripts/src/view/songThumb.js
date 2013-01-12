
define(['backbone', 'mustache', 'text!/templates/songThumb.tmpl'], function(Backbone, Mustache, template) {
  var _this = this;
  return Backbone.View.extend({
    initialize: function() {
      var _this = this;
      return this.model.on('change', function() {
        return _this.render();
      });
    },
    render: function() {
      _this.$el.html(Mustache.render(template, _this.model.toJSON()));
      return _this;
    }
  });
});
