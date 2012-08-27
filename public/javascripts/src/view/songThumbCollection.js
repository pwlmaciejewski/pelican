define(['underscore', 'backbone', 'view/songThumb'], function (_, Backbone, SongThumb) {
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
      }, this);

      this.collection.on('remove', function (model) {
        this.remove(model);
        this.render();
      }, this);

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

    remove: function (model) {
      this.views = _(this.views).reject(function (view) {
        if (view.model === model) {
          console.log(view);
        }
        return view.model === model;
      });
    },
    
    views: [],

    render: function () {
      this.$el.html('');
      console.log(this.views);
      this.views.forEach(function (view) {
        this.$el.append(view.el);
        view.render();
      }.bind(this));

      return this;
    }
  });
});