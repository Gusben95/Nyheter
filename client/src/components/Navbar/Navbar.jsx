import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import styles from './Navbar.module.css'

export default function Navbar() {
  let navigate = useNavigate();
  const [navbarOpened, setNavbarOpened] = useState(false);

  function toggleNavbar(e) {
    e.stopPropagation()
    navbarOpened ? setNavbarOpened(false) : setNavbarOpened(true)
  }

  return (
    <div className={navbarOpened ? styles.navBarContainer + " " + styles.navbarDarkBackground : ""} onClick={toggleNavbar}>
      <button className={styles.openNavbarBtn} onClick={toggleNavbar}>&#9776;</button>
    
      <nav className={navbarOpened ? styles.opened : ""} onClick={(e)=> {e.stopPropagation()}}>
        <button className={styles.closeNavbarBtn} onClick={toggleNavbar}>𝗫</button>

        <section className={styles.upperPart}>
          <img onClick={(e)=>{navigate("/"); toggleNavbar(e);}} alt="logo"/>
          <Link onClick={toggleNavbar} to="/kategori/inrikes" data-text="Inrikes" className={styles.link}>Inrikes</Link>
          <Link onClick={toggleNavbar} to="/kategori/utrikes" data-text="Utrikes" className={styles.link}>Utrikes</Link>
          <Link onClick={toggleNavbar} to="/kategori/sport" data-text="Sport" className={styles.link}>Sport</Link>
        </section>

        <section className={styles.userAndSearchPart}>
          <button className={styles.subscribe} onClick={(e) => {
             toggleNavbar(e);
             navigate("/prenumerera")
          }}>Prenumerera</button>
          <div>
            <p style={{display: "inline"}}>Redan prenumererad? </p><button className={styles.login} onClick={(e)=>{navigate("/login"); toggleNavbar(e)}}>Logga in</button>
          </div>


          <div className={styles.searchPart}>
            <input />
            <button onClick={toggleNavbar}>🔎</button>
          </div>
          <Link to="/kontakt" onClick={toggleNavbar}>Kontakta oss</Link>
        </section>
      </nav>
    </div>
  )
}