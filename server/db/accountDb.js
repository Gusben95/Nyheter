const {
  MongoClient,
  ObjectId
} = require('mongodb')
const {
  hashPassword
} = require('../utils/bcryptUtils')


// Should be moved to ENV variable
const connectionUrl = "mongodb+srv://mongo:mongo@cluster0.qzf0u01.mongodb.net/?retryWrites=true&w=majority";

const dbName = 'nyheter'
let db

const initAcc = () =>
  MongoClient.connect(connectionUrl, {
    useNewUrlParser: true
  }).then((client) => {
    db = client.db(dbName)
  })

const getAccountByEmail = (account) => {
  const collection = db.collection('account')
  return collection.find({
    email: account.email
  }).toArray()
}

const createAccount = async (account) => {
  const collection = db.collection('account')
  account.role = "user";
  account.stillPaying = false;
  account.subscriptionEnd = "";
  account.password = await hashPassword(account.password);
  console.log(account);
  return await collection.insertOne(account);
}


module.exports = {
  initAcc,
  getAccountByEmail,
  createAccount
}
