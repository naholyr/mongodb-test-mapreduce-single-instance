var MongoClient = require('mongodb').MongoClient

var config = require('../config.json')

var Q = exports.Q = require('q')
var _ = exports._ = require('lodash')


// MongoDB tools

exports.connect = function connect (url) {
  if (url === undefined) url = config.db
  return Q.ninvoke(MongoClient, 'connect', url)
}

exports.collection = function collection (name) {
  if (name === undefined) name = config.collection
  return function (client) {
    return client.collection(name)
  }
}

exports.clear = function clear (collection) {
  return Q.ninvoke(collection, 'remove').then(_.constant(collection))
}

exports.insert = function insert (doc) {
  return function (collection) {
    return Q.ninvoke(collection, 'insert', doc)
  }
}

exports.close = function close (db) {
  return function () {
    return Q.ninvoke(db, 'close')
  }
}

exports.mapReduce = function mapReduce (map, reduce) {
  return function (collection) {
    return Q.ninvoke(collection, 'mapReduce', map, reduce, {out: {inline: 1}})
  }
}

// Promise tools

exports.map = function map (valueToPromise) {
  return function (values) {
    return Q.all(values.map(valueToPromise))
  }
}

exports.pluck = function pluck (key) {
  return _.partialRight(_.pluck, key)
}

// Timers

exports.startTimer = function (timer) {
  return function (value) {
    console.time(timer)
    return value
  }
}

exports.stopTimer = function (timer) {
  return function (value) {
    console.timeEnd(timer)
    return value
  }
}

// Standard output

exports.logger = function logger (verbose) {
  if (verbose === undefined) verbose = config.verbose
  return function log () {
    if (verbose) console.log.apply(console, arguments)
  }
}
