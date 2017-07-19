var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var AlbumSchema   = new Schema({
    title: String,
    mc: String,
    price: Number
});

module.exports = mongoose.model('album', AlbumSchema);

