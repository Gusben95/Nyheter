import { render , screen, fireEvent} from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../store/Reducer';
import { BrowserRouter } from 'react-router-dom';
import Footer from '../components/Footer/Footer';

const MockFooter = () => {
  return (
      <Provider store={store}>
        <BrowserRouter>
          <Footer/>
        </BrowserRouter>
      </Provider>
  )
};

const url = "http://localhost/";

const linkArray = ['Om oss', 'Hjälp', 'Annonsera', 'Kontakta oss', 'Korrigeringar', 'Karriär']

const capitalizeFirstLetter= (str) => {
  const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
  return capitalized;
};

describe('Footer', () => {
  it('linkArray should be rendered', () => {
    render(<MockFooter/>)
    linkArray.forEach(link => {
      const pEl = screen.getByText(capitalizeFirstLetter(link));
      expect(pEl).toBeInTheDocument()  
    })
  })
  it('linkArray should redirect when clicked', () => {
    render(<MockFooter/>)
    linkArray.forEach(x => {
      const pEl = screen.getByText(capitalizeFirstLetter(x));
      fireEvent.click(pEl);
      expect(window.location.href).toBe(`${url}kommersnart`);    
    })
  })


})