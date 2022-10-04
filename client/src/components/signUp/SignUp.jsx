import { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from './SignUp.module.css';
import { createAccount } from '../../dbUtils/accountActions';

import {GoogleLogin} from 'react-google-login';
import {gapi} from 'gapi-script';
const clientId = "299303035876-kus8sfr8h4e38iape0ivksrarjqmouef.apps.googleusercontent.com";

const {loginWithEmail, updateAccount, getAccountWithToken} = require('../../dbUtils/accountActions')

export default function SignUp() {
  const passwordRepeat = useRef();
  const dispatch = useDispatch();

  let preferences = [];
  function handleCheckbox(e) {
    if(e.target.checked) {
      preferences.push(e.target.id);
    } else {
      preferences = preferences.filter(item => item !== e.target.id);
    }
  }

  function handleChange(e) {
    account[e.target.name] = e.target.value;
  }

  let account = {
    name: "",
    email: "",
    password: "",
    preference: preferences,
    signInPlatform: "nyhetssidan",
  }

  function saveToken(account) {
    sessionStorage.setItem('token', account.token);
    const accountToken = {
      id: account._id,
      token: account.token
    }
    updateAccount(accountToken);
  }

  async function login(accountInfoFromGoogle) {
    const accountInfo = await loginWithEmail(accountInfoFromGoogle);
    saveToken(accountInfo)

    if (accountInfo?.email) {
      dispatch({type: "setUser", data: accountInfo});
    }
  }

  async function register() {
    if(passwordRepeat.current.value !== account.password) {
      console.log(passwordRepeat.current.value, account.password)
      alert("Lösenorden matchar inte");
      return;
    }

    //try to login, and if the email already exists, it will return an error.
    //THEN we can create a new account.

    dispatch({type: "setUser", data: account});
    const response = await createAccount(account);

    if(response === "account already exists") {
      login(account);
    }
  }

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({clientId: clientId, scope: ''});
    };
    gapi.load('client:auth2', initClient);
  }, []);

  const onGoogleSuccess = async (res) => {
    const profile = {
      email: res.profileObj.email,
      name: res.profileObj.name,
      signInPlatform: "google",
      preference: preferences,
    }

    // eslint-disable-next-line no-restricted-globals
    if(confirm("Vill du automatiskt skapa konto med Google?")) {
      let response = await createAccount(profile);
      
      if(response === "account already exists") {
        login(profile);
      }
    }
  };

  return (
    <section className={styles.signUp}>
      <h2>Skapa konto</h2>

      <GoogleLogin clientId={clientId} buttonText="Sign in with Google" onSuccess={onGoogleSuccess} onFailure={(err) => {
        console.error("Error sign in with Google")
      }} cookiePolicy={'single_host_origin'} isSignedIn={true}/>

      <div className={styles.brContainer}>
        <span className={styles.brTitle}>
          Alternativt:
        </span>
      </div>

      <label htmlFor='name'>Namn *</label>
      <input type='text' placeholder='Namn' name='name' required onChange=      {handleChange}></input>
      <label htmlFor='uname'>E-post *</label>
      <input type='text' placeholder='Email' name='email' autoComplete='on' required onChange={handleChange}></input>
      <label htmlFor='psw'>Lösenord *</label>
      <input type='password' placeholder='Lösenord' name='password' required  onChange={handleChange}></input>
      <label htmlFor='psw-repeat'>Upprepa lösenord *</label>
      <input type='password' placeholder='Upprepa lösenord' name='psw-repeat' ref={passwordRepeat} required></input>
      <label htmlFor='preference'>Välj dina nyhetsintressen</label>
      <div className={styles.preferenceContainer}>
        <div>
          <input onChange={handleCheckbox} type='checkbox' id='inrikes' name='preference' value='inrikes'></input>
          <label htmlFor='inrikes'>Inrikes</label>
        </div>
        <div>
          <input onChange={handleCheckbox} type='checkbox' id='utrikes' name='preference' value='utrikes'></input>
          <label htmlFor='utrikes'>Utrikes</label>
        </div>
        <div>
          <input onChange={handleCheckbox} type='checkbox' id='sport' name='preference' value='sport'></input>
          <label htmlFor='sport'>Sport</label>
        </div>
      </div>

      <button onClick={register}>Registrera</button>
    </section>

  )
}
