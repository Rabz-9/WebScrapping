var request = require("request");
var cheerio = require("cheerio");
var readline = require('readline');
var fs = require('fs');

var nb_page = 0;
var nb_page_max = 0;

function getLogementURL() {

  request({
    uri: "http://www.seloger.com/list.htm?tri=initial&idtypebien=2,1&idtt=2,5&naturebien=1,2,4&ci=750101",
  }, function(error, response, body) {
    var $ = cheerio.load(body);
    //Get the Number of pages in the Website
    $(".mobile-pagination-number").each(function() {
      var link = $(this);
      nb_page = link.text().trim();
      nb_page = nb_page.split(' ');
      nb_page_max = parseInt(nb_page[nb_page.length - 1]);
      console.log(nb_page_max);
    });

    for (var i = 1; i < 2; i++) {
      request({
        uri: "http://www.seloger.com/list.htm?tri=initial&idtypebien=2,1&idtt=2,5&naturebien=1,2,4&ci=750101&LISTING-LISTpg=" + i,
      }, function(error, response, body) {
        var $ = cheerio.load(body);
        $(".c-pa-info").each(function() {
          var link = $(this);
          console.log(link.attr("href"));
          fs.appendFileSync("./LinkLogement2018.txt", url + "\r\n", null, 'utf8', (err) => {
          });
        });
      });
    }
  });
}

getLogementURL();

function getInformation() {
  var contents = fs.readFileSync("./LinkLogement2018.txt", 'utf8');
  var line = contents.split("\n");
  for (var i = 0; i < line.length - 1; i++) {
    request({
      uri: line[i],
    }, function(error, response, body) {
      if (!error) {
        var $ = cheerio.load(body);
        $(".").each(function() {

        });
      }
    });
  }
}
