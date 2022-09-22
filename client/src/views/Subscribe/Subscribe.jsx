import { useState } from 'react'
import './Subscribe.css'

export default function Subscribe() {

  const [clickedMonths, setClickedMonths] = useState()

  function clickSubscribe(months) {
    console.log(months)
    if (clickedMonths) {
      document.getElementsByClassName("month" + String(clickedMonths))[0].classList.remove("highlightedSubscribeCard")
    }

    setClickedMonths(months)
    document.getElementsByClassName("month" + String(months))[0].classList.add("highlightedSubscribeCard")
  }

  return (
    <section className="subscribePage">

      <h1>NYHETSSIDAN</h1>

      <div className='subscribeHeader'>
        <h2>Prenumerera och få tillgång till alla artiklar </h2>

        <h4> Njut av obegränsad tillgång till nyheter! </h4>
        <h4>Endast 2kr/dag i 12 månader!</h4>

        <button className='subscribeBtn'>Prenumerera</button>

        <p>Erbjudandet tar slut om:</p>
        <p>2d 5h 9s</p>
      </div>
      <div className='subscribeInfo'>
        <h2>Vad är inkluderat?</h2>

        <ul className='subscribeList'>
          <li>Direkt tillgång på alla plattformar</li>
          <li>Läs hela artiklar utan reklam</li>
          <li>Extraordinära repotage och djupgående intervjuer</li>
          <li>Exklusiva nyhetsbrev varje vecka</li>
          <li>Reklamfria videoklipp</li>
        </ul>
      </div>

    


      <section className="cardContainer">
        <div
          className="subscribeCard month3"

          aria-label='Kort för 3 månader prenumeration'
          tabIndex={1}
          onClick={() => { clickSubscribe(3) }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.target.click()
            }
          }}
        >
          <h2 className="monthHeader">3 Månader</h2>
          <h2 className="monthPrice">300:-</h2>
        </div>
        <div
          className="subscribeCard month6"
          onClick={() => { clickSubscribe(6) }}

          aria-label='Kort för 6 månader prenumeration'
          tabIndex={2}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.target.click()
            }
          }}
        >
          <h2 className="monthHeader">6 Månader</h2>
          <h2 className="monthPrice">500:-</h2>
        </div>
        <div
          className="subscribeCard month12"
          onClick={() => { clickSubscribe(12) }}

          aria-label='Kort för 12 månader prenumeration'
          tabIndex={3}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.target.click()
            }
          }}
        >
          <h2 className="monthHeader">12 Månader</h2>
          <h2 className="monthPrice">800:-</h2>
          <p className="monthWarning">Mest prisvärda alternativet!</p>
        </div>
      </section>

      <section className={clickedMonths ? "cardInfo opened" : "cardInfo"}>
        <input className="cardName" type='text' placeholder='Namn'></input>
        <input className="cardNumber" type='number' placeholder='Ditt kortnummer' maxLength={12}></input>
        <div className="smallCardInfo">
          <select className='cardExpiry Month'>
            <option value="01">01</option>
            <option value="02">02</option>
            <option value="03">03</option>
            <option value="04">04</option>
            <option value="05">05</option>
            <option value="06">06</option>
            <option value="07">07</option>
            <option value="08">08</option>
            <option value="09">09</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
          <select className='cardExpiry Year'>
            <option value="22">22</option>
            <option value="23">23</option>
            <option value="24">24</option>
            <option value="25">25</option>
            <option value="26">26</option>
            <option value="27">27</option>
          </select>
          <input className="cardCVC" type='number' placeholder='CVC' maxLength={3}></input>
        </div>
        <button className="payButton">Betala</button>
      </section>


    </section>
  )
}