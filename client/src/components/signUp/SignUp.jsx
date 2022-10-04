import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import styles from './SignUp.module.css';
import { createAccount } from '../../dbUtils/accountActions';

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
  }

  return (
    <section className={styles.signUp}>
      <h2>Skapa konto</h2>
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
