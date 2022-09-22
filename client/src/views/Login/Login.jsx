import { Link } from 'react-router-dom'
import styles from './Login.module.css'
import { useRef,useEffect } from 'react'
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';


const { fetchAccountWithEmail } = require('../../dbUtils/accountActions')
const clientId = '299303035876-kus8sfr8h4e38iape0ivksrarjqmouef.apps.googleusercontent.com';


export default function Login(){
  //keep reference to inputs in HTML.
  const emailInput = useRef('');
  const passwordInput = useRef('');

  //Login in user
  async function loginAuth(){
    const account = {
      email: emailInput.current.value,
      password: passwordInput.current.value
    }
    console.log(account);

    const accountInfo = await fetchAccountWithEmail(account)
    console.log(accountInfo)
  }

  function appleLogin() {
    console.log('inloggad med apple');
    alert('inloggad med apple');
  }

useEffect(() => {
     const initClient = () => {
           gapi.client.init({
           clientId: clientId,
           scope: ''
         });
      };
      gapi.load('client:auth2', initClient);
  }, []);

  const onSuccess = (res) => {
    console.log('success:', res);
};
const onFailure = (err) => {
    console.log('failed:', err);
};


return(
  <div className={styles.loginContainer}>
      <h1>Nyhetssidan</h1>

      <h2>Logga in</h2>
      <label htmlFor='uname'>Email</label>
      <input type='text' ref={emailInput} placeholder='Email' name='uname' autoComplete='on' required></input>

      <label htmlFor='psw'>Lösenord</label>
      <input type='password' ref={passwordInput} placeholder='Lösenord' name='pwd' required></input>

      <button onClick={loginAuth}>Logga in</button>

      <Link to="/glomtlosenord">Glömt Lösenord?</Link>

      <div className={styles.brContainer}>
        <span className={styles.brTitle}>
          Alternativt:
        </span>
      </div>

      <GoogleLogin
      clientId={clientId}
      buttonText="Sign in with Google"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={'single_host_origin'}
      isSignedIn={true}
  />

      <button className='apple' onClick={appleLogin}>Logga in med Apple</button>
      <Link to="/prenumerera">Bli Prenumerant</Link>
  </div>
)}
