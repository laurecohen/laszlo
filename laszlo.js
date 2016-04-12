var Twit  			= require('twit'),
	request 		= require('request'),
	fs      		= require('fs'),
	http    		= require('http'),
	https   		= require('https'),
	Stream  		= require('stream').Transform,
	im 				= require('imagemagick'),
	// paramètres + dictionnaire de commandes
	paramTwitter 	= require('./param'),
	LaszloCommand 	= require('./laszloCommand'); 

console.log("+++\n");
console.log("Libraries ready\n");
console.log("+++\n");



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
	// console.log('medias', tweet.entities);
	
	if( tweet.entities.media === undefined){
		console.log("pas d’image");

	} else {
		console.log("nbr d'images", tweet.entities.media.length);
		
		if( tweet.entities.hashtags === undefined ){
			console.log("pas de commande");
			
		} else {
			
			// on parcours toutes les images
			for( var i = 0; i < tweet.entities.media.length; i++ ){

				// correspond ) l'adresse de l'image
				var addr 	 = tweet.entities.media[ i ].media_url.split(".");
				// extension de l'image
				var ext  	 = "." + addr[ addr.length - 1 ];
				// url de l'image
				var url  	 = tweet.entities.media[ i ].media_url;
				var id   	 = tweet.entities.media[ i ].id_str;
				var path 	 = './data/images2/' + tweet.entities.media[ i ].id_str + ext;
				var newpath  = './data/images2/' + id + "-new" + ext;

				var paramsIM = [path];

				console.log("+++\n");
				console.log( "tweet.text => ", tweet.text );

				

				console.log( "Media => ", tweet.entities.media[ i ].id_str, url, path );

				console.log("+++\n");

				
				var tweet_text     = tweet.text.split(" ");
				var TwitterCommand = tweet.entities.hashtags;


				// on liste les paramètres éventuels
				for ( Tindex = 0, len = TwitterCommand.length; Tindex < len; Tindex++ ){
					
					console.log( "->TwitterCommand " + Tindex + " = #" + TwitterCommand[Tindex].text );

					for ( var Lindex in LaszloCommand ){

						var racine   = LaszloCommand[Lindex].racine;
						var synonym  = LaszloCommand[Lindex].synonym;
						
						var command  = LaszloCommand[Lindex].command;
						var param    = LaszloCommand[Lindex].param;
						var command2 = LaszloCommand[Lindex].command2;
						var param2   = LaszloCommand[Lindex].param2;

						if ( TwitterCommand[Tindex].text.toLowerCase() == racine.toLowerCase() ){

							console.log( "--->racine" );
							console.log( "--->FOUND A MATCH with = " + TwitterCommand[Tindex].text );
							console.log( "--->Execute " + racine + " = " + command + "; " + param );

							if ( param === undefined ){
								paramsIM.push( command );
							} else {
								paramsIM.push( command, param );
							}

						} else if ( TwitterCommand[Tindex].text.toLowerCase() == synonym.toLowerCase() ){

							console.log( "--->synonym" );
							console.log( "--->FOUND A MATCH with = " + TwitterCommand[Tindex].text );
							console.log( "--->Execute " + synonym + " = " + command + "; " + param );
							
							if ( param === undefined ){
								paramsIM.push( command );
							} else {
								paramsIM.push( command, param );
							}						
						} 
					}	
				}

				// on ajoute le chemin d'export de l'image
				paramsIM.push(newpath);

				// on télécharge le fihier
				download( url , path , function(){

					console.log("•", path);

					console.log('imagemagick convert', paramsIM);

					// à la fin du téléchargement on execute  la commande «convert» d'imagemagick
					// avec les commandes du tableau paramsIM
					im.convert( paramsIM , function(err, stdout){
							if (err) throw err;
							console.log("fin de conversion :", newpath );

							// on envoie le tweet une fois que l'imge a été convertie	
							var b64content = fs.readFileSync( newpath, { encoding: 'base64' } );
							var txt = laszlo + " " + tweet.text;


							T.post('media/upload', { media_data: b64content }, function ( err, data, response ) {

								var mediaIdStr = data.media_id_string;
								var params = { status: txt, media_ids: [mediaIdStr]};

								T.post('statuses/update', params, function (err, data, response) {
									console.log('tweet envoyé');
								});
							});  
					});
				});			
			}
		} 
	}
})


