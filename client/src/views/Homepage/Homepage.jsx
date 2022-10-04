import { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom'
import ArticleComp from '../../components/Article/ArticleComp'
import Header from '../../components/Header/Header'
import Adds from '../../components/Adds/Adds'

import styles from './Homepage.module.css'

const { fetchArticles, fetchArticlesByCategory } = require('../../dbUtils/articleActions')

export default function Homepage({mostPopular}) {
  const dispatch = useDispatch();

  const stateArticles = useSelector(state => state.Articles);
  const stateArticlesRef = useRef(stateArticles);
  stateArticlesRef.current = stateArticles;

  const stateUser = useSelector(state => state.User);
  const [articlesToSplit, setArticlesToSplit] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

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

      // setInterval(()=>{
      //   fetchArticles().then(articles =>{
      //
      //     articles.sort(function compare(a, b) {
      //       var dateA = new Date(a.dateAdded);
      //       var dateB = new Date(b.dateAdded);
      //       return dateB - dateA;
      //     });
      //
      //     //go through all articles and check if they are in the stateArticles array
      //     //if not, add them
      //     articles.forEach(article => {
      //       // we can use the .id property to check if the article is already in the stateArticles array
      //       // since useState is not updated in intervals, we use the useRef hook to get the current value of the stateArticles array
      //       let articleExists = stateArticlesRef.current.find(a => a.id === article.id)
      //       if(!articleExists) {
      //         dispatch({type:"addArticle", data: article})
      //       }
      //     })
      //   })
      // }, 6000); // should be 600000ms (= 10 minutes) in production
    } else {
      fetchArticlesByCategory({category: category}).then(articles => {
        if(articles === undefined) {
          articles = []
        }
        dispatch({type: "setArticles", data: articles});
        setIsLoading(false)
      });

      // setInterval(()=>{
      //   fetchArticlesByCategory({category: category}).then(articles =>{
      //
      //     articles.sort(function compare(a, b) {
      //       var dateA = new Date(a.dateAdded);
      //       var dateB = new Date(b.dateAdded);
      //       return dateB - dateA;
      //     });
      //
      //     //go through all articles and check if they are in the stateArticles array
      //     //if not, add them
      //     articles.forEach(article => {
      //       // we can use the .id property to check if the article is already in the stateArticles array
      //       // since useState is not updated in intervals, we use the useRef hook to get the current value of the stateArticles array
      //       let articleExists = stateArticlesRef.current.find(a => a.id === article.id)
      //       if(!articleExists) {
      //         dispatch({type:"addArticle", data: article})
      //       }
      //     })
      //   })
      // }, 6000); // should be 600000ms (= 10 minutes) in production
    }
  }, [category])

  useEffect(() =>{
  }, [stateArticles]);

  //This code is for when we want the homepage to ONLY show articles from the last 24 hours
  // to make it a truly "dagens" page
  function showOnlyLast24Hours(articles) {
    let articlesCopy = [...articles];
    let todayDay = new Date();
    let todayAtMidnight = new Date(todayDay).setHours(0,0,0,1)
    let todayAtMidnightPlusOneDay = new Date(todayAtMidnight).getTime() + 86400000;
    let articlesFiltered = articlesCopy.filter(article => {
      let articleDate = new Date(article.dateAdded).getTime();
      // if the article was added between midnight and midnight + 1 day (today)
      return articleDate >= todayAtMidnight && articleDate < todayAtMidnightPlusOneDay;
    })

    return articlesFiltered;
  }

  function sortByViews(articles) {
    let articlesCopy = [...articles];
    articlesCopy.sort(function compare(a, b) {
      return b.views - a.views;
    });

    return articlesCopy;
  }

  useEffect(() => {
    let articlesToSlitBeforeState = [...stateArticles];
    articlesToSlitBeforeState = sortByViews(articlesToSlitBeforeState);

    if(!mostPopular) {
      articlesToSlitBeforeState = showOnlyLast24Hours(articlesToSlitBeforeState);
    }

    setArticlesToSplit(articlesToSlitBeforeState);
  }, [stateArticles, location])

  //split array into chunks of 10 articles
  let articlesSplit = []
  while(articlesToSplit.length) {
    articlesSplit.push(articlesToSplit.splice(0,8));
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

  return (
    <div className={styles.homepage}>
      <Header />
      {stateUser.email ? (
        <h2 style={{textAlign: "center"}}>Välkommen tillbaka {stateUser.name}</h2>
      ) : (
        <section className={styles.superAd}>
          <article className={styles.adText}>
            <h2 style={{margin: "1px"}}>Få obegränsad tillgång till Nyhetssidan!</h2>
            <h3 style={{margin: "1px"}}>Läs trovärdiga nyheter från ett enhörningsperspektiv.</h3>
            <h3 style={{margin: "1px"}}> 2kr/dag i 12 månader.</h3>
          </article>
          <Link to="/prenumerera">Prenumerera nu</Link><p>Redan prenumerant?</p>
          <section className={styles.Login}><Link to="/login">Logga in</Link></section>
        </section>
      )}

      {isLoading ? (
        <div className={styles.loadingContainer}>
          <h2>Loading...</h2>
        </div>
      ) : (
        <>
          {articlesMapped.length === 0 ? (
            <div className={styles.noArticlesContainer} style={{textAlign: "center"}}>
              <h2>Inga artiklar har skrivits idag ännu,</h2>
              <h2>kolla in våran "mest populära artiklar" sektion istället!</h2>
              <Link to="/mestPopulara">Mest populära</Link>
            </div>
          ) : (
            <>
              {articlesMapped}
            </>
          )}
          <Adds/>
        </>
      )}
      <section className={styles.toTheTop} onClick={scrollToTop}>⇧</section>
    </div>
  )
}
