import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import ArticleComp from '../../components/Article/ArticleComp'

import styles from './Homepage.module.css'

const { fetchArticles, fetchArticlesByCategory, postArticle } = require('../../dbUtils/articleActions')

export default function Homepage(props) {
  const dispatch = useDispatch()
  const stateArticles = useSelector(state => state.Articles)

  useEffect(()=>{
    fetchArticles().then(articles =>{
    dispatch({type:"addArticles", data: articles});
    })
  }, [])

  useEffect(() =>{
    console.log("stateArticles", stateArticles)
  }, [stateArticles]);

  // Om användaren går in på /kategori/sport så kommer category nedan vara "sport"
  // Men går dom in på /kategori/ bara, så hamnar dom på 404 istället :)
  const { category } = useParams();

  let article = {
    title: "Jag tror jag fått klamydia - jacob",
    shortDescription: "Det gjorde ont när jag kissade",
    mainText: "dal dsal adsl dasl al asdl adsl asdl dsl adsl dsal dasl asl al jhadfhl dj kbh v mchb cv cv cvvckhbcvkvkhsvsvh   v vjk vjk  jksjkv bor this article, it should bljk adsklj adsljk asjkl dasdjkl adsjkl asdljk dsajlk sdajkl  super too long. Also this text should have some longer parts than all the other stuff and should do the stuff and things.",
    categories: ["inrikes"],
    author: "Truth network",
    images: ["https://media-exp1.licdn.com/dms/image/C4D03AQHUnfYM6tUqGA/profile-displayphoto-shrink_400_400/0/1622753442642?e=1668038400&v=beta&t=6rq-8BC-PrQVomJAwRfzXRAxRcWqPgTL7-hZBNc3EUs"]
  }



  let articlesMapped = stateArticles.map((articleFromStore, key) => {
    return <ArticleComp key={key} article={articleFromStore} />
  })

  return (
    <div className={styles.homepage}>
      {articlesMapped}

      <button onClick={() => postArticle(article) }>Post article</button>
    </div>
  )
}
