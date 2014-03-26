var utils = require('./lib/utils')


var db = utils.connect()

db
.then(utils.collection())
.then(utils.startTimer('Total'))
.then(utils.startTimer('MapReduce'))
.then(utils.mapReduce(map, reduce, {jsMode: true}))
.then(utils.stopTimer('MapReduce'))
.then(utils.pluck('value'))
.then(utils.stopTimer('Total'))
.then(utils.logger())
.fail(console.error)
.then(utils.close(db))


function map () {
  emit(this.author, this);
}

function reduce (key, articles) {
  return articles.sort(function (a1, a2) { return a2.date - a1.date })[0]
}
