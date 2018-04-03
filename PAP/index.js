var request = require("request");
var cheerio = require("cheerio");
var readline = require('readline');
var fs = require('fs');

function getLogementURL() {

  request({
    uri: "https://www.pap.fr/annonce/vente-immobiliere-paris-1er-g37768",
  }, function(error, response, body) {
    var $ = cheerio.load(body);
    $(".item-content").each(function() {
      var link = $(this);
      var price = $(this).find(".item-price").text().trim();
      var item = $('strong',this).text();
      console.log(price);
      console.log(item);
    });
  });
}


getLogementURL();
