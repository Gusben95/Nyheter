import { Link } from 'react-router-dom'
import styles from './Login.module.css'
import { hashPassword, comparePassword } from '../../utilis/bcrypt'
import { useRef } from 'react'

export default function Login(){

//keep reference to inputs in HTML. 
    const emailInput = useRef('');
    const passwordInput = useRef('');

    //Login in user
    function loginAuth(){
        //get email & password from ref (in html)
        const email = emailInput.current.value
        const password = passwordInput.current.value

        console.log(email, password);
    }


return(
  <div className={styles.loginContainer}>
    <fieldset className={styles.LoginPage}>   
      <legend>Logga in</legend>

      <label htmlFor='uname'>Email</label>
      <input type='text' ref={emailInput} placeholder='Email' name='uname' autoComplete='on' required></input>
      
      <label htmlFor='psw'>Lösenord</label>
      <input type='password' ref={passwordInput} placeholder='Lösenord' name='pwd' required></input>

      <button onClick={loginAuth}>Logga in</button>

      <Link to="/glomtlosenord">Glömt Lösenord?</Link>
      <Link to="/prenumerera">Bli Prenumerant</Link>
    </fieldset>

  </div>
)}
