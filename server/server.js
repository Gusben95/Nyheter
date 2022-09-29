const express = require("express");
const nodeMailer = require('nodemailer');
const helmet = require("helmet");
require('dotenv').config();
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
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
  createAccount,
  updateAccount,
  updatePassword
} = require('./db/accountDb')
const {
  comparePassword
} = require('./utils/bcryptUtils')


const PORT = process.env.PORT || 3001;
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.json())
app.use(helmet());

init().then(initAcc().then(() => {
  console.log(`Server listening on ${PORT}`);
  app.listen(PORT);
}))

// Add headers before the routes are defined
app.use(function(req, res, next) {

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

// Login limiter 


//***********************  FUNKTIONELL KOD AVSTÄNGD UNDER UTVÄCKLINGSFAS *************************
// Förhindrar upprepade loginförsök från samma IP-Address 
// const repeatedLoginlimiter = rateLimit({
// 	windowMs: 10 * 60 * 1000, 
// 	max: 5,
// 	standardHeaders: true, 
// 	legacyHeaders: false, 

// }
// )



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
app.post('/getAccountWithEmail', /* repeatedLoginlimiter */  async (request, response) => {
  let account = await request.body
  account.email = account.email.replace(/[&\/\!\#,+()$~%'":*?<>{}]/g, '');
  /* console.log(account.email); */
  let res = await getAccountByEmail(account).catch((err) => {
    console.log(err)
    response.status(500).end()
  })
  if (res.length > 0) {
    const compareCheck = await comparePassword(account.password, res[0].password)
    if (compareCheck) {
      response.json(res);
    } else {
      response.status(500)
      response.json("wrong password");
    }
  } else {
    response.status(500)
    response.json("Wrong email");
  }
})

app.post('/createAccount', async (request, response) => {
  let account = await request.body
  const accountExists = await getAccountByEmail(account)
    if(accountExists.length == 0){
      console.log(account)
      let res = await createAccount(account).catch((err) => {
        console.log(err)
        response.status(500).end()
      })
      response.json(res)
    }
    else {
      response.json("account already exists");
    }

})

app.post('/updateAccount', async (request, response) => {
  let account = await request.body
  let res = await updateAccount(account).catch((err) => {
    console.log(err)
    response.status(500).end()
  })
  response.json(res)
})
app.post('/updatePassword', async (request, response) => {
  let account = await request.body
  let res = await updatePassword(account).catch((err) => {
    console.log(err)
    response.status(500).end()
  })
  response.json(res)
})

// mail
app.get('/send-email', async function (req, res) {
  const transporter = nodeMailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'eldora.kling45@ethereal.email',
        pass: 'BtXAcaqnUVFeHneQdZ'
    }

});
let info = await transporter.sendMail({
  from: '"Nyhetssidan" <Nyhetssidan@noreply.se>',
  to: "nyheterunicorn@gmail.com", // Test email address
  subject: "Nyhetssidans nyhetsbrev",
  text: "Här kommer",
  html: "Here's an <b>HTML version</b> of the email.",
});
console.log("Message sent: %s", info.messageId); // Output message ID
console.log("View email: %s", nodeMailer.getTestMessageUrl(info)); // URL to preview email
  });

  app.get('/pw-reset', async function (req, res) {
    const transporter = nodeMailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
          user: 'eldora.kling45@ethereal.email',
          pass: 'BtXAcaqnUVFeHneQdZ'
      }

  });
  let info = await transporter.sendMail({
    from: '"Nyhetssidan" <Nyhetssidan@noreply.se>',
    to: "nyheterunicorn@gmail.com", // Test email address
    subject: "password reset",
    text: "Här kommer ditt nya lösenord",
    html: "Here's an <b>HTML version</b> of the email.",
  });
  console.log("Message sent: %s", info.messageId); // Output message ID
  console.log("View email: %s", nodeMailer.getTestMessageUrl(info)); // URL to preview email
    });
