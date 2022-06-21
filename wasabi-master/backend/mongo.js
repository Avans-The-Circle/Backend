let MongoClient = require('mongodb').MongoClient
let mongoURL = "mongodb://localhost:27017/mydb";

createDatabase(){
    MongoClient.connect(mongoURL, function(err, db) {
    if (err) throw err
    console.log("Database created!")
    db.close()
    })
}

insertIntoDatabase(){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err
        var dbo = db.db("mydb")
        var myobj = { name: "Company Inc", address: "Highway 37" }
        dbo.collection("customers").insertOne(myobj, function(err, res) {
          if (err) throw err
          console.log("1 document inserted")
          db.close()
        })
      })
}
