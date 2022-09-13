const express = require("express");
const {
  init,
  getArticles,
  postArticle,
  getSearch,
  getCategory
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


// Get all the articles from the database.
// Loops through the articles the places them in an array
app.get('/allArticles', (request, response) => {
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

// fetches articles from the database depending on the category
// body should contain an object
// let thisCatagory = {category: "sport"};
// something like this
app.post('/articlesByCategory', async (request, response) => {
  let category = await request.body.category;
  getCategory(category)
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

// Fetches articles from the database depending on whats in the title, shortDescription and mainText
// body should contain a search string
app.post('/articlesBySearch', async (request, response) => {
  let searchInput = await request.body.searchInput;
  getSearch(searchInput)
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
//   categories: ["category 1", "category 2", "category 3"],
//   author: "author",
//   images: ["image 1", "image 2", "image 3"]
// }
app.post('/postArticle', async (request, response) => {
  let article = await request.body;
  postArticle(article).catch((err) => {
    console.log(err)
    response.status(500).end()
  })
  response.json("Success")
})
