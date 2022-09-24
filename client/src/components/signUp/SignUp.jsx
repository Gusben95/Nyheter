import { useRef } from 'react';
import styles from './SignUp.module.css';

export default function SignUp() {
  const passwordRepeat = useRef();

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

  function test() {
    if(passwordRepeat.current.value !== account.password) {
      alert("Lösenorden matchar inte");
      return;
    }

    /* dispatch({type: "setUser", data: account});
    createAccount(account); */
  }

  return (
    <section className={styles.signUp}>
      <h2>Sign up</h2>
      <label htmlFor='name'>Namn *</label>
      <input type='text' placeholder='Namn' name='name' required onChange={handleChange}></input>
      <label htmlFor='uname'>Email *</label>
      <input type='text' placeholder='Email' name='email' autoComplete='on' required onChange={handleChange}></input>
      <label htmlFor='psw'>Lösenord *</label>
      <input type='password' placeholder='Lösenord' name='password' required onChange={handleChange}></input>
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

      <button onClick={test}>Registrera</button>
    </section>

  )
}