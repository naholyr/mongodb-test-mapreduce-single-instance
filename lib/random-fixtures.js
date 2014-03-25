var string = require('random-string');


module.exports = articles;


var DAY = 24 * 3600 * 1000;

var AUTHORS = [
  'John',
  'Bob',
  'Henry',
  'Unknown'
];


function article () {
  return {
    date:   date(),
    author: author(),
    text:   string()
  }
}

function date () {
  return new Date(Date.now() - rand(30 * DAY));
}

function author () {
  return AUTHORS[rand(AUTHORS.length - 1)];
}

function rand (max) {
  return Math.round(Math.random() * max);
}

function articles (count) {
  var result = [];
  for (var i = 0; i < count; i++) {
    result.push(article());
  }
  return result;
}
