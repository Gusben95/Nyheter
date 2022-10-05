import styles from './Adds.module.css'
import zero from './Images/zero.jpg'
import unicorn from './Images/unicorn.jpg'
import coke from './Images/coke.jpg'

import { useSelector } from 'react-redux'

export default function Adds({largeVersion}){
  let stateUser = useSelector(state => state.User);

  let adds = [zero, coke, unicorn];
  let randomizedAdd = adds[Math.floor(Math.random() * adds.length)];
  
  return (
    <div style={stateUser.stillPaying ? {display: "none"} : {}} className={largeVersion ? styles.largeAd : styles.addsPlacement} onClick={()=>{window.location.href = "https://www.ads.google.com"}}>
      <img className={styles.addsSinglePlacement} src={randomizedAdd} alt="ad"></img>
    </div>
  )  
}