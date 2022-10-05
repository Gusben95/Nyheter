import { fetchArticles } from '../dbUtils/articleActions'

describe('Actions', () => {

  it('postArticle should post an Article', async () => {
    const postingArticles = await postArticle();
    expect(postingArticles).toEqual(expect.any(/* Array */));
  })})


/*  Post an article to the database, will get a unique id from mongoDB.
const postArticle = async (doc) => {
  doc.dateAdded = new Date();
  doc.views = 0;
  const collection = db.collection('article');
  return await collection.insertOne(doc);
}  */
