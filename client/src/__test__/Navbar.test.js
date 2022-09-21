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
    expect(window.location.href).toBe(`${url}search/testtest`);
  });



  it('should redirect to "/" when logo is clicked', () => {
    render(<MockNavbar/>)
    const logo = screen.getByText(/Nyhetssidan/i);
    fireEvent.click(logo);
    expect(window.location.href).toBe(`${url}`);
  });

  it('should redirect to "/prenumerera" when button is clicked', () => {
    render(<MockNavbar/>);
    const buttonElement = screen.getByRole('button', {name: /prenumerera/i});
    fireEvent.click(buttonElement);
    expect(window.location.href).toBe(`${url}prenumerera`);
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


  it('should redirect to respective sub-category "/kategori/..." when link i clicked', () => {
    render(<MockNavbar/>);
    categories(['sport', 'inrikes', 'utrikes'])
  })





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
