import { Link } from 'react-router-dom'
import styles from './Login.module.css'
import { hashPassword } from '../../utils/bcryptUtils'
import { useRef } from 'react'

const { deleteArticle, updateArticle } = require('../../dbUtils/articleActions')
const { fetchAccountWithEmail } = require('../../dbUtils/accountActions')

export default function Login(){

//keep reference to inputs in HTML.
  const emailInput = useRef('');
  const passwordInput = useRef('');

  //Login in user
  async function loginAuth(){
    //get email & password from ref (in html)
    let password = passwordInput.current.value
    let hashedPassword = ""
    if(password !== ""){
      hashedPassword = await hashPassword(password)
    }
    const account = {
      email: emailInput.current.value,
      password: hashedPassword
    }
    console.log(account);

    const accountInfo = await fetchAccountWithEmail(account)
    console.log(accountInfo)


    // tested the updateArticle and deleteArticle routes
    // let testArticle = {
    //   id: "6321d667eb2e448892d5e77d",
    //   title: "hej",
    //   shortDescription: "hallå",
    //   mainText: "kul",
    //   categories: "itemories",
    //   author: "ite",
    //   dateAdded: "iteteAdded",
    //   views: 10,
    //   images: ["hek", "lol"]
    // }
    // updateArticle(testArticle)
    // deleteArticle({id: emailInput.current.value})

  }

  function appleLogin() {
    console.log('inloggad med apple');

  }

  function googleLogin() {
    console.log('inloggad med google');

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

      <button className='apple' onClick={appleLogin}>Logga in med Apple</button>
      <button className='google' onClick={googleLogin}>Logga in med Google</button>
    </fieldset>



  </div>
)}
