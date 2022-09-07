import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import styles from './Navbar.module.css'

export default function Navbar() {
  let navigate = useNavigate();
  const [navbarOpened, setNavbarOpened] = useState(false);

  return (
    <div className={navbarOpened ? styles.navBarContainer + " " + styles.navbarDarkBackground : ""} onClick={()=>{setNavbarOpened(false)}}>
      <button className={styles.openNavbarBtn} onClick={(e)=>{e.stopPropagation(); setNavbarOpened(true)}}>🍔</button>
    
      <nav className={navbarOpened ? styles.opened : ""} onClick={(e)=> {e.stopPropagation()}}>
        <section className={styles.upperPart}>
          <img onClick={()=>{navigate("/")}} alt="logo"/>
          <Link to="/inrikes" data-text="Inrikes" className={styles.link}>Inrikes</Link>
          <Link to="/utrikes" data-text="Utrikes" className={styles.link}>Utrikes</Link>
          <Link to="/sport" data-text="Sport" className={styles.link}>Sport</Link>
        </section>

        <section className={styles.userAndSearchPart}>
          <button className={styles.subscribe}>Prenumerera</button>
          <div>
            <p style={{display: "inline"}}>Redan prenumererad? </p><button className={styles.login}>Logga in</button>
          </div>


          <div className={styles.searchPart}>
            <input />
            <button>🔎</button>
          </div>
        </section>
      </nav>
    </div>
  )
}