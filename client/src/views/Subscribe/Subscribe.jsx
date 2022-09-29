import { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './Subscribe.css'

import SignUp from '../../components/signUp/SignUp';
import Payment from '../../components/Payment/Payment';
import Header from '../../components/Header/Header';
import { useEffect } from 'react';

export default function Subscribe() {
  const [clickedMonths, setClickedMonths] = useState();
  const firstCard = useRef();
  const navigate = useNavigate();
  const stateUser = useSelector(state => state.User);
  const stateArticles = useSelector(state => state.Articles);
  const location = useLocation();

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

  // Date we're counting down to
  var countDownDate = new Date("Nov 2, 2022 15:37:25").getTime();

  // Update the count down every 1 second
  useEffect(()=>{
    var countdownfunction = setInterval(function() {

      // Get todays date and time
      var now = new Date().getTime();
      
      // Find the distance between now an the count down date
      var distance = countDownDate - now;
      
      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      // Output the result in an element with id="demo"
      document.getElementById("demo").innerHTML = days + "d " + minutes + "m " + seconds + "s ";
      
      // If the count down is over, write some text 
      if (distance < 0) {
        clearInterval(countdownfunction);
        document.getElementById("demo").innerHTML = "Din premuneration har gått ut!";
      }
    }, 1000);
    return () => clearInterval(countdownfunction);
  })

/*   function getRandomArticleImage() {
    if (stateArticles.length > 0) {
      let randomArticle = stateArticles[Math.floor(Math.random() * stateArticles.length)];
      return randomArticle.images[0];
    }
  } */

  return (
    <section className="subscribePage">
      <Header />

      <div className='subscribeHeader'>
        <h2>Prenumerera och få tillgång till alla artiklar </h2>

        <h4> Njut av obegränsad tillgång till nyheter! </h4>
        <h4>Endast 2kr/dag i 12 månader!</h4>

        <button className='subscribeBtn' onClick={()=>{firstCard.current.scrollIntoView()}}>Prenumerera</button>

        <p>Erbjudandet tar slut om:</p>
        <p id="demo"></p>
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
          style={{backgroundImage: `url(${stateArticles[0]?.images[0]})`}}

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
          <div className="subscribeCardContent">
            <h2 className="monthHeader">3 Månader</h2>
            <h2 className="monthPrice">300:-</h2>
          </div>
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
          style={{backgroundImage: `url(${stateArticles[1]?.images[0]})`}}
          
          aria-label='Kort för 6 månader prenumeration'
          tabIndex={2}
          onClick={() => { clickSubscribe(6) }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.target.click()
            }
          }}
        >
          <div className="subscribeCardContent">
            <h2 className="monthHeader">6 Månader</h2>
            <h2 className="monthPrice">500:-</h2>
          </div>
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
          style={{backgroundImage: `url(${stateArticles[2]?.images[0]})`}}
          
          aria-label='Kort för 12 månader prenumeration'
          tabIndex={3}
          onClick={() => { clickSubscribe(12) }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.target.click()
            }
          }}
        >
          <div className="subscribeCardContent">
            <h2 className="monthHeader">12 Månader</h2>
            <h2 className="monthPrice">800:-</h2>
            <p className="monthWarning">Mest prisvärda alternativet!</p>
          </div>
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