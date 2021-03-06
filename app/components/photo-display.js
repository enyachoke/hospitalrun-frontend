import Ember from 'ember';
export default Ember.Component.extend({
  computedPhotoUrl: null,
  filesystem: Ember.inject.service(),
  isFileSystemEnabled: Ember.computed.alias('filesystem.isFileSystemEnabled'),
  fileName: Ember.computed.alias('photo.fileName'),
  photo: null,
  url: Ember.computed.alias('photo.url'),

  photoUrl: function() {
    var computedPhotoUrl = this.get('computedPhotoUrl'),
      fileName = this.get('fileName'),
      filesystem = this.get('filesystem'),
      isFileSystemEnabled = this.get('isFileSystemEnabled'),
      url = this.get('url');
    if (!Ember.isEmpty(computedPhotoUrl)) {
      return computedPhotoUrl;
    } else if (isFileSystemEnabled) {
      filesystem.pathToFileSystemURL(fileName).then(function(photoUrl) {
        if (!Ember.isEmpty(photoUrl)) {
          this.set('computedPhotoUrl', photoUrl);
        }
      }.bind(this));
    }
    return url;
  }.property('computedPhotoUrl', 'fileName', 'url')
});
