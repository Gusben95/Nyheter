const {
  MongoClient,
  ObjectId
} = require('mongodb')
require('dotenv').config();
// Should be moved to ENV variable
const connectionUrl = "mongodb+srv://mongo:mongo@cluster0.qzf0u01.mongodb.net/?retryWrites=true&w=majority";
const dbName = 'nyheter'
let db

const init = () =>
  MongoClient.connect(connectionUrl, {
    useNewUrlParser: true
  }).then((client) => {
    db = client.db(dbName)
  })

// Fetches all articles from the database
const getArticles = () => {
  const collection = db.collection('article')
  return collection.find({}).toArray()
}

// Fetches articles from the database depending on the category
const getCategory = (category) => {
  const collection = db.collection('article')
  return collection.find({
    'categories': category
  }).toArray()
}

// Featch articles depending on the search query
const getSearch = (searchInput) => {
  // only need to index the collection once
  // db.collection('article').createIndex({ title: "text", shortDescription: "text", mainText: "text" });
  const query = {
    $text: {
      $search: searchInput
    }
  };
  const sort = {
    score: {
      $meta: "textScore"
    }
  };
  const projection = {
    title: 1,
    shortDescription: 1,
    mainText: 1,
    categories: 1,
    author: 1,
    dateAdded: 1,
    images: 1,
    views: 1,
    score: {
      $meta: "textScore"
    },
  };

  const collection = db.collection('article')
  return collection.find(query).sort(sort).project(projection).toArray()
}

// Post an article to the database, will get a unique id from mongoDB.
const postArticle = async (doc) => {
  doc.dateAdded = new Date();
  doc.views = 0;
  /* console.log(doc) */
  const collection = db.collection('article');
  return await collection.insertOne(doc);
}

// Delete an article from the database with the id from mongoDB
const deleteArticle = async (article) => {
  const collection = db.collection('article')
  let articleId = new ObjectId(article);
  // console.log("id i articleDb", article)
  const doc = {
    _id: articleId
  }
  const deleteResult = await collection.deleteMany(doc);
  return deleteResult
}

const updateArticle = async (article) => {
  const collection = db.collection('article')
  let updatedDoc = {};
  if (article.title) updatedDoc.title = article.title;
  if (article.shortDescription) updatedDoc.shortDescription = article.shortDescription;
  if (article.mainText) updatedDoc.mainText = article.mainText;
  if (article.categories) updatedDoc.categories = article.categories;
  if (article.author) updatedDoc.author = article.author;
  if (article.views) updatedDoc.views = article.views;
  if (article.images) updatedDoc.images = article.images;
  updatedDoc.dateUpdated = new Date();
  updatedDoc = {
    $set: updatedDoc
  }
  let articleId = new ObjectId(article.id)
  const filter = {
    _id: articleId
  }
  const result = await collection.updateOne(filter, updatedDoc);
  return result
}

const updateViews = async (article) => {
  const collection = db.collection('article')
  let articleId = new ObjectId(article)
  const filter = {
    _id: articleId
  }
  const increment = {
    $inc: {
      views: 1
    }
  }
  const result = await collection.updateOne(filter, increment);
  return result
}


module.exports = {
  init,
  getArticles,
  postArticle,
  getSearch,
  getCategory,
  deleteArticle,
  updateArticle,
  updateViews
}
