define(['backbone'], function (Backbone) {
  return Backbone.Model.extend({
    defaults: {
      url: 'http://www.youtube.com/watch?v=pBsQVP-Olmw',
      thumbUrl: 'http://img.youtube.com/vi/pBsQVP-Olmw/default.jpg',
      title: 'Kasabian - Days Are Forgotten'
    }
  });
});