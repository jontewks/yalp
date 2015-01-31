var http = require('http');
var cheerio = require('cheerio');
var mongoose = require('mongoose');

var urls = ['http://www.yelp.com/biz/bliss-coffee-redwood-city'];
var start = 0;

var request = function(url, index) {
  url = url + '?sort_by=date_desc';
  if (start > 0) {
    url = url + '&start=' + start;
  }

  http.get(url, function(res) {
    var str = '';

    res.on('data', function(chunk) {
      str += chunk;
    });

    res.on('end', function() {
      var $ = cheerio.load(str);
      var $content = $('.review-wrapper .review-content');

      if ($content.length) {
        $content.each(function(i, el) {
          var rating = $(el).find($('meta[itemprop="ratingValue"]'))[0].attribs.content
          var date = $(el).find($('meta[itemprop="datePublished"]'))[0].attribs.content
          console.log(rating, date);
        });
        start += 40;
        request(urls[index], index);
      } else {
        start = 0;
        return;
      }
    });
  });
};

urls.forEach(function(url, index) {
  request(url, index);
});
