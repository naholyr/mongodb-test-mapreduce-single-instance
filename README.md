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
MapReduce: 850ms
Total: 852ms
```

### Simpler map/reduce + find (2 queries)

```sh
node find-mapreduce2
```

Sample output:

```
MapReduce: 653ms
Find: 65ms
Total: 719ms
```

### Find groups + 1 query per group (N+1 queries)

```sh
node find-brute
```

Sample output:

```
Authors: 302ms
Queries: 67ms
Total: 370ms
```

Cleanup
-------

```sh
node drop
```
