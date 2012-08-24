define([
  'jquery',
  'model/songThumb', 
  'view/songThumb'
], function () {
  var $ = arguments[0];
  var SongThumbModel = arguments[1];
  var SongThumbView = arguments[2];

  var thumbModel = new SongThumbModel({
    name: 'Test1',
    url: 'http://example.com'
  });

  var thumbView = new SongThumbView({
    el: $('.playlist'),
    model: thumbModel
  });

  thumbView.render();
});