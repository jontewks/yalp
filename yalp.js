var http = require('http');
var cheerio = require('cheerio');

http.get('http://www.yelp.com/biz/bliss-coffee-redwood-city', function(res) {
  var str = '';

  res.on('data', function(chunk) {
    str += chunk;
  });

  res.on('end', function() {
    var $ = cheerio.load(str);
    $('.review-wrapper .review-content').each(function(i, el) {
      var rating, date, description;

      $(el).find($('meta[itemprop="ratingValue"]')).each(function(i, el) {
        rating = el.attribs.content;
      });

      $(el).find($('meta[itemprop="datePublished"]')).each(function(i, el) {
        date = el.attribs.content;
      });

      $(el).find($('p[itemprop="description"]')).each(function(i, el) {
        description = $(el).text();
      });

      console.log(rating, date, description)
    });
  });
})