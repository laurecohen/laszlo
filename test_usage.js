var Twit = require('twit'),
  secret = require('./secret.js'),
	request = require('request'),
	fs = require('fs'),
	http = require('http'),
	Stream = require('stream'), 
	entities = require('entities');

/*  -----  variables-tests  ----- */
var txt = "";
var b64content = fs.readFileSync('./data/mireH8.jpg', { encoding: 'base64' });

var hashtags = ["#blacknwhite", "#yellowfilter"]
var params = { screen_name: 'pr_laszlo' };



/*  -----  TESTS ----- */
// // Stream (data) onTweet  // //
var stream = T.stream('statuses/filter', { track: [params, hashtags] });

stream.on('tweet', function (tweet) {
  console.log(tweet);
});


// // Tweet (.POST) text  // //
// T.post('statuses/update', { status: txt }, function (err, data, response) {
//   console.log('tweeting: ' + txt);
// });


// // Tweet (.POST) text + img  // //
// T.post('media/upload', { media: b64content }, function (err, data, response) {

// var mediaIdStr = data.media_id_string;
// var params = { status: params + txt, media_ids: [mediaIdStr] };

// T.post('statuses/update', params, function (err, data, response) {
//   console.log('tweeting: ' + params + txt);
//   });
// });