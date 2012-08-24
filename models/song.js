var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
  defaults: {
    id: 0,
    url: '',
    thumbUrl: '',
    title: ''
  }
});