
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
}

module.exports = { fetchArticles, fetchArticlesByCategory, postArticle }
