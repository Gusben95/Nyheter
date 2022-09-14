import { Link } from 'react-router-dom'
import styles from './Login.module.css'
import { useRef } from 'react'

const { deleteArticle, updateArticle } = require('../../dbUtils/articleActions')

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


return(
  <div className={styles.loginContainer}>
    <fieldset className={styles.LoginPage}>
      <legend>Logga in</legend>

      <label htmlFor='uname'><b>Email</b></label>
      <input type='text' ref={emailInput} placeholder='Email' name='uname' required></input>


      <label htmlFor='psw'><b>Lösenord</b></label>
      <input type='password' ref={passwordInput} placeholder='Lösenord' name='pwd' required></input>

      <button onClick={loginAuth}>Logga in</button>

      <Link to="/glomtlosenord">Glömt Lösenord?</Link>
      <Link to="/prenumerera">Bli Prenumerant</Link>
    </fieldset>

  </div>
)}
