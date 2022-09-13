const {
  MongoClient,
  ObjectId
} = require('mongodb')
const express = require("express");

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

  const getUserWithEmail = (email) => {
    const collection = db.collection('account')
    return collection.find({
      'email': email
    }).toArray()
  }
