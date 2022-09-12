import styles from './Login.module.css'

export default function Login(){
return(
<div className={styles.LoginPage}>
<h1> Login - Nyhetssidan </h1>

<div className={styles.Login}>
<fieldset>   

<legend><h4>Logga in på dina sidor</h4></legend>

    <label for='uname'><b>Enter Username</b></label>
    <br></br>
    <input type='text' placeholder='Enter Username' name='uname' required></input>
<br></br>
    <label for='psw'><b>Password</b></label>
    <br></br>
    <input type='password' placeholder='Enter Password' name='psw' required></input>

    <br></br>
    <button type='submit'>Login</button>
<br></br>

<a href='url'>Glömt Lösenord?</a>

    </fieldset> 

</div>


</div>


)}
