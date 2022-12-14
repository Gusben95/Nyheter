import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { updateAccount, updatePassword } from '../../dbUtils/accountActions';

import styles from './Profile.module.css'


export default function Profile() {
  const stateUser = useSelector(state => state.User);
  const dispatch = useDispatch();
  const newPassInput1 = useRef("");
  const newPassInput2 = useRef("");

  let newUser = {
    id: stateUser._id,
    name: stateUser.name,
    email: stateUser.email,
    password: stateUser.password,
    preference: stateUser.preference,
    role: stateUser.role,
    signInPlatform: stateUser.signInPlatform,
    stillPaying: stateUser.stillPaying,
    subscriptionEnd: stateUser.subscriptionEnd,
  }

  function handleEdit(e) {
    newUser[e.target.attributes.name.nodeValue] = e.target.innerHTML;
    saveEdit();
  }

  function handleCheckboxEdit(e) {

    let newPreference = newUser.preference;
    if(e.target.checked) {
      newPreference.push(e.target.id);
    } else {
      newPreference = newPreference.filter(item => item !== e.target.id);
    }
    newUser.preference = newPreference;

    saveEdit();
  }

  function saveEdit() {
    dispatch({type: "updateUser", data: newUser});

    updateAccount(newUser);
  }

  function changePassword() {
   if (newPassInput1.current.value === newPassInput2.current.value){
     updatePassword(newPassInput1.current.value)
   }
  }

  function logoutBtn(){
    sessionStorage.setItem('token', "");
    dispatch({type: "logout"})
  }

  let subscriptionEndFormatted = new Date(stateUser.subscriptionEnd).toLocaleDateString('sv-SE', {year: 'numeric', month: 'long', day: 'numeric'});

  return (
    <section className={styles.loggedIn}>
      <div className={styles.generalInfoDiv}>
      <h2 style={{display: "inline"}}>Hej <span
        contentEditable
        suppressContentEditableWarning={true}
        className={styles.editableText}
        onBlur={handleEdit}
        role="textbox"
        name="name"
        >{stateUser.name}</span>
      .</h2>
      <p style={{display: "inline"}}>Din e-post ??r: <span
        contentEditable
        suppressContentEditableWarning={true}
        className={styles.editableText}
        onBlur={handleEdit}
        role="textbox"
        name="email"
        >{stateUser.email}</span>
      .</p>
      </div>
      <div className={styles.changePasswordDiv}>
        <form onSubmit={(e)=>{
            e.preventDefault();
            changePassword();
          }}>
          <input ref={newPassInput1} type="password" placeholder="Skriv in ditt nya l??senord"></input>
          <input ref={newPassInput2} type="password" placeholder="Upprepa ditt nya l??senord"></input>
          <button type="submit" onClick={changePassword}>Spara l??senordet</button>
        </form>
      </div>
      <div className={styles.userDiv}>
        <h4>Du ??r {stateUser.role}.</h4>
        {stateUser.stillPaying ? (
          <>
            <p>Du betalar fortfarande</p>
            <p>Kom ih??g att din prenumeration slutar {subscriptionEndFormatted}</p>
          </>
        ) : (
          <div>
            <p>Du betalar inte l??ngre</p>
            <Link to="/prenumerera">Prenumera igen enkelt!</Link>
          </div>
        )}
        <h4>Dina preferenser</h4>
        <div className={styles.preferencesContainer}>
          <label htmlFor="inrikes">Inrikes</label>
          <input id="inrikes" className={styles.options} type="checkbox"  onChange={handleCheckboxEdit} value="inrikes" defaultChecked={stateUser.preference.includes("inrikes")} />
          <label htmlFor="utrikes">Utrikes</label>
          <input id="utrikes" className={styles.options} type="checkbox"  onChange={handleCheckboxEdit} value="utrikes" defaultChecked={stateUser.preference.includes("utrikes")} />
          <label htmlFor="sport">Sport</label>
          <input id="sport" className={styles.options}type="checkbox"  onChange={handleCheckboxEdit} value="sport" defaultChecked={stateUser.preference.includes("sport")} />
        </div>
        <button onClick={logoutBtn} className={styles.changeLogout} >Logga ut</button>
      </div>

    </section>
  )
}
