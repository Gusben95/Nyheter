import { render , screen, fireEvent} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store/Reducer';

/* import Navbar from '../components/Navbar/Navbar'; */

const MockNavbar = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {/* <Navbar/> */}
      </BrowserRouter>
    </Provider>
  )
}

const url = "http://localhost/";
const searchValue = "testest";
const categoryArray = ['inrikes', 'utrikes', 'sport']

const capitalizeFirstLetter= (str) => {
  const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
  return capitalized;
};


describe('Navbar', () => {
  it('subscribe button should be rendered', () => {
    render(<MockNavbar/>)
    const subscribeButtonEl = screen.getByRole('button', {name: /subscribe/i})
    expect(subscribeButtonEl).toBeInTheDocument()
  })