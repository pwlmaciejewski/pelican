define(['backbone', 'model/songThumb'], function (Backbone, SongThumb) {
  return Backbone.Collection.extend({
    model: SongThumb,

    url: '/api/songs'
  });
});