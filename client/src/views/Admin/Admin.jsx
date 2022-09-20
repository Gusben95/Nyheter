import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import styles from './Admin.module.css'

const { fetchArticles, postArticle, fetchArticleAndSendToDatabase, updateArticle } = require('../../dbUtils/articleActions')

export default function Admin() {
  const dispatch = useDispatch()
  const stateArticles = useSelector(state => state.Articles)

  return (
    <div className={styles.adminpage}>
      <h1>Här ska man kunna lägga till artiklar o sånt kanske</h1>
    </div>
  )
}
