import { render , screen, fireEvent} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store/Reducer';
import SignUp from '../components/signUp/SignUp';



const MocksignUp = () => {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <SignUp/>
        </BrowserRouter>
      </Provider>
    )
  }

  const url = "http://localhost/";
  
  describe('signUp', () => {

    it('username input should be rendered', () => {
      render(<MocksignUp/>)
      const usernameInputEl = screen.getByPlaceholderText(/email/i)
      expect(usernameInputEl).toBeInTheDocument()
    })
    it('password input should be rendered', () => {
        render(<MocksignUp/>)
        const passwordInputEl = screen.getByPlaceholderText(/lösenord/i)
        expect(passwordInputEl).toBeInTheDocument()
      })
   
    });