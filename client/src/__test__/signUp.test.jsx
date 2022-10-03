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

  it('register button should be rendered', () => {
    render(<MocksignUp/>)
    const regButtonEl = screen.getByRole('button', {name: /registrera/i})
    expect(regButtonEl).toBeInTheDocument()
  })
  it('register button should render with correct text',  () => {
    const { queryByText } = render(<MocksignUp/>);
    expect(queryByText(/registrera/i)).toBeTruthy(); 
  })

  it('checkboxes should be able to be checked', () => {
    render(<MocksignUp/>)
    fireEvent.click(screen.getByText(/inrikes/i))
    fireEvent.click(screen.getByText(/utrikes/i))
    fireEvent.click(screen.getByText(/sport/i))
    expect(screen.getByLabelText(/inrikes/i)).toBeChecked()
    expect(screen.getByLabelText(/utrikes/i)).toBeChecked()
    expect(screen.getByLabelText(/sport/i)).toBeChecked()
  })



  //Nadia test
  it('username input should be rendered', () => {
    render(<MocksignUp/>)
    const usernameInputEl = screen.getByPlaceholderText(/email/i)
    expect(usernameInputEl).toBeInTheDocument()
  })
  it('password input should be rendered', () => {
      render(<MocksignUp/>)
      const passwordInputEl = screen.getByPlaceholderText("Lösenord")
      expect(passwordInputEl).toBeInTheDocument()
    })

  //Christian test
  it('name input should be rendered', () => {
    render(<MocksignUp/>)
    const nameInputEl = screen.getByText(/namn/i)
    expect(nameInputEl).toBeInTheDocument()
  })
 
});