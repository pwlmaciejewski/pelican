define([
  'jquery',
  'model/songThumbCollection', 
  'view/songThumbCollection'
], function () {
  var $ = arguments[0];
  var SongThumbCollectionModel = arguments[1];
  var SongThumbCollectionView = arguments[2];

  var thumbCollectionModel = new SongThumbCollectionModel();

  var thumbView = new SongThumbCollectionView({
    el: $('.playlist'),
    collection: thumbCollectionModel
  });

  thumbView.render();
  thumbCollectionModel.fetch();
});