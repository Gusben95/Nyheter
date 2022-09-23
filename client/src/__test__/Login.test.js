import { render , screen, fireEvent, shallow} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../views/Login/Login';

const MockLogin = () => {
  return (  
      <BrowserRouter>
      <Login/>
      </BrowserRouter>
  )
}

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const user = {
  email: "hej@hotmail.com",
  password: ""
}

describe('Login', () => {

  it("vaild with correct email input",() => {
    render(<MockLogin/>)
    const inputEmail  = screen.getByPlaceholderText(/email/i);
    fireEvent.change(inputEmail, user.email)
    expect(validateEmail(inputEmail)).toBeTruthy()
  });

  it('should be able to type email and password', () => {
    render(<MockLogin/>)
    const inputEmail  = screen.getByPlaceholderText(/email/i);
    const inputPassword  = screen.getByPlaceholderText(/lösenord/i);
    fireEvent.change(inputEmail, user.email)
    fireEvent.change(inputPassword, user.password)
    expect(inputEmail).toBeInTheDocument()
    expect(inputPassword).toBeInTheDocument()
  })
  it('should not redirect to "/somewere" without email and password is typed after button "logga in" is clicked', () => {
    
  });
  it('should redirect to "/somewere" when link "glömt lösenord?" is clicked', () => {

  });


  it('should redirect to "/somewere" when button "Logga in med Apple" is clicked', () => {

  })
  it('should redirect to "/somewere" when button "Logga in med Google" is clicked', () => {
    
  })  
  it('should redirect to "/prenumerera" when link "Bli prenumerant" is clicked', () => {
    render(<MockLogin/>)
    const linkElement = screen.getByRole('link', {name: /bli prenumerant/i})
    fireEvent.click(linkElement)
    expect(window.location.href).toBe("http://localhost/prenumerera")
  })
  it('', () =>{})

})