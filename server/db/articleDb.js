const {
  MongoClient,
  ObjectId
} = require('mongodb')
const express = require("express");

// should be moved to ENV variable
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

const getCategory = (category) => {
  const collection = db.collection('article')
  return collection.find({
    'categories': category
  }).toArray()
}

// Post an article to the database, will get a unique id from mongoDB.
const postArticle = async (doc) => {
  doc.dateAdded = new Date();
  doc.views = 0;
  console.log(doc)
  const collection = db.collection('article');
  return await collection.insertOne(doc);
}

module.exports = {
  init,
  getArticles,
  postArticle,
  getCategory
}
