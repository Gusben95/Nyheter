import { Link } from 'react-router-dom'
import styles from './Login.module.css'
import { hashPassword, comparePassword } from '../../utils/bcryptUtils'
import { useRef } from 'react'

export default function Login(){

//keep reference to inputs in HTML. 
  const emailInput = useRef('');
  const passwordInput = useRef('');

  //Login in user
  async function loginAuth(){
    //get email & password from ref (in html)
    const email = emailInput.current.value;
    const password = passwordInput.current.value;

    let hashedPassword;
    if(password !== ""){
      hashedPassword = await hashPassword(password)
    }

    

    console.log(email, password, hashedPassword);
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

      <h3> Alternativa inloggningsmetoder:</h3>

      <button className='apple'>Logga in med Apple</button>
      <button className='google'>Logga in med Google</button>
    </fieldset>

  </div>
)}
