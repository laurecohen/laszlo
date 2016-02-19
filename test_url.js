var http = require('http'), 
    https = require('https'),                                               
    Stream = require('stream').Transform,                                  
    fs = require('fs'),
    request = require('request');    

/*  STREAM  */
var url = 'https://pbs.twimg.com/media/CbBjhGrW4AEcmBU.jpg';                    

https.request(url, function(response) {                                        
  var data = new Stream();                                                    

  response.on('data', function(chunk) {                                       
    data.push(chunk);                                                         
  });                                                                         

  response.on('end', function() {                                          
    fs.writeFileSync('./data/image.png', data.read()); 
    console.log('done')                              
  });                                                                         
}).end();


// /*  REST  */
// // Or with cookies
// // var request = require('request').defaults({jar: true});
// request.get({url: 'https://pbs.twimg.com/media/Ca3aDPSWwAEgFVP.jpg:large', encoding: 'binary'}, function (err, response, body) {
//   fs.writeFile("./data/test.png", body, 'binary', function(err) {
//     if(err)
//       console.log(err);
//     else
//       console.log("The file was saved!");
//   }); 
// });
