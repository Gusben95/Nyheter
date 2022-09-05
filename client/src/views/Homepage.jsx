import { useSelector } from 'react-redux'
import ArticleComp from '../components/ArticleComp'

import styles from './Homepage.module.css'

export default function Homepage() {
  const stateMessage = useSelector(state => state.Message)

  return (
    <div className={styles.homepage}>
      <p>{stateMessage ? stateMessage : "Loading..."}</p>
      <ArticleComp article={{
        title: "asd",
        mainText: "Lorem ipsum idk asdlasjkl as jlasdjl klks jalsdl jkl kdsalj adl jdsjkl adljskdjalskdjalsdkjka sdlal sdkj alskdjalskd als djklalks jdljk adlkj ljk asljdslj kdsaljk ldajk slj kdaslj kdsaljk dasljk dsaljkdsaljk dsaljk ljk ljkdasljk dasljk ljk dlsj k",
        images: [
          "https://previews.123rf.com/images/rigsby8131/rigsby81311808/rigsby8131180800043/107738830-breaking-news-written-in-red-with-a-newspaper-article-blurred-in-the-background.jpg",
          "imageLink absolutely"
        ]
      }}/>
    </div>
  )
}