import { render , screen, fireEvent, getByAltText} from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../store/Reducer';
import { BrowserRouter } from 'react-router-dom';
import Header from '../components/Header/Header';

const MockHeader = () => {
  return (
      <Provider store={store}>
        <BrowserRouter>
          <Header/>
        </BrowserRouter>
      </Provider>
  )
};

const url = "http://localhost/";

describe('Header', () => {
  it('logo should be rendered', () => {
    render(<MockHeader/>)
    const logo = screen.getByRole("img");
    expect(logo).toBeInTheDocument()  
    expect(logo).toHaveAttribute('alt', 'logo')  
    expect(logo).toHaveAttribute('src', 'Logo.png')  
  })
  it('logo should redirect when clicked', () => {
    render(<MockHeader/>)
    const logo = screen.getByRole("img");
    fireEvent.click(logo)
    expect(window.location.href).toBe(`${url}`)
  })

})