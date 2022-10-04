import { Link } from 'react-router-dom'
import logo from '../../Logo.png';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Comingsoon() {

  const navigate = useNavigate();

  function navigatetoHomepage(){
    navigate("/")
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


    return (
        <footer>

        <div key="1" style={{height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", textAlign: "center", backgroundColor: "#f5f5f5"}}>
        <img style={{ height: "35%", cursor:'pointer'}} src={logo} onClick={navigatetoHomepage}alt="logo" />
          <h1>COMING SOON</h1>
          <h2>Oj! Du är lite snabb, sidan är fortfarande under uppbyggnad🏗</h2>
          <p id="demo" style={{fontSize: "30px"}}></p>

          <h3><Link to="/">Gå tillbaka till Startsidan😁</Link></h3>
        </div>
        </footer>
    )
}
