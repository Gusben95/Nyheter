//const BASE_URL = "https://nyhetssidan-jkl.fly.dev"
const BASE_URL = "http://localhost:3001"

async function fetchArticles() {
  const response = await fetch(BASE_URL + "/allArticles");
  const data = await response.json();
  return data;
}

async function fetchArticlesByCategory(category) {
  const response = await fetch(BASE_URL + "/articlesByCategory", {
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
  const response = await fetch(BASE_URL + "/articlesBySearch", {
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
  const response = await fetch(BASE_URL + "/postArticle", {
    method: 'POST',
    body: JSON.stringify(article),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();
  return data;
}

async function deleteArticle(article) {
  const response = await fetch(BASE_URL + "/deleteArticle", {
    method: 'POST',
    body: JSON.stringify(article),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();
  return data;
}

async function updateArticle(article) {
  const response = await fetch(BASE_URL + "/updateArticle", {
    method: 'POST',
    body: JSON.stringify(article),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();
  return data;
}

async function incrementViewCount(article) {
  const response = await fetch(BASE_URL + "/incrementViewCount", {
    method: 'POST',
    body: JSON.stringify(article),
    headers: {
      'Content-Type':'application/json'
    }
  });
  const data = await response.json();
  return data;
}


/*Should be moved to ENV variable */
async function fetchArticleAndSendToDatabase(stateArticles) {
  let api_key = process.env.REACT_APP_API_KEY;
  let url = "https://newsapi.org/v2/everything?q=funny&apiKey=" + api_key

  const response = await fetch(url);
  const data = await response.json();

  const randomNumber = Math.round(Math.random() * 99)
  const article = data.articles[randomNumber];

  const articleToDB = {
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
      duplicate = true;
    }
  })

  if (!duplicate) {
    return articleToDB
  }
}

export{
  fetchArticles,
  fetchArticlesByCategory,
  fetchArticlesBySearch,
  postArticle,
  deleteArticle,
  updateArticle,
  incrementViewCount,
  fetchArticleAndSendToDatabase
}
