import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import ArticleComp from '../../components/Article/ArticleComp'

import styles from './Homepage.module.css'

const { fetchArticles, fetchArticlesByCategory } = require('../../dbUtils/articleActions')

export default function Homepage() {
  const dispatch = useDispatch();
  const stateArticles = useSelector(state => state.Articles);
  const [isLoading, setIsLoading] = useState(true);

  const { category } = useParams();

  useEffect(()=>{
    setIsLoading(true)
    if(category === undefined) {
      fetchArticles().then(articles =>{
        dispatch({type:"addArticles", data: articles});
        setIsLoading(false)
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
        setIsLoading(false)
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

  //split array into chunks of 10 articles
  let stateArticlesCopy = [...stateArticles]
  let articlesSplit = []
  while(stateArticlesCopy.length) {
    articlesSplit.push(stateArticlesCopy.splice(0,10));
  }

  let articlesMapped = [];
  articlesSplit.forEach((articlesChunk, index) => {
    articlesMapped.push(articlesSplit[index].map((articleFromStore, key) => {
      if(key === 4 || key === 5 || key === 6 || key === 7) { // the fourth article of every chunk of 10
        return <ArticleComp key={articleFromStore.id} article={articleFromStore} smallVersion />
      } else {
        return <ArticleComp key={articleFromStore.id} article={articleFromStore} />
      }
    }))
  })

  return (
    <div className={styles.homepage}>
      <h1 style={{textAlign: "center", marginTop: "0", paddingTop: "1em"}}>Nyhetssidan</h1>

      <section className={styles.superAd} style={{textAlign: "center", padding: "10px", backgroundColor: "black", color: "white"}}>
        <h1>Få tillgång till allt innehåll på Nyhetssidan.se</h1>
        <h3>Mindre än 2.5kr om dagen!</h3>
        <Link to="/prenumerera">Prenumerera nu</Link>
        <p>Redan prenumererad?</p><Link to="/login">Logga in</Link>
      </section>

      {isLoading ? (
        <div className={styles.loadingContainer}>
          <h2>Loading...</h2>
        </div>
      ) : (
        <>
          {articlesMapped}
        </>
      )}
    </div>
  )
}
