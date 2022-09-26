import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './Subscribe.css'

import SignUp from '../../components/signUp/SignUp';
import Payment from '../../components/Payment/Payment';

export default function Subscribe() {
  const [clickedMonths, setClickedMonths] = useState();
  const firstCard = useRef();
  const navigate = useNavigate();
  const stateUser = useSelector(state => state.User);

  function clickSubscribe(months) {
    console.log(months)
    if (clickedMonths) {
      document.getElementsByClassName("month" + String(clickedMonths))[0].classList.remove("highlightedSubscribeCard")
    }

    setClickedMonths(months)
    document.getElementsByClassName("month" + String(months))[0].classList.add("highlightedSubscribeCard")

    // we want to scroll to the payment/sign up component, but we need to give it time to render first
    setTimeout(() => {
      document.getElementsByClassName("month" + String(months))[0].scrollIntoView();
    }, 60);
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

        <button className='subscribeBtn' onClick={()=>{firstCard.current.scrollIntoView()}}>Prenumerera</button>

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

          ref={firstCard}
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
        {clickedMonths === 3 ? (
          <div className="cardMenu">
            {stateUser.email ? (
              <>
                {stateUser.stillPaying ? (
                  <h1>Get out of here!!</h1>
                ) : (
                  <Payment subscription={clickedMonths} />
                )}
              </>
            ) : (
              <SignUp />
            )}
          </div>
        ) : ""}
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
        {clickedMonths === 6 ? (
          <div className="cardMenu">
            {stateUser.email ? (
              <>
                {stateUser.stillPaying ? (
                  <h1>Get out of here!!</h1>
                ) : (
                  <Payment subscription={clickedMonths} />
                )}
              </>
            ) : (
              <SignUp />
            )}
          </div>
        ) : ""}
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
          {clickedMonths === 12 ? (
            <div className="cardMenu">
              {stateUser.email ? (
                <>
                  {stateUser.stillPaying ? (
                    <h1>Get out of here!!</h1>
                  ) : (
                    <Payment subscription={clickedMonths} />
                  )}
                </>
              ) : (
                <SignUp />
              )}
            </div>
          ) : ""}
      </section>

      

    </section>
  )
}