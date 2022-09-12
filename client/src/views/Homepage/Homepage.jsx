import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import ArticleComp from '../../components/Article/ArticleComp'

import styles from './Homepage.module.css'

const { fetchArticles, fetchArticlesByCategory, postArticle } = require('../../dbUtils/articleActions')

export default function Homepage() {
  const dispatch = useDispatch()
  const stateArticles = useSelector(state => state.Articles)

  const { category } = useParams();

  useEffect(()=>{
    if(category === undefined) {
      fetchArticles().then(articles =>{
        dispatch({type:"addArticles", data: articles});
      })

      /* setInterval(()=>{
      fetchArticles().then(articles =>{
        dispatch({type:"addArticles", data: articles});
      })}, 600000); // 10 minutes in ms */
    } else {
      fetchArticlesByCategory({category: category}).then(articles => {
        if(articles === undefined) {
          articles = []
        }
        dispatch({type: "addArticles", data: articles});
      });

      /* setInterval(()=>{
      fetchArticlesByCategory({category: category}).then(articles =>{
        dispatch({type:"addArticles", data: articles});
      })}, 600000); // 10 minutes in ms */
    }
  }, [category])

  useEffect(() =>{
    console.log("stateArticles", stateArticles)
  }, [stateArticles]);

  let article = {
    title: "Drottning Elizabeth är gravid! Kim Jong Un är världens sexigaste man!",
    shortDescription: "",
    mainText: "",
    categories: ["inrikes"],
    author: "Vegard Tenold Aase",
    images: [""]
  }

  let articlesMapped = stateArticles.map((articleFromStore, key) => {
    return <ArticleComp key={key} article={articleFromStore} />
  })

  return (
    <div className={styles.homepage}>
      <section className={styles.superAd} style={{textAlign: "center", padding: "10px", backgroundColor: "black", color: "white"}}>
        <h1>Få tillgång till allt innehåll på Nyhetssidan.se</h1>
        <h3>Mindre än 2.5kr om dagen!</h3>
        <Link to="/prenumerera">Prenumerera nu</Link>
        <p>Redan prenumererad?</p><Link to="/login">Logga in</Link>
      </section>

      {articlesMapped}

      <button onClick={() => postArticle(article) }>Post article</button>
    </div>
  )
}
