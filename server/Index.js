const express = require("express");
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://mongo:mongo@cluster0.qzf0u01.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const PORT = process.env.PORT || 3001;

const app = express();

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello from Axel!" });
});

app.get("/api/testArticle", (request, response) => {
    client.connect(async err => {
    const collection = client.db("nyheter").collection("article");
    const cursor = collection.find({});
    const allValues = await cursor.toArray();
    console.log(allValues);
    response.json(allValues);
    client.close();
  });

});



// const uri = "mongodb+srv://mongo:mongo@cluster0.qzf0u01.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(async err => {
//   const collection = client.db("sample_airbnb").collection("listingsAndReviews");
//   // perform actions on the collection object
//   const pipeline = [
//     {
//       '$match': {
//         'accommodates': {
//           '$gt': 4
//         }
//       }
//     }, {
//       '$match': {
//         'price': {
//           '$lt': 500
//         }
//       }
//     }
//   ]
//
//   const agg = await collection.aggregate(pipeline).toArray();
//
//   console.log(agg);
//
//   client.close();
// });
