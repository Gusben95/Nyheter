import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ArticleComp from '../../components/Article/ArticleComp'

import styles from './Homepage.module.css'

export default function Homepage(props) {
  const stateMessage = useSelector(state => state.Message)

  console.log(stateMessage)

  // Om användaren går in på /kategori/sport så kommer category nedan vara "sport"
  // Men går dom in på /kategori/ bara, så hamnar dom på 404 istället :)
  const { category } = useParams();

  const fakeArticle = {
    title: "asd",
    mainText: "Lorem ipsum idk asdlasjkl as jlasdjl klks jalsdl jkl kdsalj adl jdsjkl adljskdjalskdjalsdkjka sdlal sdkj alskdjalskd als djklalks jdljk adlkj ljk asljdslj kdsaljk ldajk slj kdaslj kdsaljk dasljk dsaljkdsaljk dsaljk ljk ljkdasljk dasljk ljk dlsj k",
    images: [
      "https://previews.123rf.com/images/rigsby8131/rigsby81311808/rigsby8131180800043/107738830-breaking-news-written-in-red-with-a-newspaper-article-blurred-in-the-background.jpg",
      "imageLink absolutely"
    ]
  };

  const fakeSportArticle = {
    title: "Sport senaste nytt!",
    mainText: "Inte attans kan jag sport?? det handlar typ om gubbar som springer efter en boll eller något, idk lol fråga någon annan som kanske kan sport lite bättre",
    images: [
      "asd fake img link i guess"
    ]
  }

  return (
    <div className={styles.homepage}>    
      <ArticleComp article={category === "sport" ? fakeSportArticle : fakeArticle}/>
    </div>
  )
}