import { Link } from 'react-router-dom'
import styles from './Footer.module.css'
import Navbar from '../Navbar/Navbar'


export default function Commingsoon() {

  // Set the date we're counting down to
var countDownDate = new Date("Jan 8, 2023 15:37:25").getTime();

// Update the count down every 1 second
var countdownfunction = setInterval(function() {

  // Get todays date and time
  var now = new Date().getTime();
  
  // Find the distance between now an the count down date
  var distance = countDownDate - now;
  
  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
  // Output the result in an element with id="demo"
  document.getElementById("demo").innerHTML = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";
  
  // If the count down is over, write some text 
  if (distance < 0) {
    clearInterval(countdownfunction);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);


    return (
        <footer className={styles.footer}>

        <div key="1" style={{height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", textAlign: "center", backgroundColor: "#600F0C"}}>
        <img alt="logo"/>
          <h1>COOMING SOON</h1>
          <h2>Oj du är lite snabb, sidan är fortfarande under uppbyggnad🏗</h2>
          <p id="demo" style={{fontSize: "30px"}}></p>
          
          <h3><Link style={{color: "white"}} to="/">Gå tillbaka till Startsidan😁</Link></h3>

        </div>
    

        </footer>
    )
}
