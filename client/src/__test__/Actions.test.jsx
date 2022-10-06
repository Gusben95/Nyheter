import { fetchArticles } from '../dbUtils/articleActions'
import { fetchAccountWithEmail } from '../dbUtils/accountActions'



// Jacob
describe('articleActions', () => {

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


//Axel
const accountInfo = {
  email: 'hej@gmail.com',
  password: 'pwd123'
}

describe('accountActions', () => {

it('FetchAccount should return an object', async () => {
  const account = await fetchAccountWithEmail(accountInfo)
  expect(account).toEqual(expect.any(Object))
})

it('FetchAccount should return an object with a password key', async () => {
  const account = await fetchAccountWithEmail(accountInfo)
  expect(account).toHaveProperty('password');
})

it('FetchAccount should return an object with the same email', async () => {
  const account = await fetchAccountWithEmail(accountInfo)
  expect(account.email).toEqual('hej@gmail.com')
})

})
