import { useRef } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import Header from '../Header/Header';
import styles from './Navbar.module.css'

export default function Navbar({hideSubscribe}) {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const stateUser = useSelector(state => state.User);
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
    /* console.log(searchBarRef.current.value) */
    navigate("/search/" + searchBarRef.current.value)
  }

  function navigateToSubcribe(e){
    e.stopPropagation();
    setNavbarOpened(false);
    navigate("/prenumerera");
  }

  function handleLogout() {
    sessionStorage.setItem('token', "");
    dispatch({type: 'logout'});
  }

  //<button className={styles.openNavbarBtn} onClick={toggleNavbar}>&#9776;</button>

  return (
    <div className={navbarOpened ? styles.navBarContainer + " " + styles.navbarDarkBackground : ""} onClick={toggleNavbar}>
    <section className={styles.openNavbarBtn} onClick={toggleNavbar}>
      <div className={styles.hamburger1}></div>
      <div className={styles.hamburger2}></div>
      <div className={styles.hamburger3}></div>
    </section>

  <button className={styles.subscribeBtn} style={hideSubscribe ? {display: "none"} : {}} onClick={navigateToSubcribe}>Subscribe</button>

      <nav className={navbarOpened ? styles.opened + " " + styles.navbar : styles.navbar} onClick={(e)=> {e.stopPropagation()}}>
      
  <button className={styles.closeNavbarBtn} onClick={toggleNavbar}>𝗫</button>

        <div onClick={(e)=>{navigate("/"); toggleNavbar(e);}}>
          <Header />
        </div>

        <form className={styles.searchPart} onSubmit={doASearch}>
          <input placeholder='Search' ref={searchBarRef}/>
          <button type='submit' onClick={toggleNavbar}>🔎</button>
        </form>

        <div style={{padding: "10px 0px"}}>
          {stateUser.email ? (
            <>
              {stateUser.role === "admin" ? (
                <>
                  <Link to="/admin" onClick={toggleNavbar}>Admin</Link>
                  <Link to="/login" onClick={toggleNavbar}>Profil</Link>
                </>
              ) : (
                <Link to="/login" onClick={toggleNavbar}>Profil</Link>
              )}
              <button className={styles.logoutBtn} onClick={handleLogout}>Logga ut</button>
            </>
          ) : (
            <> 
              <p style={{display: "inline"}}>Redan prenumererad? </p><button className={styles.login} onClick={(e)=>{navigate("/login"); toggleNavbar(e)}}>Logga in</button>
            </>
          ) }
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
            <Link onClick={toggleNavbar} to="/mestPopulara" className={styles.link}>Mest populära artiklar</Link>
          </section>
        ) : ""}
      </nav>
    </div>
  )
}
