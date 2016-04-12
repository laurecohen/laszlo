var Twit  = require('twit'),
	request = require('request'),
	fs      = require('fs'),
	http    = require('http'),
	https   = require('https'),
	Stream  = require('stream').Transform,
	im = require('imagemagick'),
	paramTwitter = require('./param'),
	LaszloCommand = require('./laszloCommand'); 


console.printr = function(object){
	console.log( JSON.stringify( object, null, 4) );
}

var download = function(uri, filename, callback){
	request.head(uri, function(err, res, body){
		console.log('content-type:', res.headers['content-type']);
		console.log('content-length:', res.headers['content-length']);

		request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
	});
};


var T = new Twit ({       
	consumer_key        : paramTwitter.consumer_key,
	consumer_secret     : paramTwitter.consumer_secret,
	access_token        : paramTwitter.access_token,
	access_token_secret : paramTwitter.access_token_secret
});


var laszlo = { screen_name: 'laszlobot' };
var stream = T.stream('statuses/filter', { track: 'nationalpetday' } );

stream.on('tweet', function (tweet){
	
	console.log("\r");
	
	if( tweet.entities.media === undefined ){
		console.log("pas d’image");

	} else {
		
		if( tweet.entities.hashtags === undefined ){
			console.log("pas de commande");
			
		} else {
			
			for( var i = 0; i < tweet.entities.media.length; i++ ){

				var addr 	 = tweet.entities.media[ i ].media_url.split(".");
				var ext  	 = "." + addr[ addr.length - 1 ];
				var url  	 = tweet.entities.media[ i ].media_url;
				var id   	 = tweet.entities.media[ i ].id_str;
				var path 	 = './data/images2/' + tweet.entities.media[ i ].id_str + ext;
				var newpath  = './data/images2/' + id + "-new" + ext;

				var paramsIM = [path];
				
				var tweet_text     = tweet.text.split(" ");
				var TwitterCommand = tweet.entities.hashtags;


				for ( Tindex = 0, len = TwitterCommand.length; Tindex < len; Tindex++ ){
					
					console.log( "TwitterCommand " + Tindex + " = #" + TwitterCommand[Tindex].text );

					for ( var Lindex in LaszloCommand ){

						var racine   = LaszloCommand[Lindex].racine;
						var synonym  = LaszloCommand[Lindex].synonym;
						
						var command  = LaszloCommand[Lindex].command;
						var param    = LaszloCommand[Lindex].param;
						var command2 = LaszloCommand[Lindex].command2;
						var param2   = LaszloCommand[Lindex].param2;

						if ( TwitterCommand[Tindex].text.toLowerCase() == racine.toLowerCase() ){

							console.log( "	FOUND A MATCH with = " + TwitterCommand[Tindex].text );
							console.log( "	Execute " + racine + " = " + command + "; " + param );

							if ( param === undefined ){
								paramsIM.push( command );
							} else {
								paramsIM.push( command, param );
							}

						} else if ( TwitterCommand[Tindex].text.toLowerCase() == synonym.toLowerCase() ){

							console.log( "	FOUND A MATCH with = " + TwitterCommand[Tindex].text );
							console.log( "	Execute " + synonym + " = " + command + "; " + param );
							
							if ( param === undefined ){
								paramsIM.push( command );
							} else {
								paramsIM.push( command, param );
							}						
						} 
					}	
				}				

				console.log( "tweet.texte = " + tweet.text );

				paramsIM.push(newpath);

				console.log( "Media = " + tweet.entities.media[ i ].id_str, url );

				download( url , path , function(){

					console.log("•", path);

					im.convert( paramsIM , function(err, stdout){
						  if (err) throw err;
						  console.log("fin de conversion :", newpath );		  
					});
				});


				// ????

				var b64content = fs.readFileSync( newpath, { encoding: 'base64' } );
				var txt = laszlo + " " + tweet.text;


				T.post('media/upload', { media_data: b64content }, function ( err, data, response ) {

					var mediaIdStr = data.media_id_string;
					var params = { status: txt, media_ids: [mediaIdStr]};

					T.post('statuses/update', params, function (err, data, response) {
						console.log('tweet envoyé');
					});
				});
				
			
			}

		} 
	}
})


