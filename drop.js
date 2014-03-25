var utils = require('./lib/utils')


var db = utils.connect()

db
.then(utils.collection())
.ninvoke('drop')
.then(console.log)
.fail(console.error)
.then(utils.close(db))
