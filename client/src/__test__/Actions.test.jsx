import { fetchArticles } from '../dbUtils/articleActions'

describe('Actions', () => {

  it('fetchArticles should return array', async () => {
    const articles = await fetchArticles();
    expect(articles).toEqual(expect.any(Array));
  })

  it('fetchArticles[0] should be a object with a title key', async () => {
    const articles = await fetchArticles();
    expect(articles[0]).toHaveProperty('title');
  })

  it('fetchArticles on random place should be a object with a mainText key', async () => {
    const articles = await fetchArticles();
    let randomArticle = Math.floor(Math.random() * articles.length);
    expect(articles[randomArticle]).toHaveProperty('mainText');
  })
  
})