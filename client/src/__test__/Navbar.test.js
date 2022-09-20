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


describe('Navbar', () => {

//   it('Nav should not have class name opened when clicked', () => {
//     render(<MockNavbar/>)
//     const navElement = screen.getByRole('nav')
//     const buttonElement = screen.getByRole('button', {name: /x/i})
//     fireEvent.click(buttonElement)
//     expect(navElement).not.toHaveClass('Navbar_opened')
//   })
//   it('Nav should have class name opened when clicked', () => {
//   render(<MockNavbar/>)
//   const navElement = screen.getByRole('nav')
//   const buttonElement = screen.getByRole('button', {name: /x/i})
//   fireEvent.click(buttonElement)
//   expect(navElement).toHaveClass('Navbar_opened')
// })



  //search//
  it('should be able to type into input', () => {
    render(<MockNavbar/>);
    const inputElement = screen.getByPlaceholderText(/search/i);
    const buttonElement = screen.getByRole('button', {name: /🔎/i});
    fireEvent.change(inputElement, {target: {value: "testtest"}})
    fireEvent.click(buttonElement);
    expect(inputElement).toBeInTheDocument();
  });
  it('should redirect to "/search/.." when typed in input and clicked on search button', () => {
    render(<MockNavbar/>);
    const inputElement = screen.getByPlaceholderText(/search/i);
    const buttonElement = screen.getByRole('button', {name: /🔎/i});
    fireEvent.change(inputElement, {target: {value: "testtest"}})
    fireEvent.click(buttonElement);
    expect(window.location.href).toBe("http://localhost/search/testtest");
  });



  it('should redirect to "/" when logo is clicked', () => {
    render(<MockNavbar/>)
    const logo = screen.getByText(/Nyhetssidan/i);
    fireEvent.click(logo);
    expect(window.location.href).toBe("http://localhost/");
  });

  it('should redirect to "/prenumerera" when button is clicked', () => {
    render(<MockNavbar/>);
    const buttonElement = screen.getByRole('button', {name: /prenumerera/i});
    fireEvent.click(buttonElement);
    expect(window.location.href).toBe("http://localhost/prenumerera");
  });

  it('should redirect to "/login" when button is clicked', () => {
    render(<MockNavbar/>);
    const buttonElement = screen.getByRole('button', {name: /logga in/i});
    fireEvent.click(buttonElement);
    expect(window.location.href).toBe("http://localhost/login");
  });

  it('should redirect to "/kontakt" when link is clicked', () => {
    render(<MockNavbar/>);
    const linkElement = screen.getByRole('link', {name: /kontakta oss/i});
    fireEvent.click(linkElement);
    expect(window.location.href).toBe("http://localhost/kontakt");
  });



  // it('should initialy render "Dagens ↑"', () => {
    
  // })  
  // it('should render "Dagens ↓" when clicked', () => {
    
  // })
  // it('should initialy render "Äldre ↑"', () => {
    
  // })  
  // it('should render "Äldre ↓" when clicked', () => {
    
  // })



  it('should redirect to "/kategori/inrikes" when link is clicked', () => {
    render(<MockNavbar/>);
    const linkElement = screen.getByRole('link', {name: /inrikes/i});
    fireEvent.click(linkElement);
    expect(window.location.href).toBe("http://localhost/kategori/inrikes");
  });
  it('should redirect to "/kategori/utrikes" when link is clicked', () => {
    render(<MockNavbar/>);
    const linkElement = screen.getByRole('link', {name: /utrikes/i});
    fireEvent.click(linkElement);
    expect(window.location.href).toBe("http://localhost/kategori/utrikes");
  });
  it('should redirect to "/kategori/sport" when link is clicked', () => {
    render(<MockNavbar/>);
    const linkElement = screen.getByRole('link', {name: /sport/i});
    fireEvent.click(linkElement);
    expect(window.location.href).toBe("http://localhost/kategori/sport");
  });  



  // it('should redirect to "/helaVeckan" when link is clicked', () => {
  //   render(<MockNavbar/>);
  //   const linkElement = screen.getByRole('link', {name: /hela veckan/i});
  //   fireEvent.click(linkElement);
  //   expect(window.location.href).toBe("http://localhost/helaveckan");
  // });  
  // it('should redirect to "/forraVeckan" when link is clicked', () => {
  //   render(<MockNavbar/>);
  //   const linkElement = screen.getByRole('link', {name: /förra veckan/i});
  //   fireEvent.click(linkElement);
  //   expect(window.location.href).toBe("http://localhost/forraVeckan");
  // });



});
