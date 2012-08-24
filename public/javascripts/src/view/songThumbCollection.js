define(['backbone', 'view/songThumb'], function (Backbone, SongThumb) {
  return Backbone.View.extend({
    tagName: 'ul',

    attributes: {
      className: 'songThumbCollection'
    },

    initialize: function () {
      this.collection.on('reset', this.reset.bind(this));

      this.collection.on('add', function (model) {
        this.add(model);
        this.render();
      }.bind(this));

      this.reset();
    },

    reset: function () {
      this.collection.each(this.add.bind(this));
      this.render();
    },

    add: function (model) {
      var view = new SongThumb({
        model: model,
        tagName: 'li'
      });
      this.views.push(view);
    },
    
    views: [],

    render: function () {
      this.views.forEach(function (view) {
        this.$el.append(view.el);
        view.render();
      }.bind(this));

      return this;
    }
  });
});