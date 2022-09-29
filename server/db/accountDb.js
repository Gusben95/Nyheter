const {
  MongoClient,
  ObjectId
} = require('mongodb')
const {
  hashPassword
} = require('../utils/bcryptUtils')
require('dotenv').config();

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

const getAccountByEmail = async (account) => {

  const collection = db.collection('account')
  let res = await collection.find({
    email: account.email
  }).toArray()
  console.log(res)
  return res;
}

const createAccount = async (account) => {

  // FIXA SÅ DEN KOLLAR SÅ DET INTE FINNS ETT ACCOUNT MED SAMMA MAIL
  const collection = db.collection('account')
  account.role = "user";
  account.stillPaying = false;
  account.subscriptionEnd = "";
  account.password = await hashPassword(account.password);
  console.log(account);
  return await collection.insertOne(account);
}


/// kolla så den funkar som den ska
const updateAccount = async (account) => {
  const collection = db.collection('account')
  let updatedAccount = {};
  if (account.name) updatedDoc.name = account.name;
  if (account.password) updatedDoc.password = await hashPassword(account.password);
  if (account.email) updatedDoc.email = account.email;
  if (account.preference) updatedDoc.preference = account.preference;
  if (account.role) updatedDoc.role = account.role;
  if (account.stillPaying) updatedDoc.stillPaying = account.stillPaying;
  if (account.subscriptionEnd) updatedDoc.subscriptionEnd = account.subscriptionEnd;
  if (account.token) updatedDoc.token = account.token;

  updatedAccount = {
    $set: updatedAccount
  }
  let accountId = new ObjectId(account.id)
  const filter = {
    _id: accountId
  }
  const result = await collection.updateOne(filter, updatedDoc);
  return result;
}


module.exports = {
  initAcc,
  getAccountByEmail,
  createAccount,
  updateAccount
}
