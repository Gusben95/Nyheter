import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { updateAccount, updatePassword } from '../../dbUtils/accountActions';

import styles from './Profile.module.css'


export default function Profile() {
  const stateUser = useSelector(state => state.User);
  const dispatch = useDispatch();
  const [changingPassword,setChangingpassword] = useState(false);
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
    //console.log([e.target.attributes.name.nodeValue])
    newUser[e.target.attributes.name.nodeValue] = e.target.innerHTML;
    console.log(newUser)
    saveEdit();
  }

  function handleCheckboxEdit(e) {
    /* console.log(e.target) */

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
    console.log(newUser)
    dispatch({type: "updateUser", data: newUser});

    updateAccount(newUser);
  }

  function changePassword() {
   if (newPassInput1.current.value === newPassInput2.current.value){
     updatePassword(newPassInput1.current.value)
   }
  }

  function startChangePassword (){
    setChangingpassword(true);
  }

  function logoutBtn(){
    sessionStorage.setItem('token', "");
    dispatch({type: "logout"})
  }

  let subscriptionEndFormatted = new Date(stateUser.subscriptionEnd).toLocaleDateString('sv-SE', {year: 'numeric', month: 'long', day: 'numeric'});

  return (
    <section className={styles.loggedIn}>
      <h2 style={{display: "inline"}}>Hej <span
        contentEditable
        suppressContentEditableWarning={true}
        className={styles.editableText}
        onBlur={handleEdit}
        role="textbox"
        name="name"
        >{stateUser.name}</span>
      .</h2>
      <p style={{display: "inline"}}>Din email är: <span
        contentEditable
        suppressContentEditableWarning={true}
        className={styles.editableText}
        onBlur={handleEdit}
        role="textbox"
        name="email"
        >{stateUser.email}</span>
      .</p>
      <button onClick={startChangePassword}>Byt lösenord</button>
      {changingPassword?(
        <div>
          <input ref={newPassInput1} type="password" placeholder="Skriv in ditt nya lösenord"></input>
          <input ref={newPassInput2} type="password" placeholder="Upprepa ditt nya lösenord"></input>
          <button onClick={changePassword}>Spara lösenordet</button>
        </div>
      ):""}
      <h4>Du är {stateUser.role}.</h4>
      {stateUser.stillPaying ? (
        <>
          <p>Du betalar fortfarande</p>
          <p>Kom ihåg att din prenumeration slutar {subscriptionEndFormatted}</p>
        </>
      ) : (
        <div>
          <p>Du betalar inte längre</p>
          <Link to="/prenumerera">Prenumera igen enkelt!</Link>
        </div>
      )}
      <h4>Dina preferenser</h4>
      <div className={styles.preferencesContainer}>
        <label htmlFor="inrikes">Inrikes</label>
        <input id="inrikes" type="checkbox"  onChange={handleCheckboxEdit} value="inrikes" defaultChecked={stateUser.preference.includes("inrikes")} />
        <label htmlFor="utrikes">Utrikes</label>
        <input id="utrikes" type="checkbox"  onChange={handleCheckboxEdit} value="utrikes" defaultChecked={stateUser.preference.includes("utrikes")} />
        <label htmlFor="sport">Sport</label>
        <input id="sport" type="checkbox"  onChange={handleCheckboxEdit} value="sport" defaultChecked={stateUser.preference.includes("sport")} />
      </div>
      <button onClick={logoutBtn}>Logga ut</button>

    </section>
  )
}
