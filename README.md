#twit

The example is a twitter bot named [Laszlo](https://twitter.com/pr_laszlo) written using [twit](https://github.com/ttezel/twit).


#Initialisation

##Installing

```
npm install twit
```

##Secret:

```javascript
var Twit = require('twit')

var T = new Twit({
  consumer_key:         '...',
  consumer_secret:      '...',
  access_token:         '...',
  access_token_secret:  '...',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})