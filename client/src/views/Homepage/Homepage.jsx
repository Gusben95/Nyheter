import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ArticleComp from '../../components/Article/ArticleComp'

import styles from './Homepage.module.css'

export default function Homepage(props) {
   const stateArticles = useSelector(state => state.Articles)

  useEffect(()=>{
    console.log("stateArticles", stateArticles)
  }, [stateArticles])

  // Om användaren går in på /kategori/sport så kommer category nedan vara "sport"
  // Men går dom in på /kategori/ bara, så hamnar dom på 404 istället :)
  const { category } = useParams();

  async function postArticle() {
    let article = {
      title: "SuperDuperNiceTitle3",
      shortDescription: "This isjnasjdajsj slkjasl kjasdklj dalsjk jkl adsljk das jlkasdlkjaskljdkljsalkj slkkalk jsdkl jasdklj aklj dlkj asdlkj asldk jrt but not almost maybe very long aswell",
      mainText: "Thisas lj das ljal al al al a l is tj kasdasdkasdkasdkkkj  asldkjaslk jaslk aslakjs las dasl dasl dasdl asl asdl sdal dsal adsl dasl al asdl adsl asdl dsl adsl dsal dasl asl al jhadfhl dj kbh v mchb cv cv cvvckhbcvkvkhsvsvh   v vjk vjk  jksjkv bor this article, it should bljk adsklj adsljk asjkl dasdjkl adsjkl asdljk dsajlk sdajkl  super too long. Also this text should have some longer parts than all the other stuff and should do the stuff and things.",
      categories: ["sport"],
      author: "Some random dude",
      images: ["https://www.gp.se/image/policy:1.80563596:1662633910/4MURQztTgxwit-Ow4Y-6eLGgn-0-jpg.jpg?f=Wide&w=1320&$p$f$w=4081854"]
    }
    const response = await fetch("/postArticle", {
      method: 'POST',
      body: JSON.stringify(article),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log(data);
  }

  let articlesMapped = stateArticles.map((articleFromStore, key) => {
    return <ArticleComp key={key} article={articleFromStore} />
  })

  return (
    <div className={styles.homepage}>    
      {articlesMapped}

      <button onClick={postArticle}>Post article</button>
    </div>
  )
}