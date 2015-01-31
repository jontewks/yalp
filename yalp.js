var http = require('http');
var cheerio = require('cheerio');

http.get('http://www.yelp.com/biz/bliss-coffee-redwood-city', function(res) {
  var str = '';

  res.on('data', function(chunk) {
    str += chunk;
  });

  res.on('end', function() {
    var $ = cheerio.load(str);
    console.log($('div').length);
  });
})