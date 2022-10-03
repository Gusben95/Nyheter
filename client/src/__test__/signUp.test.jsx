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

const user = {
  name: 'hej',
  email: "hejsan@gmail.com",
  password: "pwd123",
  password2: "pwd123"
}

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

  it('upprepa password input should be rendered', () => {
    render(<MocksignUp/>)
    const password2InputEl = screen.getByPlaceholderText("Upprepa lösenord")
    expect(password2InputEl).toBeInTheDocument()
  })

  it('all inputs should be able to be changed', () => {
    render(<MocksignUp/>)
    const nameInputEl = screen.getByPlaceholderText(/namn/i)
    const emailInputEl = screen.getByPlaceholderText(/email/i)
    const passwordInputEl = screen.getByPlaceholderText("Lösenord")
    const password2InputEl = screen.getByPlaceholderText(/upprepa lösenord/i)
    fireEvent.change(nameInputEl, {target: {value: user.name}})
    fireEvent.change(emailInputEl, {target: {value: user.email}})
    fireEvent.change(passwordInputEl, {target: {value: user.password}})
    fireEvent.change(password2InputEl, {target: {value: user.password2}})
    expect(nameInputEl.value).toBe(user.name)
    expect(emailInputEl.value).toBe(user.email)
    expect(passwordInputEl.value).toBe(user.password)
    expect(password2InputEl.value).toBe(user.password2)
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