import styles from './Ad.module.css'
import zero from './Images/zero.jpg'
import unicorn from './Images/unicorn.jpg'
import coke from './Images/coke.jpg'

import { useSelector } from 'react-redux'

export default function Ad({largeVersion}){
  let stateUser = useSelector(state => state.User);

  let ads = [zero, coke, unicorn];
  let randomizedAdd = ads[Math.floor(Math.random() * ads.length)];
  
  return (
    <div style={stateUser.stillPaying ? {display: "none"} : {}} className={largeVersion ? styles.largeAd : styles.adContainer} onClick={()=>{window.location.href = "https://www.ads.google.com"}}>
      <img className={styles.adImage} src={randomizedAdd} alt="ad"></img>
    </div>
  )  
}