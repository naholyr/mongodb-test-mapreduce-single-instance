var utils = require('./lib/utils')


var db = utils.connect()

var coll = db.then(utils.collection())

coll
.then(utils.startTimer('Total'))
.then(utils.startTimer('Authors'))
.then(function () {
  return coll
  .ninvoke('find', {}, {author: 1})
  .ninvoke('toArray')
  .then(utils.pluck('author'))
  .then(utils._.uniq)
})
.then(utils.stopTimer('Authors'))
.then(utils.startTimer('Queries'))
.then(utils.map(function (author) {
  return coll
  .invoke('find', {author: author})
  .invoke('sort', {date: -1})
  .invoke('limit', 1)
  .ninvoke('nextObject')
}))
.then(utils.stopTimer('Queries'))
.then(utils.stopTimer('Total'))
.then(utils.logger())
.fail(console.error)
.then(utils.close(db))
