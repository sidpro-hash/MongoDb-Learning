MongoDB and SQL Learning
========================

With MarkdownPreview
---------------

  [![Build][github-ci-image]][github-ci-link]
  [![Package Control Downloads][pc-image]][pc-link]
  ![License][license-image]

## Documents

MongoDB stores data records as BSON documents. BSON is a binary representation 
of JSON documents, though it contains more data types than JSON.

### Document Structure

MongoDB documents are composed of field-and-value pairs.
```
{
   field1: value1,
   field2: value2,
   field3: value3,
   ...
   fieldN: valueN
}

```


### Field Names

Field names are strings.

The field name **_id** is reserved for use as a primary key; its value must be unique
in the collection, is immutable, and may be of any type other than an array.

Some documents created by internal MongoDB processes may have duplicate fields, but
no MongoDB process will ever add duplicate fields to an existing user document.

### Dot Notation

MongoDB uses the dot notation to access the elements of an array and to access the 
fields of an embedded document.

**Arrays**

To specify or access an element of an array by the zero-based index position, 
concatenate the array name with the dot (**.**) and zero-based index position, and 
enclose in quotes.
```
"<array>.<index>"
```

### Document Size Limit

The maximum BSON document size is 16 megabytes.

The maximum document size helps ensure that a single document cannot use excessive 
amount of RAM or, during transmission, excessive amount of bandwidth. To store 
documents larger than the maximum size, MongoDB provides the GridFS API.

### The _id Field

In MongoDB, each document stored in a collection requires a unique **_id** field that acts as a primary key. If an inserted document omits the **_id** field, the MongoDB driver automatically generates an **ObjectId** for the **_id** field.

### Databases

There is no "create" command in the MongoDB shell. In order to create a database, you will first need to switch the context to a non-existing database using the use command.
In MongoDB, databases hold one or more collections of documents. To select a database to use, in the mongo shell, issue the *use <db>* statement:
```
use mydb
```
If a database does not exist, MongoDB creates the database when you first store data for that database.

## Collections

MongoDB stores documents in collections. Collections are analogous to tables in relational databases.


## Explicit Creation

MongoDB provides the **db.createCollection()** method to explicitly create a collection with various options, such as setting the maximum size or the documentation validation rules. If you are not specifying these options, you do not need to explicitly create the collection since MongoDB creates new collections when you first store data for the collections.

## Commands
```
> help
        db.help()                    help on db methods
        db.mycoll.help()             help on collection methods
        sh.help()                    sharding helpers
        rs.help()                    replica set helpers
        help admin                   administrative help
        help connect                 connecting to a db help
        help keys                    key shortcuts
        help misc                    misc things to know
        help mr                      mapreduce

        show dbs                     show database names
        show collections             show collections in current database
        show users                   show users in current database
        show profile                 show most recent system.profile entries with time >= 1ms
        show logs                    show the accessible logger names
        show log [name]              prints out the last segment of log in memory, 'global' is default
        use <db_name>                set current database
        db.foo.find()                list objects in collection foo
        db.foo.find( { a : 1 } )     list objects in foo where a == 1
        it                           result of the last line evaluated; use to further iterate
        DBQuery.shellBatchSize = x   set default number of items to display on shell
        exit                         quit the mongo shell

> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB

> use mydb
switched to db mydb

> db.createCollection('friends')
{ "ok" : 1 }

> db.friends.insert({name:"sidpro",age:20})
WriteResult({ "nInserted" : 1 })

> db.friends.insert({name:"chirag",age:20})
WriteResult({ "nInserted" : 1 })

> db.friends.insert({name:"cj",age:21})
WriteResult({ "nInserted" : 1 })

> db.friends.find()
{ "_id" : ObjectId("609cbf8a19e9b8fd60d4b6f4"), "name" : "sidpro", "age" : 20 }
{ "_id" : ObjectId("609cbf9219e9b8fd60d4b6f5"), "name" : "chirag", "age" : 20 }
{ "_id" : ObjectId("609cbf9a19e9b8fd60d4b6f6"), "name" : "cj", "age" : 21 }

> db.friends.find({name:"sidpro"})
{ "_id" : ObjectId("609cbf8a19e9b8fd60d4b6f4"), "name" : "sidpro", "age" : 20 }

> db.friends.find({age:{$gt:20}})
{ "_id" : ObjectId("609cbf9a19e9b8fd60d4b6f6"), "name" : "cj", "age" : 21 }

> db.friends.find({},{name:true})
{ "_id" : ObjectId("609cbf8a19e9b8fd60d4b6f4"), "name" : "sidpro" }
{ "_id" : ObjectId("609cbf9219e9b8fd60d4b6f5"), "name" : "chirag" }
{ "_id" : ObjectId("609cbf9a19e9b8fd60d4b6f6"), "name" : "cj" }

> db.friends.find({},{name:true,_id:0})
{ "name" : "sidpro" }
{ "name" : "chirag" }
{ "name" : "cj" }

> db.friends.find({},{name:true,_id:0}).sort({age:-1})
{ "name" : "cj" }
{ "name" : "sidpro" }
{ "name" : "chirag" }

> db.friends.find({},{name:true,_id:0}).sort({age:1})
{ "name" : "sidpro" }
{ "name" : "chirag" }
{ "name" : "cj" }

db.friends.update(search term,new data)
db.collection.updateOne(<filter>, <update>, <options>)
db.collection.updateMany(<filter>, <update>, <options>)
db.collection.replaceOne(<filter>, <update>, <options>)
> db.friends.update({},{$set:{gender:"Male"}})
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })

> db.friends.update({},{$set:{gender:"Male"}},{multi:true})
WriteResult({ "nMatched" : 3, "nUpserted" : 0, "nModified" : 2 })

> db.friends.update({},{$unset:{gender:"Male"}},{multi:true})
WriteResult({ "nMatched" : 3, "nUpserted" : 0, "nModified" : 3 })
> db.friends.find()
{ "_id" : ObjectId("609cbf8a19e9b8fd60d4b6f4"), "name" : "sidpro", "age" : 20 }
{ "_id" : ObjectId("609cbf9219e9b8fd60d4b6f5"), "name" : "chirag", "age" : 20 }
{ "_id" : ObjectId("609cbf9a19e9b8fd60d4b6f6"), "name" : "cj", "age" : 21 }

> db.friends.insert({name:"john2",age:21})
WriteResult({ "nInserted" : 1 })
> db.friends.find()
{ "_id" : ObjectId("609cbf8a19e9b8fd60d4b6f4"), "name" : "sidpro", "age" : 20 }
{ "_id" : ObjectId("609cbf9219e9b8fd60d4b6f5"), "name" : "chirag", "age" : 20 }
{ "_id" : ObjectId("609cbf9a19e9b8fd60d4b6f6"), "name" : "cj", "age" : 21 }
{ "_id" : ObjectId("609ccc2119e9b8fd60d4b6f7"), "name" : "john2", "age" : 21 }
> db.friends.remove({name:"john2"})
WriteResult({ "nRemoved" : 1 })

> show collections
friends
> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
mydb    0.000GB

> use test
switched to db test

> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
mydb    0.000GB

> db.createCollection('students')
{ "ok" : 1 }

> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
mydb    0.000GB
test    0.000GB

> db.students.insertMany([{ "_id": NumberInt(0), "name":"aimee Zank", "scores":[ { "score":1.463179736705023, "type":"exam" }, { "score":11.78273309957772, "type":"quiz" }, { "score":35.8740349954354, "type":"homework" } ] },
{ "_id": NumberInt(4), "name":"Zachary Langlais", "scores":[ { "score":78.68385091304332, "type":"exam" }, { "score":90.2963101368042, "type":"quiz" }, { "score":34.41620148042529, "type":"homework" } ] },
{ "_id": NumberInt(5), "name":"Wilburn Spiess", "scores":[ { "score":44.87186330181261, "type":"exam" }, { "score":25.72395114668016, "type":"quiz" }, { "score":63.42288310628662, "type":"homework" } ] },
{ "_id": NumberInt(7), "name":"Salena Olmos", "scores":[ { "score":90.37826509157176, "type":"exam" }, { "score":42.48780666956811, "type":"quiz" }, { "score":96.52986171633331, "type":"homework" } ] },
{ "_id": NumberInt(12), "name":"Quincy Danaher", "scores":[ { "score":54.29841278520669, "type":"exam" }, { "score":85.61270164694737, "type":"quiz" }, { "score":80.40732356118075, "type":"homework" } ] },
{ "_id": NumberInt(13), "name":"Jessika Dagenais", "scores":[ { "score":90.47179954427436, "type":"exam" }, { "score":90.3001402468489, "type":"quiz" }, { "score":95.17753772405909, "type":"homework" } ] },
{ "_id": NumberInt(14), "name":"Alix Sherrill", "scores":[ { "score":25.15924151998215, "type":"exam" }, { "score":68.64484047692098, "type":"quiz" }, { "score":24.68462152686763, "type":"homework" } ] },
{ "_id": NumberInt(15), "name":"Tambra Mercure", "scores":[ { "score":69.1565022533158, "type":"exam" }, { "score":3.311794422000724, "type":"quiz" }, { "score":45.03178973642521, "type":"homework" } ] },
{ "_id": NumberInt(9), "name":"Sanda Ryba", "scores":[ { "score":97.00509953654694, "type":"exam" }, { "score":97.80449632538915, "type":"quiz" }, { "score":25.27368532432955, "type":"homework" } ] },
{ "_id": NumberInt(21), "name":"Rosana Vales", "scores":[ { "score":46.2289476258328, "type":"exam" }, { "score":98.34164225207036, "type":"quiz" }, { "score":36.18769746805938, "type":"homework" } ] },
{ "_id": NumberInt(22), "name":"Margart Vitello", "scores":[ { "score":75.04996547553947, "type":"exam" }, { "score":10.23046475899236, "type":"quiz" }, { "score":96.72520512117761, "type":"homework" } ] },
{ "_id": NumberInt(24), "name":"Jesusa Rickenbacker", "scores":[ { "score":86.0319702155683, "type":"exam" }, { "score":1.967495200433389, "type":"quiz" }, { "score":61.10861071547914, "type":"homework" } ] },
{ "_id": NumberInt(2), "name":"Corliss Zuk", "scores":[ { "score":67.03077096065002, "type":"exam" }, { "score":6.301851677835235, "type":"quiz" }, { "score":66.28344683278382, "type":"homework" } ] },
{ "_id": NumberInt(1), "name":"Aurelia Menendez", "scores":[ { "score":60.06045071030959, "type":"exam" }, { "score":52.79790691903873, "type":"quiz" }, { "score":71.76133439165544, "type":"homework" } ] },
{ "_id": NumberInt(6), "name":"Jenette Flanders", "scores":[ { "score":37.32285459166097, "type":"exam" }, { "score":28.32634976913737, "type":"quiz" }, { "score":81.57115318686338, "type":"homework" } ] },
{ "_id": NumberInt(8), "name":"Daphne Zheng", "scores":[ { "score":22.13583712862635, "type":"exam" }, { "score":14.63969941335069, "type":"quiz" }, { "score":75.94123677556644, "type":"homework" } ] },
{ "_id": NumberInt(10), "name":"Denisha Cast", "scores":[ { "score":45.61876862259409, "type":"exam" }, { "score":98.35723209418343, "type":"quiz" }, { "score":55.90835657173456, "type":"homework" } ] },
{ "_id": NumberInt(11), "name":"Marcus Blohm", "scores":[ { "score":78.42617835651868, "type":"exam" }, { "score":82.58372817930675, "type":"quiz" }, { "score":87.49924733328717, "type":"homework" } ] },
{ "_id": NumberInt(16), "name":"Dodie Staller", "scores":[ { "score":7.772386442858281, "type":"exam" }, { "score":31.84300235104542, "type":"quiz" }, { "score":80.52136407989194, "type":"homework" } ] },
{ "_id": NumberInt(17), "name":"Fletcher Mcconnell", "scores":[ { "score":39.41011069729274, "type":"exam" }, { "score":81.13270307809924, "type":"quiz" }, { "score":97.70116640402922, "type":"homework" } ] },
{ "_id": NumberInt(20), "name":"Tressa Schwing", "scores":[ { "score":42.17439799514388, "type":"exam" }, { "score":71.99314840599558, "type":"quiz" }, { "score":81.23972632069464, "type":"homework" } ] },
{ "_id": NumberInt(19), "name":"Gisela Levin", "scores":[ { "score":44.51211101958831, "type":"exam" }, { "score":0.6578497966368002, "type":"quiz" }, { "score":93.36341655949683, "type":"homework" } ] },
{ "_id": NumberInt(23), "name":"Tamika Schildgen", "scores":[ { "score":45.65432764125526, "type":"exam" }, { "score":64.32927049658846, "type":"quiz" }, { "score":83.53933351660562, "type":"homework" } ] },
{ "_id": NumberInt(18), "name":"Verdell Sowinski", "scores":[ { "score":62.12870233109035, "type":"exam" }, { "score":84.74586220889356, "type":"quiz" }, { "score":81.58947824932574, "type":"homework" } ] }])

> db.students.deleteMany({})
{ "acknowledged" : true, "deletedCount" : 24 }

> show collections
students

> db.students.drop()
true

// sort first by id than name
> db.students.find({},{name:true}).sort({"_id":1,"name":1})
{ "_id" : 0, "name" : "aimee Zank" }
{ "_id" : 1, "name" : "Aurelia Menendez" }
{ "_id" : 2, "name" : "Corliss Zuk" }
{ "_id" : 4, "name" : "Zachary Langlais" }
{ "_id" : 5, "name" : "Wilburn Spiess" }
{ "_id" : 6, "name" : "Jenette Flanders" }
{ "_id" : 7, "name" : "Salena Olmos" }
{ "_id" : 8, "name" : "Daphne Zheng" }
{ "_id" : 9, "name" : "Sanda Ryba" }
{ "_id" : 10, "name" : "Denisha Cast" }
{ "_id" : 11, "name" : "Marcus Blohm" }
{ "_id" : 12, "name" : "Quincy Danaher" }
{ "_id" : 13, "name" : "Jessika Dagenais" }
{ "_id" : 14, "name" : "Alix Sherrill" }
{ "_id" : 15, "name" : "Tambra Mercure" }
{ "_id" : 16, "name" : "Dodie Staller" }
{ "_id" : 17, "name" : "Fletcher Mcconnell" }
{ "_id" : 18, "name" : "Verdell Sowinski" }
{ "_id" : 19, "name" : "Gisela Levin" }
{ "_id" : 20, "name" : "Tressa Schwing" }


> db.students.find({_id:{ $gt:21},"scores.score":{$gt:22},"scores.type":"homework"})
{ "_id" : 22, "name" : "Margart Vitello", "scores" : [ { "score" : 75.04996547553947, "type" : "exam" }, { "score" : 10.23046475899236, "type" : "quiz" }, { "score" : 96.72520512117761, "type" : "homework" } ] }
{ "_id" : 23, "name" : "Tamika Schildgen", "scores" : [ { "score" : 45.65432764125526, "type" : "exam" }, { "score" : 64.32927049658846, "type" : "quiz" }, { "score" : 83.53933351660562, "type" : "homework" } ] }
{ "_id" : 24, "name" : "Jesusa Rickenbacker", "scores" : [ { "score" : 86.0319702155683, "type" : "exam" }, { "score" : 1.967495200433389, "type" : "quiz" }, { "score" : 61.10861071547914, "type" : "homework" } ] }

> db.students.find().sort({_id:1}).skip(4).limit(2)
{ "_id" : 5, "name" : "Wilburn Spiess", "scores" : [ { "score" : 44.87186330181261, "type" : "exam" }, { "score" : 25.72395114668016, "type" : "quiz" }, { "score" : 63.42288310628662, "type" : "homework" } ] }
{ "_id" : 6, "name" : "Jenette Flanders", "scores" : [ { "score" : 37.32285459166097, "type" : "exam" }, { "score" : 28.32634976913737, "type" : "quiz" }, { "score" : 81.57115318686338, "type" : "homework" } ] }

> db.students.find({name:{$regex:/^A/}})
{ "_id" : 14, "name" : "Alix Sherrill", "scores" : [ { "score" : 25.15924151998215, "type" : "exam" }, { "score" : 68.64484047692098, "type" : "quiz" }, { "score" : 24.68462152686763, "type" : "homework" } ] }
{ "_id" : 1, "name" : "Aurelia Menendez", "scores" : [ { "score" : 60.06045071030959, "type" : "exam" }, { "score" : 52.79790691903873, "type" : "quiz" }, { "score" : 71.76133439165544, "type" : "homework" } ] }

> db.students.find({name:{$regex:/r$/}})
{ "_id" : 12, "name" : "Quincy Danaher", "scores" : [ { "score" : 54.29841278520669, "type" : "exam" }, { "score" : 85.61270164694737, "type" : "quiz" }, { "score" : 80.40732356118075, "type" : "homework" } ] }
{ "_id" : 24, "name" : "Jesusa Rickenbacker", "scores" : [ { "score" : 86.0319702155683, "type" : "exam" }, { "score" : 1.967495200433389, "type" : "quiz" }, { "score" : 61.10861071547914, "type" : "homework" } ] }
{ "_id" : 16, "name" : "Dodie Staller", "scores" : [ { "score" : 7.772386442858281, "type" : "exam" }, { "score" : 31.84300235104542, "type" : "quiz" }, { "score" : 80.52136407989194, "type" : "homework" } ] }

> db.students.find({name:{$regex:/t/}})
{ "_id" : 22, "name" : "Margart Vitello", "scores" : [ { "score" : 75.04996547553947, "type" : "exam" }, { "score" : 10.23046475899236, "type" : "quiz" }, { "score" : 96.72520512117761, "type" : "homework" } ] }
{ "_id" : 6, "name" : "Jenette Flanders", "scores" : [ { "score" : 37.32285459166097, "type" : "exam" }, { "score" : 28.32634976913737, "type" : "quiz" }, { "score" : 81.57115318686338, "type" : "homework" } ] }
{ "_id" : 10, "name" : "Denisha Cast", "scores" : [ { "score" : 45.61876862259409, "type" : "exam" }, { "score" : 98.35723209418343, "type" : "quiz" }, { "score" : 55.90835657173456, "type" : "homework" } ] }
{ "_id" : 16, "name" : "Dodie Staller", "scores" : [ { "score" : 7.772386442858281, "type" : "exam" }, { "score" : 31.84300235104542, "type" : "quiz" }, { "score" : 80.52136407989194, "type" : "homework" } ] }
{ "_id" : 17, "name" : "Fletcher Mcconnell", "scores" : [ { "score" : 39.41011069729274, "type" : "exam" }, { "score" : 81.13270307809924, "type" : "quiz" }, { "score" : 97.70116640402922, "type" : "homework" } ] }


```

## One to One

Example: Users and Home Addresses
```
db.createCollection('comments')
db.comments.insert({author:"Homer",body:"This is first comment",upvote:0,tags:["pizza","cake","soda"]})
db.comments.insert({author:"Marge",body:"I am huge fan of MongoDB",upvote:20,tags:["mongo","database"]})
db.comments.insert({author:"Bart",body:"I will not use MySQL",upvote:10,tags:["pizza","cake","donuts"]})
db.comments.insert({author:"Lisa",body:"This is another comment",upvote:12,tags:["Hello","world"]})

> db.comments.find({author:"Homer"}).pretty()
{
        "_id" : ObjectId("609cd65b19e9b8fd60d4b6f8"),
        "author" : "Homer",
        "body" : "This is first comment",
        "upvote" : 0,
        "tags" : [
                "pizza",
                "cake",
                "soda"
        ]
}
```

## Indexes

Indexes support the efficient execution of queries in MongoDB. Without indexes, MongoDB must perform a collection scan, i.e. scan every document in a collection, to select those documents that match the query statement. If an appropriate index exists for a query, MongoDB can use the index to limit the number of documents it must inspect.

Indexes are special data structures that store a small portion of the collection's data set in an easy to traverse form. The index stores the value of a specific field or set of fields, ordered by the value of the field. The ordering of the index entries supports efficient equality matches and range-based query operations. In addition, MongoDB can return sorted results by using the ordering in the index.

```
> db.comments.ensureIndex({author:1})
{
        "createdCollectionAutomatically" : false,
        "numIndexesBefore" : 1,
        "numIndexesAfter" : 2,
        "ok" : 1
}
> db.comments.find({tags:"pizza"}).pretty()
{
        "_id" : ObjectId("609cd65b19e9b8fd60d4b6f8"),
        "author" : "Homer",
        "body" : "This is first comment",
        "upvote" : 0,
        "tags" : [
                "pizza",
                "cake",
                "soda"
        ]
}
{
        "_id" : ObjectId("609cd6c919e9b8fd60d4b6fa"),
        "author" : "Bart",
        "body" : "I will not use MySQL",
        "upvote" : 10,
        "tags" : [
                "pizza",
                "cake",
                "donuts"
        ]
}
> db.comments.ensureIndex({body:"text"})
{
        "createdCollectionAutomatically" : false,
        "numIndexesBefore" : 2,
        "numIndexesAfter" : 3,
        "ok" : 1
}
> db.comments.find({$text:{$search:"MongoDB"}})
{ "_id" : ObjectId("609cd69b19e9b8fd60d4b6f9"), "author" : "Marge", "body" : "I am huge fan of MongoDB","upvote" : 20, "tags" : [ "mongo", "database" ] }
> db.comments.find({$text:{$search:"comment"}})
{ "_id" : ObjectId("609cd70819e9b8fd60d4b6fb"), "author" : "Lisa", "body" : "This is another comment", "upvote" : 12, "tags" : [ "Hello", "world" ] }
{ "_id" : ObjectId("609cd65b19e9b8fd60d4b6f8"), "author" : "Homer", "body" : "This is first comment", "upvote" : 0, "tags" : [ "pizza", "cake", "soda" ] }

```

## SQL Query Building
```
select mandates.mode,count(distinct los_app_id) as registered,
(select count(distinct los_app_id) from mandates,mandate_status_log
where los_app_id is not null and mandates.mode='api' and mandate_status_log.mandate_id=mandates.id 
[[ AND TO_DATE(TO_CHAR(TO_TIMESTAMP(mandates.created_at / 1000), 'DD/MM/YYYY'), 'DD/MM/YYYY') >= {{start_date}} ]]
[[ AND TO_DATE(TO_CHAR(TO_TIMESTAMP(mandates.created_at / 1000), 'DD/MM/YYYY'), 'DD/MM/YYYY') <= {{end_date}} ]]) as total,
round(cast((count(los_app_id)*100) as decimal(9,2))/(select count(distinct los_app_id) from mandates,mandate_status_log
where los_app_id is not null and mandates.mode='api' and mandate_status_log.mandate_id=mandates.id 
[[ AND TO_DATE(TO_CHAR(TO_TIMESTAMP(mandates.created_at / 1000), 'DD/MM/YYYY'), 'DD/MM/YYYY') >= {{start_date}} ]]
[[ AND TO_DATE(TO_CHAR(TO_TIMESTAMP(mandates.created_at / 1000), 'DD/MM/YYYY'), 'DD/MM/YYYY') <= {{end_date}} ]]),2) as percentage from mandates,mandate_status_log
where los_app_id is not null and mandate_status_log.status='registered' and mandates.mode='api' and mandate_status_log.mandate_id=mandates.id
[[ AND TO_DATE(TO_CHAR(TO_TIMESTAMP(mandates.created_at / 1000), 'DD/MM/YYYY'), 'DD/MM/YYYY') >= {{start_date}} ]]
[[ AND TO_DATE(TO_CHAR(TO_TIMESTAMP(mandates.created_at / 1000), 'DD/MM/YYYY'), 'DD/MM/YYYY') <= {{end_date}} ]]
group by mandates.mode


mode    registered      total   percentage
api     53              125     43.20%



select mandate_status_log.failure_reason,count(mandate_status_log.failure_reason),
round(
    cast(
        (count(mandate_status_log.failure_reason)*100) AS decimal(7,2)
        )/
        (
        select count(mandate_status_log.failure_reason) 
        from mandate_status_log,mandates 
        where mandates.los_app_id is not null 
        AND mandates.id=mandate_status_log.mandate_id 
        AND mandate_status_log.status<>'registered' 
        AND mandate_status_log.failure_reason is not null 
        AND mandates.mode={{mode_}} 
        [[ AND TO_DATE(TO_CHAR(TO_TIMESTAMP(mandates.created_at / 1000), 'DD/MM/YYYY'), 'DD/MM/YYYY') >= {{start_date}} ]]
        [[ AND TO_DATE(TO_CHAR(TO_TIMESTAMP(mandates.created_at / 1000), 'DD/MM/YYYY'), 'DD/MM/YYYY') <= {{end_date}} ]]),2) as percentage
from mandates,mandate_status_log 
where mandates.los_app_id is not null 
AND mandates.id=mandate_status_log.mandate_id 
AND mandate_status_log.status<>'registered' 
AND mandate_status_log.failure_reason is not null
AND mandates.mode={{mode_}} 
and (1={{will}} or TO_DATE(TO_CHAR(TO_TIMESTAMP(mandates.created_at / 1000), 'DD/MM/YYYY'), 'DD/MM/YYYY') between {{start_date}} and {{end_date}})
group by mandate_status_log.failure_reason
order by count(mandate_status_log.failure_reason) desc

 
(3) Fund out monitor 
select
    distinct disbursement_prod.loan.fin_reference,
    disbursement_prod.disbursal_payment_details.payment_status,
    lms_pennant_postgres_db.loan_details.loan_product_type,
    --disbursement_prod.disbursal_payment_details.payment_type,
    --disbursement_prod.loan.loan_id,
    --lms_pennant_postgres_db.loan_details.loan_start_date,
    disbursement_prod.loan.created_at as loan_created,
    --disbursement_prod.disbursal_payment_details.disbursal_account_id,
    disbursement_prod.disbursal_payment_details.created_at as disbursement_created,
    (CAST(disbursement_prod.disbursal_payment_details.created_at AS timestamp) - cast(disbursement_prod.loan.created_at AS timestamp)) as time_from_loan_created_to_disbursement,
    disbursement_prod.disbursal_payment_details.failed_reason
from
    disbursement_prod.disbursal_payment_details
left join
    disbursement_prod.disbursable_loan
    on
        disbursement_prod.disbursable_loan.disbursable_loan_id = disbursement_prod.disbursal_payment_details.disbursable_loan_id
left join
    disbursement_prod.loan
    on
        disbursement_prod.disbursable_loan.loan_id = disbursement_prod.loan.loan_id
left join
    lms_pennant_postgres_db.loan_details
    on
        lms_pennant_postgres_db.loan_details.loan_number = disbursement_prod.loan.fin_reference
where
    {{payment_status}} 
    AND {{loan_created}}
    AND disbursement_prod.loan.fin_reference not like 'UC%'
    AND disbursement_prod.loan.fin_reference!=''
    AND {{loan_product_type}}
    [[ AND disbursement_prod.loan.fin_reference={{loan_number}} ]]
order by disbursement_prod.loan.fin_reference
    



how to use date_trunc() and INTERVAL?how did registrations compare to last week?
-- Week the mandates were registered
-- Count of registered mandates for that week
-- Week over week change (i.e., the difference between the count this week and the previous week).

with registered_count_by_week as (
select 
    date_trunc('week',to_timestamp(created_at/1000)) as week,
    count(*) as mandate_registered
from 
    mandates
where
    status='registered'
group by 
    week
)

select 
    w1.week,
    w1.mandate_registered,
    w2.week,
    w1.mandate_registered - w2.mandate_registered as wow_change
from    
    registered_count_by_week w1 
left join 
    registered_count_by_week w2 on w1.week = w2.week + INTERVAL '1 week'
order by
    w1.week

 
 Cohort
  
 SELECT 
    December.days AS days,
    May.may_register_count AS may_register_count,
    June.june_register_count AS june_register_count,
    July.july_register_count AS july_register_count,
    August.august_register_count AS august_register_count,
    September.september_register_count AS september_register_count,
    October.october_register_count AS october_register_count, 
    November.november_register_count AS november_register_count,
    December.december_register_count AS december_register_count
    
FROM (
        select 
            date_part('day',to_timestamp(created_at/1000)) as Days,
            count(status) as December_Register_count
        from mandates 
        where 
            date_part('month',to_timestamp(created_at/1000))=12 
            and date_part('year',to_timestamp(created_at/1000))=2021 
            and status='registered' 
            [[ and mandates.mode = {{_mode}} ]] 
            [[ and mandates.los_type = {{_los_type}} ]]
        group by date_part('day',to_timestamp(created_at/1000))
    ) AS December
        
LEFT JOIN (
            select 
                date_part('day',to_timestamp(created_at/1000)) as Days,
                count(status) as November_Register_count
            from mandates 
            where 
                date_part('month',to_timestamp(created_at/1000))=11 
                and date_part('year',to_timestamp(created_at/1000))=2021 
                and status='registered' 
                [[ and mandates.mode = {{_mode}} ]] 
                [[ and mandates.los_type = {{_los_type}} ]]
            group by date_part('day',to_timestamp(created_at/1000))
        ) As November ON December.days = November.days 
            
LEFT JOIN (
            select 
                date_part('day',to_timestamp(created_at/1000)) as Days,
                count(status) as October_Register_count
            from mandates 
            where 
                date_part('month',to_timestamp(created_at/1000))=10 
                and date_part('year',to_timestamp(created_at/1000))=2021 
            and status='registered' 
            [[ and mandates.mode = {{_mode}} ]] 
            [[ and mandates.los_type = {{_los_type}} ]]
            group by date_part('day',to_timestamp(created_at/1000))
        ) AS October ON December.days = October.days
        
LEFT JOIN (
            select 
                date_part('day',to_timestamp(created_at/1000)) as Days,
                count(status) as  September_Register_count
            from mandates 
            where 
                date_part('month',to_timestamp(created_at/1000))=9 
                and date_part('year',to_timestamp(created_at/1000))=2021 
            and status='registered' 
            [[ and mandates.mode = {{_mode}} ]] 
            [[ and mandates.los_type = {{_los_type}} ]]
            group by date_part('day',to_timestamp(created_at/1000))
        ) AS  September ON December.days =  September.days
        
LEFT JOIN (
            select 
                date_part('day',to_timestamp(created_at/1000)) as Days,
                count(status) as  August_Register_count
            from mandates 
            where 
                date_part('month',to_timestamp(created_at/1000))=8 
                and date_part('year',to_timestamp(created_at/1000))=2021 
            and status='registered' 
            [[ and mandates.mode = {{_mode}} ]] 
            [[ and mandates.los_type = {{_los_type}} ]]
            group by date_part('day',to_timestamp(created_at/1000))
        ) AS  August ON December.days =  August.days
        
LEFT JOIN (
            select 
                date_part('day',to_timestamp(created_at/1000)) as Days,
                count(status) as  July_Register_count
            from mandates 
            where 
                date_part('month',to_timestamp(created_at/1000))=7
                and date_part('year',to_timestamp(created_at/1000))=2021 
            and status='registered' 
            [[ and mandates.mode = {{_mode}} ]] 
            [[ and mandates.los_type = {{_los_type}} ]]
            group by date_part('day',to_timestamp(created_at/1000))
        ) AS  July ON December.days =  July.days
        
LEFT JOIN (
            select 
                date_part('day',to_timestamp(created_at/1000)) as Days,
                count(status) as  June_Register_count
            from mandates 
            where 
                date_part('month',to_timestamp(created_at/1000))=6
                and date_part('year',to_timestamp(created_at/1000))=2021 
            and status='registered' 
            [[ and mandates.mode = {{_mode}} ]] 
            [[ and mandates.los_type = {{_los_type}} ]]
            group by date_part('day',to_timestamp(created_at/1000))
        ) AS  June ON December.days =  June.days
        
LEFT JOIN (
            select 
                date_part('day',to_timestamp(created_at/1000)) as Days,
                count(status) as  May_Register_count
            from mandates 
            where 
                date_part('month',to_timestamp(created_at/1000))=5
                and date_part('year',to_timestamp(created_at/1000))=2021 
            and status='registered' 
            [[ and mandates.mode = {{_mode}} ]] 
            [[ and mandates.los_type = {{_los_type}} ]]
            group by date_part('day',to_timestamp(created_at/1000))
        ) AS  May ON December.days =  May.days
LIMIT 1048575
  
```

### Query JSON Data with SQL
```
select 
    msg91_audit.request_body ->> 'flow_id' as flow_id,
    count(msg91_callback.description) as DELIVERED,
    (select 
    count(msg91_callback.description) as failed
    from msg91_audit
    left join msg91_callback on right(msg91_audit.mobile,10) = right(msg91_callback.number,10)
    where msg91_audit.request_body ->> 'flow_id' = {{flow_id}} and msg91_callback.description = 'FAILED'
    AND msg91_callback.date >= {{start_date}} 
    AND msg91_callback.date <= {{end_date}}
    group by msg91_audit.request_body ->> 'flow_id'),
    (select 
    count(msg91_callback.description) as blocked
    from msg91_audit
    left join msg91_callback on right(msg91_audit.mobile,10) = right(msg91_callback.number,10)
    where msg91_audit.request_body ->> 'flow_id' = {{flow_id}} and msg91_callback.description = 'BLOCKED'
    AND msg91_callback.date >= {{start_date}} 
    AND msg91_callback.date <= {{end_date}}
    group by msg91_audit.request_body ->> 'flow_id'),
    (select 
    count(msg91_callback.description) as rejected
    from msg91_audit
    left join msg91_callback on right(msg91_audit.mobile,10) = right(msg91_callback.number,10)
    where msg91_audit.request_body ->> 'flow_id' = {{flow_id}} and msg91_callback.description = 'REJECTED'
    AND msg91_callback.date >= {{start_date}} 
    AND msg91_callback.date <= {{end_date}}
    group by msg91_audit.request_body ->> 'flow_id')
from msg91_audit
left join msg91_callback on right(msg91_audit.mobile,10) = right(msg91_callback.number,10)
where msg91_audit.request_body ->> 'flow_id' = {{flow_id}} and msg91_callback.description = 'DELIVERED'
AND msg91_callback.date >= {{start_date}} 
AND msg91_callback.date <= {{end_date}} 
group by flow_id


flow_id                         delivered       failed          blocked         rejected
5fc11c6d9ab67833277b02b4        33,843          663             68              19


select 
    msg91_audit.request_body ->> 'flow_id' as flow_id
from msg91_audit
where msg91_audit.request_body ->> 'flow_id' is not null
group by flow_id
```

## MongoDb Query Building
```
Funnel View Of Count
[
    {"$match":
        {"$and":[
            {"$expr":
                {"$gt":["$timestamp.seconds",
                    {"$floor":
                        {"$subtract":[
                            {"$divide":[
                                {"$subtract":[ {{_start}} ,new Date(1969,12,1)]
                                },1000]
                            },19800]
                        }
                    }]
                }
            },
            {"$expr":
                {"$lt":["$timestamp.seconds",
                    {"$floor":
                        {"$subtract":[
                            {"$divide":[
                                {"$subtract":[ {{_end}} ,new Date(1969,12,1)]
                                },1000]
                            },19800]
                        }
                    }]
                }
            },
            {"$or":[
                {"stage.name":"CREATE REPAYMENT LINK"},
                {"stage.name":"OTP FORM"},
                {"stage.name":"TRIGGER OTP"},
                {"stage.name":"VERIFY | RESEND"}
                {"stage.name":"VERIFY OTP"},
                {"stage.name":"LOAN DETAILS"},
                {"stage.name":"PAYMENT SCREEN"},
                {"stage.name":"FINAL SCREEN"}]
            },{"$and":[
                {"stage.action":"end"},
                {"variables.mobileNumber":{"$ne":"7016738442"}},
                {"variables.mobileNumber":{"$ne":"9900858081"}}]
            }]
        }    
    },
    {"$group" : {_id:"$stage.name", count:{$sum:1}}},
    {"$sort": {count:-1}},
    {"$project":{Name_Of_event:"$_id",Count:"$count",_id:0}}
]
//end date is not included


Customer level data of ( i )
[
    {"$match":
        {"$and":[
            {"$expr":
                {"$gt":["$timestamp.seconds",
                    {"$floor":
                        {"$subtract":[
                            {"$divide":[
                                {"$subtract":[ {{_start}} ,new Date(1969,12,1)]
                                },1000]
                            },19800]
                        }
                    }]
                }
            },
            {"$expr":
                {"$lt":["$timestamp.seconds",
                    {"$floor":
                        {"$subtract":[
                            {"$divide":[
                                {"$subtract":[ {{_end}} ,new Date(1969,12,1)]
                                },1000]
                            },19800]
                        }
                    }]
                }
            },
            {"$or":[
                {"stage.name":"CREATE REPAYMENT LINK"},
                {"stage.name":"OTP FORM"},
                {"stage.name":"TRIGGER OTP"},
                {"stage.name":"VERIFY | RESEND"}
                {"stage.name":"VERIFY OTP"},
                {"stage.name":"LOAN DETAILS"},
                {"stage.name":"PAYMENT SCREEN"},
                {"stage.name":"FINAL SCREEN"},
                {"stage.name":"process timeout"}]
            },{"$and":[
                {"stage.action":"end"},
                
                {"variables.mobileNumber":{"$eq":{{mobile_no}}}}]
            }]
        }    
    },
    {"$facet":{
        "CREATE_REPAYMENT_LINK": [
            {"$match":{"$and":[{"stage.name":"CREATE REPAYMENT LINK"}]}},
            {"$group": {_id: "$businessKey.current",count:{$sum:1}}}],
        
        "OTP_FORM": [
            {"$match":{"$and":[{"stage.name":"OTP FORM"}]}},
            {"$group": {_id: "$businessKey.current",count:{$sum:1}}}],
        
        "TRIGGER_OTP": [
            {"$match":{"$and":[{"stage.name":"TRIGGER OTP"}]}},
            {"$group": {_id: "$businessKey.current",count:{$sum:1}}}],
            
        "VERIFY_RESEND": [
            {"$match":{"$and":[{"stage.name":"VERIFY | RESEND"}]}},
            {"$group": {_id: "$businessKey.current",count:{$sum:1}}}],    
            
        "VERIFY_OTP": [
            {"$match":{"$and":[{"stage.name":"VERIFY OTP"}]}},
            {"$group": {_id: "$businessKey.current",count:{$sum:1}}}],
            
        "LOAN_DETAILS": [
            {"$match":{"$and":[{"stage.name":"LOAN DETAILS"}]}},
            {"$group": {_id: "$businessKey.current",count:{$sum:1}}}],
            
        "PAYMENT_SCREEN": [
            {"$match":{"$and":[{"stage.name":"PAYMENT SCREEN"}]}},
            {"$group": {_id: "$businessKey.current",count:{$sum:1}}}],
            
        "FINAL_SCREEN": [
            {"$match":{"$and":[{"stage.name":"FINAL SCREEN"}]}},
            {"$group": {_id: "$businessKey.current",count:{$sum:1}}}]
        
        }
    },
    {"$project":{_id:0,"Customer":{{mobile_no}},
                "CREATE REPAYMENT LINK":{$arrayElemAt: [ "$CREATE_REPAYMENT_LINK.count", 0 ]},
                "OTP FORM":{$arrayElemAt: [ "$OTP_FORM.count", 0 ]},
                "TRIGGER OTP":{$arrayElemAt: [ "$TRIGGER_OTP.count", 0 ]},
                "VERIFY | RESEND":{$arrayElemAt: [ "$VERIFY_RESEND.count", 0 ]},
                "VERIFY OTP":{$arrayElemAt: [ "$VERIFY_OTP.count", 0 ]},
                "LOAN DETAILS":{$arrayElemAt: [ "$LOAN_DETAILS.count", 0 ]},
                "PAYMENT SCREEN":{$arrayElemAt: [ "$PAYMENT_SCREEN.count", 0 ]},
                "FINAL SCREEN":{$arrayElemAt: [ "$FINAL_SCREEN.count", 0 ]}
    }}
]
//end date is not included

Loan count
[
    {"$match":
        {"$and":[
            {"$expr":
                {"$gt":["$timestamp.seconds",
                    {"$floor":
                        {"$subtract":[
                            {"$divide":[
                                {"$subtract":[ {{_start}} ,new Date(1969,12,1)]
                                },1000]
                            },19800]
                        }
                    }]
                }
            },
            {"$expr":
                {"$lt":["$timestamp.seconds",
                    {"$floor":
                        {"$subtract":[
                            {"$divide":[
                                {"$subtract":[ {{_end}} ,new Date(1969,12,1)]
                                },1000]
                            },19800]
                        }
                    }]
                }
            },
            {"$and":[
                {"stage.action":"start"},
                {"stage.name":"LOAN DETAILS"},
                {"variables.mobileNumber":{"$ne":"7016738442"}}]
            }]
        }    
    },
    [[{ $match: { "variables.mobileNumber" : { $eq: {{mobilenumber}} } } },]]
    {"$project":{mobileNumber:"$variables.mobileNumber",_id:0,numberOfLoans: { "$cond": { if:{ "$isArray": "$variables.loans" }, then: { "$size": "$variables.loans" }, else: "NA"}},loans:"$variables.loans"}},
    {"$match":{"$and":[{"numberOfLoans":{"$gt":0}}]}},
    {"$sort":{numberOfLoans:-1}}
]
//end date is not included

KYC count
[
    {"$match":
        {"$and":[
            {"$expr":
                {"$gt":["$timestamp.seconds",
                    {"$floor":
                        {"$subtract":[
                            {"$divide":[
                                {"$subtract":[ {{_start}} ,new Date(1969,12,1)]
                                },1000]
                            },19800]
                        }
                    }]
                }
            },
            {"$expr":
                {"$lt":["$timestamp.seconds",
                    {"$floor":
                        {"$subtract":[
                            {"$divide":[
                                {"$subtract":[ {{_end}} ,new Date(1969,12,1)]
                                },1000]
                            },19800]
                        }
                    }]
                }
            },
            {"$or":[
                {"stage.name":"CKYC Not accepted"},
                {"stage.name":"initiate kyc"},
                {"stage.name":"Initiate ekyc Error"},
                {"stage.name":"retrieveEkycUrl"},
                {"stage.name":"resume kyc"},
                {"stage.name":"Failed Retrieve Ekyc url"},
                {"stage.name":"Redirect to Digio"},
                {"stage.name":"ekyc Complete"},
                {"stage.name":"KYC Completed"}]
            },{"$and":[
                {"stage.action":"end"}]
            }]
        }    
    },
    {"$facet":{
        
        "CKYC_Initiate": [
            {"$match":{"$and":[{"stage.name":"CKYC Initiate"}]}},
            {"$group": {_id: "$businessKey.root",count:{$sum:1}}},
            {"$addFields":{test:{ "$cond": { if:{ "$gt": ["$count",1] }, then:1, else:1}},st:"tempstageforquery"}},
            {"$group" : {_id:"$st", count:{$sum:1}}}],
        
        "CKYC_Search": [
            {"$match":{"$and":[{"stage.name":"CKYC Search"}]}},
            {"$group": {_id: "$businessKey.root",count:{$sum:1}}},
            {"$addFields":{test:{ "$cond": { if:{ "$gt": ["$count",1] }, then:1, else:1}},st:"tempstageforquery"}},
            {"$group" : {_id:"$st", count:{$sum:1}}}],
            
        "CKYC_Search_Success": [
            {"$match":{"$and":[{"stage.name":"CKYC Search Success"}]}},
            {"$group": {_id: "$businessKey.root",count:{$sum:1}}},
            {"$addFields":{test:{ "$cond": { if:{ "$gt": ["$count",1] }, then:1, else:1}},st:"tempstageforquery"}},
            {"$group" : {_id:"$st", count:{$sum:1}}}],
            
        "CKYC_Form": [
            {"$match":{"$and":[{"stage.name":"CKYC Form"}]}},
            {"$group": {_id: "$businessKey.root",count:{$sum:1}}}
            {"$addFields":{test:{ "$cond": { if:{ "$gt": ["$count",1] }, then:1, else:1}},st:"tempstageforquery"}},
            {"$group" : {_id:"$st", count:{$sum:1}}}],
            
        "CKYC_Not_accepted": [
            {"$match":{"$and":[{"stage.name":"CKYC Not accepted"}]}},
            {"$group": {_id: "$businessKey.root",count:{$sum:1}}}
            {"$addFields":{test:{ "$cond": { if:{ "$gt": ["$count",1] }, then:1, else:1}},st:"tempstageforquery"}},
            {"$group" : {_id:"$st", count:{$sum:1}}}],
            
        "initiate_kyc": [
            {"$match":{"$and":[{"stage.name":"initiate kyc"}]}},
            {"$group": {_id: "$businessKey.root",count:{$sum:1}}}
            {"$addFields":{test:{ "$cond": { if:{ "$gt": ["$count",1] }, then:1, else:1}},st:"tempstageforquery"}},
            {"$group" : {_id:"$st", count:{$sum:1}}}],
            
        "Initiate_ekyc_Error": [
            {"$match":{"$and":[{"stage.name":"Initiate ekyc Error"}]}},
            {"$group": {_id: "$businessKey.root",count:{$sum:1}}}
            {"$addFields":{test:{ "$cond": { if:{ "$gt": ["$count",1] }, then:1, else:1}},st:"tempstageforquery"}},
            {"$group" : {_id:"$st", count:{$sum:1}}}], 
            
        "retrieveEkycUrl": [
            {"$match":{"$and":[{"stage.name":"retrieveEkycUrl"}]}},
            {"$group": {_id: "$businessKey.root",count:{$sum:1}}}
            {"$addFields":{test:{ "$cond": { if:{ "$gt": ["$count",1] }, then:1, else:1}},st:"tempstageforquery"}},
            {"$group" : {_id:"$st", count:{$sum:1}}}],
            
        "resume_kyc": [
            {"$match":{"$and":[{"stage.name":"resume kyc"}]}},
            {"$group": {_id: "$businessKey.root",count:{$sum:1}}}
            {"$addFields":{test:{ "$cond": { if:{ "$gt": ["$count",1] }, then:1, else:1}},st:"tempstageforquery"}},
            {"$group" : {_id:"$st", count:{$sum:1}}}],
        
        "Failed_Retrieve_Ekyc_url": [
            {"$match":{"$and":[{"stage.name":"Failed Retrieve Ekyc url"}]}},
            {"$group": {_id: "$businessKey.root",count:{$sum:1}}}
            {"$addFields":{test:{ "$cond": { if:{ "$gt": ["$count",1] }, then:1, else:1}},st:"tempstageforquery"}},
            {"$group" : {_id:"$st", count:{$sum:1}}}],
        
        "Redirect_to_Digio": [
            {"$match":{"$and":[{"stage.name":"Redirect to Digio"}]}},
            {"$group": {_id: "$businessKey.root",count:{$sum:1}}}
            {"$addFields":{test:{ "$cond": { if:{ "$gt": ["$count",1] }, then:1, else:1}},st:"tempstageforquery"}},
            {"$group" : {_id:"$st", count:{$sum:1}}}],
        
        "ekyc_Complete": [
            {"$match":{"$and":[{"stage.name":"ekyc Complete"}]}},
            {"$group": {_id: "$businessKey.root",count:{$sum:1}}}
            {"$addFields":{test:{ "$cond": { if:{ "$gt": ["$count",1] }, then:1, else:1}},st:"tempstageforquery"}},
            {"$group" : {_id:"$st", count:{$sum:1}}}],
            
        "KYC_Completed": [
            {"$match":{"$and":[{"stage.name":"KYC Completed"}]}},
            {"$group": {_id: "$businessKey.root",count:{$sum:1}}}
            {"$addFields":{test:{ "$cond": { if:{ "$gt": ["$count",1] }, then:1, else:1}},st:"tempstageforquery"}},
            {"$group" : {_id:"$st", count:{$sum:1}}}]
        }
    },
    {"$project":{_id:1,
                "CKYC Initiate":{$arrayElemAt: [ "$CKYC_Initiate.count", 0 ]},
                "CKYC Search":{$arrayElemAt: [ "$CKYC_Search.count", 0 ]},
                "CKYC Search Success":{$arrayElemAt: [ "$CKYC_Search_Success.count", 0 ]},
                "CKYC Form":{$arrayElemAt: [ "$CKYC_Form.count", 0 ]},
                "CKYC Not accepted":{ "$cond": { if:{ "$gt": [{$arrayElemAt: [ "$CKYC_Not_accepted.count", 0 ]},0] }, then: {$arrayElemAt: [ "$CKYC_Not_accepted.count", 0 ]}, else: 0}},
                "Initiate eKYC":{$arrayElemAt: [ "$initiate_kyc.count", 0 ]},
                "Initiate eKYC Error":{$arrayElemAt: [ "$Initiate_ekyc_Error.count", 0 ]},
                "retrieveEkycUrl":{$arrayElemAt: [ "$retrieveEkycUrl.count", 0 ]},
                "Resume eKYC":{$arrayElemAt: [ "$resume_kyc.count", 0 ]},
                "Failed Retrieve eKYC url":{$arrayElemAt: [ "$Failed_Retrieve_Ekyc_url.count", 0 ]},
                "Redirect to Digio":{$arrayElemAt: [ "$Redirect_to_Digio.count", 0 ]},
                "eKYC_Complete":{ "$cond": { if:{ "$gt": [{$arrayElemAt: [ "$ekyc_Complete.count", 0 ]},0] }, then: {$arrayElemAt: [ "$ekyc_Complete.count", 0 ]}, else: 0}},
                "KYC_Completed":{$arrayElemAt: [ "$KYC_Completed.count", 0 ]}
    }}
]
  
```

  [bps10]: https://github.com/bps10
  [gfm-api]: https://developer.github.com/v3/markdown/
  [glfm-api]: https://docs.gitlab.com/ee/api/markdown.html
  [hexatrope]: https://github.com/hexatrope
  [home]: https://github.com/revolunet/sublimetext-markdown-preview
  [hozaka]: https://github.com/hozaka
  [hadisfr]: https://github.com/hadisfr
  [issue]: https://github.com/facelessuser/MarkdownPreview/issues
  [license]: http://revolunet.mit-license.org
  [live-reload]: https://packagecontrol.io/packages/LiveReload
  [pymd]: https://github.com/Python-Markdown/markdown
  [pymdownx-docs]: http://facelessuser.github.io/pymdown-extensions/usage_notes/
  [tommi]: https://github.com/tommi
  [github-ci-image]: https://github.com/facelessuser/MarkdownPreview/workflows/build/badge.svg
  [github-ci-link]: https://github.com/facelessuser/MarkdownPreview/actions?workflow=build
  [pc-image]: https://img.shields.io/packagecontrol/dt/MarkdownPreview.svg?logo=sublime%20text&logoColor=cccccc
  [pc-link]: https://packagecontrol.io/packages/MarkdownPreview
  [license-image]: https://img.shields.io/badge/license-MIT-blue.svg




