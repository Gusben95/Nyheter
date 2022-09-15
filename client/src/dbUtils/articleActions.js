async function fetchArticles() {
  const response = await fetch("/allArticles");
  const data = await response.json();
  return data;
}

async function fetchArticlesByCategory(category) {
  const response = await fetch("/articlesByCategory", {
    method: 'POST',
    body: JSON.stringify(category),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();
  return data;
}

async function fetchArticlesBySearch(searchInput) {
  const response = await fetch("/articlesBySearch", {
    method: 'POST',
    body: JSON.stringify(searchInput),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();
  return data;
}

async function postArticle(article) {
  const response = await fetch("/postArticle", {
    method: 'POST',
    body: JSON.stringify(article),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();
  console.log(data);
  return data;
}

async function deleteArticle(article) {
  const response = await fetch("/deleteArticle", {
    method: 'POST',
    body: JSON.stringify(article),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();
  console.log(data);
  return data;
}

async function updateArticle(article) {
  const response = await fetch("/updateArticle", {
    method: 'POST',
    body: JSON.stringify(article),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();
  console.log(data);
  return data;
}


/* Göm API nyckel med dot.env */
async function fetchArticleAndSendToDatabase(stateArticles) {
  let api_key = "4e2e0d17af1c40ec976605105ef2b6cd";
  let url = "https://newsapi.org/v2/everything?q=funny&apiKey=" + api_key

  let response = await fetch(url);
  let data = await response.json();

  let randomNumber = Math.round(Math.random() * 99)

  let article = data.articles[randomNumber];

  let articleToDB = {
    title: article.title,
    shortDescription: article.description,
    mainText: article.content,
    categories: ["utrikes"],
    author: article.author,
    images: [article.urlToImage]
  }

  let duplicate = false
  stateArticles.forEach(articleFromState => {
    if (articleFromState.title === articleToDB.title) {
      console.log("Already added!")
      duplicate = true;
    }
  })

  if (!duplicate) {
    return articleToDB
  }
}

module.exports = {
  fetchArticles,
  fetchArticlesByCategory,
  fetchArticlesBySearch,
  postArticle,
  deleteArticle,
  updateArticle,
  fetchArticleAndSendToDatabase
}
