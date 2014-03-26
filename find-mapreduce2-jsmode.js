var utils = require('./lib/utils')


var db = utils.connect()

var coll = db.then(utils.collection())

coll
.then(utils.startTimer('Total'))
.then(utils.startTimer('MapReduce'))
.then(utils.mapReduce(map, reduce, {jsMode: true}))
.then(utils.stopTimer('MapReduce'))
.then(utils.startTimer('Find'))
.then(function (results) {
  // find({$or: [{author: "Bob", date: …}, {author: "John", date: …}]})
  return coll.ninvoke('find', {$or: results.map(function (result) {
    return {author: result._id, date: new Date(result.value)}
  })}).ninvoke('toArray')
})
.then(utils.stopTimer('Find'))
.then(utils.stopTimer('Total'))
.then(utils.logger())
.fail(console.error)
.then(utils.close(db))


function map () {
  emit(this.author, this.date);
}

function reduce (key, dates) {
  return Math.max.apply(null, dates)
}
