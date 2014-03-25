var utils = require('./lib/utils')
var config = require('./config.json')
var generate = require('./lib/random-fixtures')


var docs = generate(config.nb_docs)

var db = utils.connect()

db
.then(utils.collection())
.then(utils.clear)
.then(utils.insert(docs))
.then(utils._.size)
.then(console.log)
.fail(console.error)
.then(utils.close(db))
