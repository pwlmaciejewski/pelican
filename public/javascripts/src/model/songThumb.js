
define(['backbone'], function(Backbone) {
  return Backbone.Model.extend({
    defaults: {
      url: '',
      thumbnail: '',
      title: ''
    }
  });
});
