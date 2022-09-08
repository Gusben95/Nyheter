import { Link } from 'react-router-dom'
import styles from './Login.module.css'

export default function Login(){
return(
<div className={styles.LoginPage}>
<h1> Login - Nyhetssidan </h1>

<div className={styles.Login}>
<fieldset>   

<legend><h4>Logga in</h4></legend>

    <label htmlFor='uname'><b>Användarnamn</b></label>
    <br></br>
    <input type='text' placeholder='Användarnamn' name='uname' required></input>
<br></br>
    <label htmlFor='psw'><b>Lösenord</b></label>
    <br></br>
    <input type='password' placeholder='Lösenord' name='pwd' required></input>

    <br></br>
    <button type='submit'>Logga in</button>
<br></br>

<Link to="/forgotPassword">Glömt Lösenord?</Link>
<br></br>
<Link to="/registerNewUser">Bli Prenumerant</Link>

    </fieldset> 

</div>


</div>


)}
