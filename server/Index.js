const express = require("express");
const {
  init,
  getArticles,
  postArticle
} = require('./db/articleDb')
const {
  MongoClient,
  ServerApiVersion
} = require('mongodb');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json())


init().then(() => {
  console.log(`Server listening on ${PORT}`);
  app.listen(PORT);
})

app.get("/api", (req, res) => {
  res.json({
    message: "Hello from Axel!"
  });
});


// Get all the articles from the database.
// Loops through the articles the places them in an array
app.get('/items', (request, response) => {
  getArticles()
    .then((items) => {
      items = items.map((item) => ({
        id: item._id,
        title: item.title,
        shortDescription: item.shortDescription,
        mainText: item.mainText,
        categories: item.categories,
        author: item.author,
        dateAdded: item.dateAdded,
        views: item.views,
        images: item.images
      }))
      response.json(items)
    })
    .catch((err) => {
      console.log(err)
      response.status(500).end()
    })
})

// Takes a article object and posts it to the database
// example on a article object
// let article = {
//   title: "title",
//   shortDescription: "shortDescription",
//   mainText: "mainText",
//   categorys: "categorys",
//   author: "author",
//   images: "images"
// }
app.post('/postArticle', async (request, response) => {
  let article = await request.body;
  postArticle(article).catch((err) => {
    console.log(err)
    response.status(500).end()
  })
  response.json("Success")
})


// Ignore this
// app.get("/api/testArticle", (request, response) => {
//     client.connect(async err => {
//     const collection = client.db("nyheter").collection("article");
//     const cursor = collection.find({});
//     const allValues = await cursor.toArray();
//     console.log(allValues);
//     response.json(allValues);
//     if (result.error) {
//     console.log(result.error)
//     }
//     client.close();
//   });
//
// });
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
//   const agg = await collection.aggregate(pipeline).toArray();
//   console.log(agg);
//   client.close();
// });
