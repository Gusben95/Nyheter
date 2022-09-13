import { useState } from 'react'
import styles from './Subscribe.module.css'

export default function Subscribe() {

const [clickedMonths, setClickedMonths] = useState()

  function clickSubscribe(months){
    console.log(months)
    if(clickedMonths) {
      document.getElementById( String(clickedMonths) ).style.border = "1px solid black"
    }
    
    setClickedMonths(months)
    document.getElementById( String(months) ).style.border = "1px solid red"
  }
  return (
    <section className={styles.subscribePage}>
      <h1>NYHETSSIDAN</h1>
      <h2>Prenumerera och få tillgång till alla artiklar </h2>

      <section className={styles.cardContainer}>
        <div id="3" className={styles.subscribeCard} onClick={()=>{clickSubscribe(3)}}>
          <h2 className={styles.monthHeader}>3 Månader</h2>
          <h2 className={styles.monthPrice}>300:-</h2>
        </div>
        <div id="6" className={styles.subscribeCard} onClick={()=>{clickSubscribe(6)}}>
          <h2 className={styles.monthHeader}>6 Månader</h2>
          <h2 className={styles.monthPrice}>500:-</h2>
        </div>
        <div id="12" className={styles.subscribeCard} onClick={()=>{clickSubscribe(12)}}>
          <h2 className={styles.monthHeader}>12 Månader</h2>
          <h2 className={styles.monthPrice}>800:-</h2>
          <p className={styles.monthWarning}>Mest prisvärda alternativet!</p>
        </div>
      </section>

      {clickedMonths ? (
      <section className={styles.cardInfo}>
        <input className={styles.cardNumber} type='number' placeholder='Ditt kortnummer'></input>
        <div className={styles.smallCardInfo}>
          <input className={styles.cardName} type='text' placeholder='För och efternamn'></input>
          <input className={styles.cardExpiry} type='text' placeholder='YY/MM'></input>
          <input className={styles.cardCVC} type='number' placeholder='CVC'></input>
        </div>
        <button className={styles.payButton}>Betala</button>
      </section>
      ):''}

      <ul>
        <h3>Vad ingår i abbonnemanget</h3>
        <li>Tillgång till fullständiga artiklar</li>
        <li>Reklamfritt</li>
        <li>Välj vilka artiklar du ser</li>
        <li>Bli prioriterad i kundtjänsten</li>
      </ul>

    </section>
  )
}