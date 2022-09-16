import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import styles from './Admin.module.css'

const { fetchArticles, postArticle, fetchArticleAndSendToDatabase } = require('../../dbUtils/articleActions')

export default function Admin() {
  const dispatch = useDispatch()
  const stateArticles = useSelector(state => state.Articles)

  useEffect(() => {
    fetchArticles().then(articles =>{
      dispatch({type:"addArticles", data: articles});
    })
  }, [])

  async function createFakeArticle() {
    let newArticle = await fetchArticleAndSendToDatabase(stateArticles)
    if(newArticle) {
      console.log(newArticle.mainText)
      postArticle(newArticle)
      dispatch({type:"addArticles", data: [...stateArticles, newArticle]})
    }
  }

  return (
    <div className={styles.adminpage}>
      <h1>Här ska man kunna lägga till artiklar o sånt kanske</h1>

      <button onClick={createFakeArticle}>Post article</button>
    </div>
  )
}
