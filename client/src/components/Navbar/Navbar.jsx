import { useRef } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import styles from './Navbar.module.css'

export default function Navbar({hideSubsctibe}) {
  let navigate = useNavigate();
  const [navbarOpened, setNavbarOpened] = useState(false);
  const [todaySectionOpened, setTodaySectionOpened] = useState(true)
  const [oldSectionOpened, setOldSectionOpened] = useState(false)

  const searchBarRef = useRef("")

  function toggleNavbar(e) {
    e.stopPropagation();
    navbarOpened ? setNavbarOpened(false) : setNavbarOpened(true);
  }

  function toggleTodaysSection(e) {
    e.stopPropagation();
    todaySectionOpened ? setTodaySectionOpened(false) : setTodaySectionOpened(true);
  }

  function toggleOldSection(e) {
    e.stopPropagation();
    oldSectionOpened ? setOldSectionOpened(false) : setOldSectionOpened(true);
  }

  function doASearch(e) {
    e.preventDefault()
    console.log(searchBarRef.current.value)
    navigate("/search/" + searchBarRef.current.value)
  }

  function navigateToSubcribe(e){
    e.stopPropagation();
    setNavbarOpened(false);
    navigate("/prenumerera");
  }

  //<button className={styles.openNavbarBtn} onClick={toggleNavbar}>&#9776;</button>

  return (
    <div className={navbarOpened ? styles.navBarContainer + " " + styles.navbarDarkBackground : ""} onClick={toggleNavbar}>
      <section className={styles.openNavbarBtn} onClick={toggleNavbar}><div></div><div></div><div></div></section>
      <button className={styles.subscribeBtn} style={hideSubsctibe ? {display: "none"} : {}} onClick={navigateToSubcribe}>Subscribe</button>

      <nav className={navbarOpened ? styles.opened + " " + styles.navbar : styles.navbar} onClick={(e)=> {e.stopPropagation()}}>
        <button className={styles.closeNavbarBtn} onClick={toggleNavbar}>𝗫</button>

        <div onClick={(e)=>{navigate("/"); toggleNavbar(e);}}>
          <h2 style={{margin: "0"}}>Nyhetssidan</h2>
          <img alt="logo"/>
        </div>

        <form className={styles.searchPart} onSubmit={doASearch}>
          <input placeholder='Search' ref={searchBarRef}/>
          <button type='submit' onClick={toggleNavbar}>🔎</button>
        </form>

        <button className={styles.subscribe} onClick={navigateToSubcribe}>Prenumerera</button>
        <div style={{paddingBottom: "10px"}}>
          <p style={{display: "inline"}}>Redan prenumererad? </p><button className={styles.login} onClick={(e)=>{navigate("/login"); toggleNavbar(e)}}>Logga in</button>
        </div>

        <h2 onClick={toggleTodaysSection} style={!todaySectionOpened ? {} : {borderBottom: "1px solid #DBDBDB"}} className={styles.headers}>Dagens {todaySectionOpened ? "↓" : "↑"}</h2>
        {todaySectionOpened ? (
          <section className={styles.linksPart}>
            <Link onClick={toggleNavbar} to="/kategori/inrikes" className={styles.link}>Inrikes</Link>
            <Link onClick={toggleNavbar} to="/kategori/utrikes" className={styles.link}>Utrikes</Link>
            <Link onClick={toggleNavbar} to="/kategori/sport" className={styles.link}>Sport</Link>
          </section>
        ) : ""}

        <h2 onClick={toggleOldSection} style={{borderBottom: "1px solid #DBDBDB"}} className={styles.headers}>Äldre {oldSectionOpened ? "↓" : "↑"}</h2>
        {oldSectionOpened ? (
          <section className={styles.linksPart} style={{borderBottom: "1px solid #DBDBDB"}}>
            <Link onClick={toggleNavbar} to="/helaVeckan" className={styles.link}>Hela veckan</Link>
            <Link onClick={toggleNavbar} to="/forraVeckan" className={styles.link}>Förra veckan</Link>
          </section>
        ) : ""}


        <Link to="/kontakt" onClick={toggleNavbar} style={{marginTop: "auto"}}>Kontakta oss</Link>
      </nav>
    </div>
  )
}
