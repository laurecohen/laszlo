var im = require('imagemagick');
im.readMetadata('./data/mireH8.jpg', function(err, metadata){
  if (err) throw err;
  console.printr(metadata);
})


console.printr = function(object){
	console.log( JSON.stringify( object, null, 4) );
}