import { render , screen, fireEvent, getByAltText} from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../store/Reducer';
import { BrowserRouter } from 'react-router-dom';
import Comingsoon from '../views/Comingsoon/Comingsoon';

const MockComingsoon = () => {
  return (
      <Provider store={store}>
        <BrowserRouter>
          <Comingsoon/>
        </BrowserRouter>
      </Provider>
  )
};

const url = "http://localhost/";

describe('Comingsoon', () => {
  it('link should be rendered', () => {
    render(<MockComingsoon/>)
    const linkEl = screen.getByRole("heading", {name: /Gå tillbaka till Startsidan😁/i});
    expect(linkEl).toBeInTheDocument()  
  })
  it('link should redirect when clicked', () => {
    render(<MockComingsoon/>)
    const linkEl = screen.getByRole("heading", {name: /Gå tillbaka till Startsidan😁/i});
    fireEvent.click(linkEl)
    expect(window.location.href).toBe(`${url}`)
  })

})