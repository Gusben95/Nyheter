import { render , screen, fireEvent , getByRole} from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../store/Reducer';
import { BrowserRouter } from 'react-router-dom';
import Login from '../views/Login/Login';

const MockLogin = () => {
  return (  
      <Provider store={store}>
        <BrowserRouter>
          <Login/>
        </BrowserRouter>
      </Provider>
  )
}

const url = "http://localhost/";
const user = {
  email: "hejja@gmail.com",
  password: "pwd123"
}


describe('Login', () => {

  it('username input should be rendered', () => {
    render(<MockLogin/>)
    const usernameInputEl = screen.getByPlaceholderText(/email/i)
    expect(usernameInputEl).toBeInTheDocument()
  })
  it('password input should be rendered', () => {
    render(<MockLogin/>)
    const passwordInputEl = screen.getByPlaceholderText(/lösenord/i)
    expect(passwordInputEl).toBeInTheDocument()
  })

  it('username input should change', () => {
    render(<MockLogin/>)
    const usernameInputEl = screen.getByPlaceholderText(/email/i)
    fireEvent.change(usernameInputEl, {target: {value: user.email}})
    expect(usernameInputEl.value).toBe(user.email)
  })
  it('password input should change', () => {
    render(<MockLogin/>)
    const passwordInputEl = screen.getByPlaceholderText(/lösenord/i)
    fireEvent.change(passwordInputEl, {target: {value: user.password}})
    expect(passwordInputEl.value).toBe(user.password)
  })

  it('button login should be rendered', () => {
    render(<MockLogin/>)
    const buttonEl = screen.getByRole('button', {name: "Logga in"})
    expect(buttonEl).toBeInTheDocument()
  })
  it('button login should be enabled', () => {
    render(<MockLogin/>)
    const buttonEl = screen.getByRole('button', {name: "Logga in"})
    expect(buttonEl).toBeEnabled()
  })

  it('user who have logged in with email and password should redirect to user profile', () => {
    render (<MockLogin/>)
    const usernameInputEl = screen.getByPlaceholderText(/email/i)
    fireEvent.change(usernameInputEl, {target: {value: user.email}})
    const passwordInputEl = screen.getByPlaceholderText(/lösenord/i)
    fireEvent.change(passwordInputEl, {target: {value: user.password}})
    const buttonEl = screen.getByRole('button', {name: "Logga in"})
    fireEvent.click(buttonEl)
    expect(window.location.href).toBe("http://localhost/")

  })

  // it('error message should not be visible', () => {
  //   render(<MockLogin/>)
  //   const errorEl = 
  //   expect(errorEl).not.toBeVisible()
  // })
  // it('error message should be visible when email is incorrect', () => {
  //   render(<MockLogin/>)
  //   const errorEl = 
  //   expect(errorEl).toBeVisible()
  // })

  it('forgotten password link should be rendered', () => {
    render(<MockLogin/>)
    const forgottenPasswordLinkEl = screen.getByText(/glömt lösenord?/i)
    expect(forgottenPasswordLinkEl).toBeInTheDocument()
  })
  it('forgotten password link should redirect when clicked', () => {
    render(<MockLogin/>)
    const forgottenPasswordLinkEl = screen.getByText(/glömt lösenord?/i)
    fireEvent.click(forgottenPasswordLinkEl)
    expect(window.location.href).toBe(`${url}glomtlosenord`)
  })

  it('google login should be rendered', () => {
    render(<MockLogin/>)
    const googleLinkEl = screen.getByText(/Sign in with Google/i)
    expect(googleLinkEl).toBeInTheDocument()
  })
  // it('google login should redirect when clicked', () => {
  //   render(<MockLogin/>)
  //   const googleLinkEl = screen.getByText(/Sign in with Google/i)
  //   fireEvent.click(googleLinkEl)
  //   expect(googleLinkEl)......
  // })
  
  it('apple login should be rendered', () => {
    render(<MockLogin/>)
    const appleLinkEl = screen.getByRole('button', {name: /logga in med apple/i})
    expect(appleLinkEl).toBeInTheDocument()
  })
    
  it('apple login should be rendered', () => {
    render(<MockLogin/>)
    screen.debug()
  })
  // it('apple login should redirect when clicked', () => {
  //   render(<MockLogin/>)
  //   const appleLinkEl = screen.getByRole('button', {name: /logga in med apple/i})
  //   fireEvent.click(appleLinkEl)
  //   expect(appleLinkEl)......
  // })

  it('subscriber link should be rendered', () => {
    render(<MockLogin/>)
    const subscriberLinkEl = screen.getByText(/bli prenumerant/i)
    expect(subscriberLinkEl).toBeInTheDocument()
  })
  it('subscriber link should redirect when clicked', () => {
    render(<MockLogin/>)
    const subscriberLinkEl = screen.getByText(/bli prenumerant/i)
    fireEvent.click(subscriberLinkEl)
    expect(window.location.href).toBe(`${url}prenumerera`)
  })

})