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

/*  -----  variables-tests  ----- */
// var hashtags = ["#blacknwhite", "#yellowfilter"];
// var laszlo = { screen_name: 'pr_laszlo' };
var stream = T.stream('statuses/filter', { track: '#openingday' } );

stream.on('tweet', function (tweet) {

	if(tweet.entities.media === undefined){
		console.log("pas d’image");
	}else{
		
		if(tweet.entities.hashtags === undefined){
			console.log("pas de commande");
		}else{
			
			for( var i = 0; i<tweet.entities.media.length; i++ ){

				var addr 	 = tweet.entities.media[ i ].media_url.split(".");
				var ext  	 = "." + addr[ addr.length - 1 ];
				var url  	 = tweet.entities.media[ i ].media_url;
				var id   	 = tweet.entities.media[ i ].id_str;
				var path 	 = './data/images2/' + tweet.entities.media[ i ].id_str + ext;
				var newpath  = './data/images2/' + id + "-R" + ext;

				var paramsIM = [path];
				

				var tweet_text = tweet.text[ i ].split(' ');
				var TwitterCommand = tweet.entities.hashtags[ i ];

				// var char = contenu_txt[ i ].substr(0,1);
				//var char2 = tweet_text[ i + 1 ].substr(0,1);

				//var newArray = [];


				if( compare_Commandes( TwitterCommand, LaszloCommand )){
					console.log('IZ WERKIN');
					paramsIM.push('-level', '50%');
					console.log( "#" + tweet.text[ i ]);
				} else { 
					console.log( "SOMETHIN WRONG with commands : " + tweet.entities.hashtags[i].text );
				}


				function compare_Commandes( TwitterCommand, LaszloCommand ){

					for ( var j = 0, len = TwitterCommand.length; j < len; j++ ) {

						var match = false;

						for (var k = 0, gth = LaszloCommand.length; k < gth; k++ ) {

							if ( TwitterCommand[ j ] == LaszloCommand[ k ] ) {
								match = true;
								break;
							}
						}
						
					}	
						
					// // add a[i] to newArray only if we didn't find a match.
					// if (!match) {
					// 	newArray.push( TwitterCommand[ j ] );
					// 	//console.log('SOMETHIN WRONG');
					// }
		
				}


				// ici fin de la boucle
				paramsIM.push(newpath);

				console.log( tweet.entities.media[ i ].id_str, url );

				download( url , path , function(){

					console.log("•", path);

					im.convert( paramsIM , function(err, stdout){
						  if (err) throw err;
						  console.log("fin de conversion :", newpath);		  
					});
				});

			}
			
		} 
	}
})

function is_int(value){
	if((parseFloat(value) == parseInt(value)) && !isNaN(value)){
		return true;
	} else {
		return false;
	}
} 