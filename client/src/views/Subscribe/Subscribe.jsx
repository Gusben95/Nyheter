import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Subscribe.css'

export default function Subscribe() {

  const [clickedMonths, setClickedMonths] = useState()
  const navigate = useNavigate()

  function clickSubscribe(months) {
    console.log(months)
    if (clickedMonths) {
      document.getElementsByClassName("month" + String(clickedMonths))[0].classList.remove("highlightedSubscribeCard")
    }

    setClickedMonths(months)
    document.getElementsByClassName("month" + String(months))[0].classList.add("highlightedSubscribeCard")
  }

  function linkToHomepage(){
    navigate('/')
  }

  return (
    <section className="subscribePage">

      <h1 onClick={linkToHomepage} >NYHETSSIDAN</h1>

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

      

    </section>
  )
}