import { Link } from 'react-router-dom'
import styles from './Login.module.css'
import { hashPassword, comparePassword } from '../../utilis/bcrypt'

export default function Login(){
return(

    <fieldset className={styles.LoginPage}>   
      <legend>Logga in</legend>

      <label htmlFor='uname'><b>Användarnamn</b></label>
      <input type='text' autocomplete="on" placeholder='Användarnamn' name='uname' required></input>
      
      <label htmlFor='psw'><b>Lösenord</b></label>
      <input type='password' placeholder='Lösenord' name='pwd' required></input>

      <button type='submit'>Logga in</button>

      <Link to="/glomtlosenord">Glömt Lösenord?</Link>
      <Link to="/prenumerera">Bli Prenumerant</Link>
    </fieldset> 



)}
