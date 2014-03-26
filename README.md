Map/reduce on a single-instance MongoDB server
==============================================

Source: http://naholyr.fr/2014/03/aggregation-mongodb-mono-instance-non/

Configure
---------

Edit `config.json` to customize:

```json
{
  "db": "mongodb://localhost/test-naholyr",
  "collection": "articles",
  "verbose": false,
  "nb_docs": 50000
}
```

Initialize
----------

```sh
npm install
node init-fixtures
```

Run
---

### Map/reduce (1 query)

```sh
node find-mapreduce
```

Sample output:

```
MapReduce: 901ms
Total: 903ms
```

### Simpler map/reduce + find (2 queries)

```sh
node find-mapreduce2
```

Sample output:

```
MapReduce: 654ms
Find: 62ms
Total: 717ms
```

### Find groups + 1 query per group (N+1 queries)

```sh
node find-brute
```

Sample output:

```
Authors: 308ms
Queries: 69ms
Total: 378ms
```

### With `jsMode: true`

cf. http://docs.mongodb.org/manual/reference/method/db.collection.mapReduce/

#### Single map/reduce

```sh
node find-mapreduce-jsmode
```

Sample output:

```
MapReduce: 572ms
Total: 574ms
```

#### Simpler map/reduce + find

```sh
node find-mapreduce2
```

Sample output:

```
MapReduce: 445ms
Find: 55ms
Total: 501ms
```

Cleanup
-------

```sh
node drop
```
