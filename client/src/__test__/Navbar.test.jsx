import { render , screen, fireEvent} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store/Reducer';

import Navbar from '../components/Navbar/Navbar';

const MockNavbar = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar/>
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
  it('subscribe button should redirect when clicked', () => {
    render(<MockNavbar/>)
    const subscribeButtonEl = screen.getByRole('button', {name: /subscribe/i})
    fireEvent.click(subscribeButtonEl)
    expect(window.location.href).toBe(`${url}prenumerera`)
  })

  it('hamburger should be rendered', () => {
    render(<MockNavbar/>)
    const buttonEl = screen.getByRole('button', {name: "𝗫"})
    expect(buttonEl).toBeInTheDocument()
  })

  it('search input should change', () => {
    render(<MockNavbar/>)
    const searchInputEl = screen.getByPlaceholderText(/search/i)
    fireEvent.change(searchInputEl, {target: {value: searchValue}})
    expect(searchInputEl.value).toBe(searchValue)
  })
  it('search input should redirect when clicked', () => {
    render(<MockNavbar/>);
    const searchInputEl = screen.getByPlaceholderText(/search/i);
    const buttonEl = screen.getByRole('button', {name: /🔎/i});
    fireEvent.change(searchInputEl, {target: {value: searchValue}})
    fireEvent.click(buttonEl);
    expect(window.location.href).toBe(`${url}search/${searchValue}`);
  })

  it('login button should be rendered', () => {
    render(<MockNavbar/>)
    const loginButtonEl = screen.getByRole('button', {name: /logga in/i})
    expect(loginButtonEl).toBeInTheDocument()
  })
  it('login button should redirect when clicked', () => {
    render(<MockNavbar/>)
    const loginButtonEl = screen.getByRole('button', {name: /logga in/i})
    fireEvent.click(loginButtonEl)
    expect(window.location.href).toBe(`${url}login`)
  })

  it('categories links should be rendered', () => {
    render(<MockNavbar/>);
    expect(categoryArray.length).toEqual(3)
  })
  it('categories links should redirect to respective sub-category when clicked', () => {
    render(<MockNavbar/>);
    categoryArray.forEach(x => {
      const linkElement = screen.getByRole('link', {name: capitalizeFirstLetter(x)});
      fireEvent.click(linkElement);
      expect(window.location.href).toBe(`${url}kategori/${x}`);    
    })
  })

});
