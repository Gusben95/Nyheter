import { Link } from 'react-router-dom'
import styles from './Login.module.css'
import { useRef } from 'react'

const { fetchAccountWithEmail } = require('../../dbUtils/accountActions')

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

  function googleLogin() {
    console.log('inloggad med google');
    alert('inloggad med google');
  }

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

      <button className='apple' onClick={appleLogin}>Logga in med Apple</button>
      <button className='google' onClick={googleLogin}>Logga in med Google</button>

      <Link to="/prenumerera">Bli Prenumerant</Link>
  </div>
)}
