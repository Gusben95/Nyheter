import { render , screen, fireEvent} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../views/Login/Login';

const MockLogin = () => {
  return (
    <BrowserRouter>
      <Login/>
    </BrowserRouter>
  )
}

describe('Login', () => {
  it('should be able to type email and password', () => {
    render(<MockLogin/>)
    const inputEmail  = screen.getByPlaceholderText(/email/i);
    const inputPassword  = screen.getByPlaceholderText(/lösenord/i);
    fireEvent.change(inputEmail, "hej@hotmail.com")
    fireEvent.change(inputPassword, "hej@hotmail.com")
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

})