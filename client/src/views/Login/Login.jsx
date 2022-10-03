import {Link, useNavigate} from 'react-router-dom'
import styles from './Login.module.css'
import {useRef, useEffect} from 'react'
import {GoogleLogin} from 'react-google-login';
import {gapi} from 'gapi-script';
import {useDispatch, useSelector} from 'react-redux'
// import FacebookLoginComponent from './facebookLoginComponent';

import Header from '../../components/Header/Header';
import Profile from '../../components/Profile/Profile';

const {loginWithEmail, updateAccount, getAccountWithToken} = require('../../dbUtils/accountActions')
/* göm med env */
const clientId = '299303035876-kus8sfr8h4e38iape0ivksrarjqmouef.apps.googleusercontent.com';

export default function Login() {
  const stateUser = useSelector(state => state.User)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //keep reference to inputs in HTML.
  const emailInput = useRef('');
  const passwordInput = useRef('');

  //save token from login in sessionStorage
  function saveToken(account) {
    sessionStorage.setItem('token', account.token);
    const accountToken = {
      id: account._id,
      token: account.token
    }
    updateAccount(accountToken);
  }

  //Login in user
  async function loginAuth(loginWithProvider) {
    console.log("loginAuth", loginWithProvider)
    let account = {
      email: emailInput.current.value,
      password: passwordInput.current.value
    }
    //   function validateEmail(email)
    //   {
    //       let re = /\S+@\S+\.\S+/;
    //       return re.test(email);
    //   }
    // if (!validateEmail(account.email)){
    //     alert("Ej giltig email")
    //   return
    //   }
    /* console.log(loginWithProvider) */
    if (loginWithProvider) {
      account = loginWithProvider;
    }

    const accountInfo = await loginWithEmail(account);
    //console.log(accountInfo)
    saveToken(accountInfo)

    if (
      accountInfo
      ?.email) {
      dispatch({type: "setUser", data: accountInfo});

      if (
        accountInfo
        ?.role === "admin") {
        // eslint-disable-next-line no-restricted-globals
        if (confirm("Admin logged in, redirect to admin page?")) {
          navigate('/admin');
        };
      };
    } else {
      alert(accountInfo)
    }
  }

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({clientId: clientId, scope: ''});
    };
    gapi.load('client:auth2', initClient);
  }, []);

  const onGoogleSuccess = (res) => {
    /* console.log('success:', res); */
    const profile = {
      email: res.profileObj.email,
      name: res.profileObj.name,
      signInPlatform: "google"
    }

    // eslint-disable-next-line no-restricted-globals
    if(confirm("Vill du Automatiskt logga in med Google?")) {
      loginAuth(profile)
    }
  };

  function linkToHomepage() {
    navigate('/')
  }

  return (<div className={styles.loginContainer}>
    <Header/> {
      stateUser.email
        ? (<Profile/>)
        : (<section className={styles.loginForm}>
          <h2>Logga in</h2>
          <label htmlFor='uname'>Email</label>
          <input type='text' ref={emailInput} placeholder='Email' name='uname' autoComplete='on' required="required"></input>

          <label htmlFor='psw'>Lösenord</label>
          <input type='password' ref={passwordInput} placeholder='Lösenord' name='pwd' required="required"></input>

          <button onClick={() => {
              loginAuth()
            }}>Logga in</button>

          <Link style={{color: "white"}} to="/glomtlosenord">Glömt Lösenord?</Link>

          <div className={styles.brContainer}>
            <span className={styles.brTitle}>
              Alternativt:
            </span>
          </div>

          <GoogleLogin clientId={clientId} buttonText="Sign in with Google" onSuccess={onGoogleSuccess} onFailure={(err) => {
            console.log("Error sign in with Google: ", err)
          }} cookiePolicy={'single_host_origin'} isSignedIn={true}/> 
          {/* <FacebookLoginComponent/> */}

          <Link to="/prenumerera" style={{color: "white"}}>Bli Prenumerant</Link>
        </section>)
    }
  </div>)
}
