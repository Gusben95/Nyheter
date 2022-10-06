import {render,clean, cleanup} from '@testing-library/react'
import {  postArticle } from '../../../server/db/articleDb'


describe('Actions', () => {

  it('postArticle should post an Article', () => {
    const postingArticles = postArticle();
    expect(postingArticles).toPost(postArticle);
  })})


// Fetches articles from the database depending on the category
/* const getCategory = (category) => {
  const collection = db.collection('article')
  return collection.find({
    'categories': category
  }).toArray()
} */
