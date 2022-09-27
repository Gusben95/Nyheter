import { render , screen, fireEvent} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';

const MockNavbar = () => {
  return (
    <BrowserRouter>
      <Navbar/>
    </BrowserRouter>
  )
}

const url = "http://localhost/";
const searchValue = "testest";

const capitalizeFirstLetter= (str) => {
  const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
  return capitalized;
};

const categories = (x) => {
  x.forEach(x => {
    const linkElement = screen.getByRole('link', {name: capitalizeFirstLetter(x)});
    fireEvent.click(linkElement);
    expect(window.location.href).toBe(`${url}kategori/${x}`);    
  });
}



describe('Navbar', () => {

  it('should redirect to "/prenumerera" when button is clicked', () => {
    render(<MockNavbar/>)
    const buttonElement = screen.getByRole('button', {name: /subscribe/i});
    fireEvent.click(buttonElement);
    expect(window.location.href).toBe(`${url}prenumerera`);

  })

  //search//
  it('should be able to type into input', () => {
    render(<MockNavbar/>);
    const inputElement = screen.getByPlaceholderText(/search/i);
    const buttonElement = screen.getByRole('button', {name: /🔎/i});
    fireEvent.change(inputElement, {target: {value: searchValue}})
    fireEvent.click(buttonElement);
    expect(inputElement).toBeInTheDocument();
  });
  it('should redirect to "/search/.." when typed in input and clicked on search button', () => {
    render(<MockNavbar/>);
    const inputElement = screen.getByPlaceholderText(/search/i);
    const buttonElement = screen.getByRole('button', {name: /🔎/i});
    fireEvent.change(inputElement, {target: {value: searchValue}})
    fireEvent.click(buttonElement);
    expect(window.location.href).toBe(`${url}search/${searchValue}`);
  });



  it('should redirect to "/" when logo is clicked', () => {
    render(<MockNavbar/>)
    const logo = screen.getByText(/Nyhetssidan/i);
    fireEvent.click(logo);
    expect(window.location.href).toBe(`${url}`);
  });


  it('should redirect to "/login" when button is clicked', () => {
    render(<MockNavbar/>);
    const buttonElement = screen.getByRole('button', {name: /logga in/i});
    fireEvent.click(buttonElement);
    expect(window.location.href).toBe(`${url}login`);
  });

  it('should redirect to respective sub-category "/kategori/..." when link i clicked', () => {
    render(<MockNavbar/>);
    categories(['sport', 'inrikes', 'utrikes'])
  })

});
