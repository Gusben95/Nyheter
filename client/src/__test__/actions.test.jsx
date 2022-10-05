import {render,clean, cleanup} from '@testing-library/react'
import {  postArticle } from '../../../server/db/articleDb'


describe('Actions', () => {

  it('postArticle should post an Article', () => {
    const postingArticles = postArticle();
    expect(postingArticles).toPost(postArticle);
  })})


/*  Post an article to the database, will get a unique id from mongoDB.
const postArticle = async (doc) => {
  doc.dateAdded = new Date();
  doc.views = 0;
  const collection = db.collection('article');
  return await collection.insertOne(doc);
}  */
