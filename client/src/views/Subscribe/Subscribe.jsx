import { useState } from 'react'
import styles from './Subscribe.module.css'

export default function Subscribe() {

const [clickedMonths, setClickedMonths] = useState()

  function clickSubscribe(months){
    setClickedMonths(months)
    console.log(months)

  }
  return (
    <section>
      <h1>NYHETSSIDAN</h1>
      <h2>Prenumerera och få tillgång till alla artiklar </h2>
      <h2>Kostnad:</h2>

      <div className={styles.SubscribeCard} onClick={()=>{clickSubscribe(3)}}><h2>3 Månader: 300Sek</h2></div>
      <div className={styles.SubscribeCard} onClick={()=>{clickSubscribe(6)}}><h2>6 Månader: 500Sek</h2></div>
      <div className={styles.SubscribeCard} onClick={()=>{clickSubscribe(12)}}><h2>12 Månader: 800Sek</h2><p>Mest prisvärda alternativet!</p></div>

      
      {clickedMonths ? (<section>
        <input type='text' placeholder='För och efternamn'></input>
        
        <input type='number' placeholder='Ditt kortnummer'></input>
        <input type='text' placeholder='YY/MM'></input>
        <input type='number' placeholder='CVC'></input>
        <button>Betala</button>


      </section>):''}


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