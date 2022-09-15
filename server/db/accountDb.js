const {
  MongoClient,
  ObjectId
} = require('mongodb')


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


module.exports = {
  initAcc,
  getAccountByEmail
}
