import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
import ArticleComp from '../../components/Article/ArticleComp'

import styles from './Homepage.module.css'

const { fetchArticles, fetchArticlesByCategory } = require('../../dbUtils/articleActions')

export default function Homepage() {
  const dispatch = useDispatch();
  const stateArticles = useSelector(state => state.Articles);
  const stateUser = useSelector(state => state.User);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const { category } = useParams();

  useEffect(()=>{
    setIsLoading(true)
    if(category === undefined) {
      fetchArticles().then(articles =>{

        articles.sort(function compare(a, b) {
          var dateA = new Date(a.dateAdded);
          var dateB = new Date(b.dateAdded);
          return dateB - dateA;
        });

      dispatch({type:"setArticles", data: articles});
        setIsLoading(false)
      })

      /* setInterval(()=>{
      fetchArticles().then(articles =>{
        dispatch({type:"setArticles", data: articles});
      })}, 600000); // 10 minutes in ms */
    } else {
      fetchArticlesByCategory({category: category}).then(articles => {
        if(articles === undefined) {
          articles = []
        }
        dispatch({type: "setArticles", data: articles});
        setIsLoading(false)
      });

      /* setInterval(()=>{
      fetchArticlesByCategory({category: category}).then(articles =>{
        dispatch({type:"setArticles", data: articles});
      })}, 600000); // 10 minutes in ms */
    }
  }, [category])

  useEffect(() =>{
    /* console.log("stateArticles", stateArticles) */
  }, [stateArticles]);

  //This code is for when we want the homepage to ONLY show articles from the last 24 hours
  // to make it a truly "dagens" page

  /* let todayDay = new Date().toLocaleDateString()
  let todayAtMidnight = new Date(todayDay).setHours(0,0,0,1);
  let todayAtMidnightPlusOneDay = todayAtMidnight + 86400000;
  let todaysArticles = stateArticles.filter(article => {
    let articleDate = new Date(article.dateAdded).getTime();
    console.log("articleDate", articleDate)
    console.log("todayAtMidnight", todayAtMidnight)
    // if the article was added between midnight and midnight + 1 day (today)
    return articleDate >= todayAtMidnight && articleDate < todayAtMidnightPlusOneDay;
  }) */
  //let stateArticlesCopy = [...todaysArticles]

  //split array into chunks of 10 articles
  let stateArticlesCopy = [...stateArticles]
  let articlesSplit = []
  while(stateArticlesCopy.length) {
    articlesSplit.push(stateArticlesCopy.splice(0,8));
  }

  let articlesMapped = [];
  // map each chunk of 10 articles
  articlesSplit.forEach((articlesChunk, index) => {
    // map each article in the chunk
    articlesMapped.push(articlesSplit[index].map((articleFromStore, key) => {
      // make the first 2 articles in the chunk bigger
      // then make 4 in a row smaller
      // then make the last 2 in the chunk bigger
      if(key === 2 || key === 3 || key === 4 || key === 5) { // the second article of every chunk of 10
        return <ArticleComp key={articleFromStore.id} article={articleFromStore} smallVersion />
      } else {
        return <ArticleComp key={articleFromStore.id} article={articleFromStore} />
      }
    }))
  })

  function scrollToTop(){
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }

  function linkToHomepage(){
    navigate('/')
  }

  return (
    <div className={styles.homepage}>
      <h1 className={styles.title} onClick={linkToHomepage}>Nyhetssidan</h1>

      {stateUser.email ? (
        <h2 style={{textAlign: "center"}}>Välkommen tillbaka {stateUser.name}</h2>
      ) : (
        <section className={styles.superAd}>
          <article className={styles.adText}>
            <h2 style={{margin: "1px"}}>Få obegränsad tillgång till Nyhetssidan!</h2>
            <h3 style={{margin: "1px"}}>Läs trovärdig, prisvinnande nyheter ur ett enhörningsperspektiv.</h3>
            <h3 style={{margin: "1px"}}> 2kr/dag i 1 år.</h3>
          </article>
          <Link to="/prenumerera">Prenumerera nu</Link>
          <section><p>Redan prenumererad?</p><Link to="/login">Logga in</Link></section>
        </section>
      )}

      {isLoading ? (
        <div className={styles.loadingContainer}>
          <h2>Loading...</h2>
        </div>
      ) : (
        <>
          {articlesMapped}
        </>
      )}
      <section className={styles.toTheTop} onClick={scrollToTop}>⬆️Tillbaka till toppen</section>
    </div>
  )
}
