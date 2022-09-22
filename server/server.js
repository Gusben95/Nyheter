const express = require("express");
const helmet = require("helmet");
require('dotenv').config();
const {
  init,
  getArticles,
  postArticle,
  getSearch,
  getCategory,
  deleteArticle,
  updateArticle,
  updateViews
} = require('./db/articleDb')
 const {
   initAcc,
   getAccountByEmail,
   createAccount
 } = require('./db/accountDb')
 const {
   comparePassword
 } = require('./utils/bcryptUtils')


const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json())
app.use(helmet());

init().then(initAcc().then(() => {
  console.log(`Server listening on ${PORT}`);
  app.listen(PORT);
}))

// Add headers before the routes are defined
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  res.setHeader('cross-origin-resource-policy', 'cross-origin');

  // Pass to next layer of middleware
  next();
});

// -------- article database --------
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
        images: item.images,
        dateUpdated: item.dateUpdated
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
        images: item.images,
        dateUpdated: item.dateUpdated
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
        images: item.images,
        dateUpdated: item.dateUpdated
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

// Deletes an article from the database with the id of the article
app.post('/deleteArticle', async (request, response) => {
  let article = await request.body.id;
  let res = await deleteArticle(article).catch((err) => {
    console.log(err)
    response.status(500).end()
  })
  response.json(res)
})

// Updates an article in the database with the id of the article,
// the body should contain an article object like this
// article : {
//      id: id,
//      title: title,
//      shortDescription: shortDescription,
//      mainText: mainText,
//      categories: categories,
//      author: author,
//      views: views,
//      images: images
//    }
app.post('/updateArticle', async (request, response) => {
  let updatedArticle = await request.body
  console.log(updatedArticle)
  let res = await updateArticle(updatedArticle).catch((err) => {
    console.log(err)
    response.status(500).end()
  })
  response.json(res)
})

app.post('/incrementViewCount', async (request, response) => {
  let article = await request.body.id;
  let res = await updateViews(article).catch((err) => {
    console.log(err)
    response.status(500).end()
  })
  response.json(res)
})


// will fetche articles orded by date
// app.post('/articleByDate', async (request, response) => {
//   let article = await request.body
// })


// -------- account database --------
app.post('/getAccountWithEmail', async (request, response) => {
  let account = await request.body
  let res = await getAccountByEmail(account).catch((err) => {
    console.log(err)
    response.status(500).end()
  })
  console.log(response);
  if(res.length > 0){
    const compareCheck = await comparePassword(account.password, res[0].password)
    if (compareCheck){
        response.json(res);
    }else {
      response.json("wrong password");
    }
  }else{
    response.json("Wrong email");
  }
})

app.post('/createAccount', async (request, response) => {
  let account = await request.body
  console.log(account)
  let res = await createAccount(account).catch((err) => {
    console.log(err)
    response.status(500).end()
  })
  //console.log(response)
})