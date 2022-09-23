import { render , screen, fireEvent} from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../store/Reducer';
import { BrowserRouter } from 'react-router-dom';
import Homepage from '../views/Homepage/Homepage';

const MockHomepage = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Homepage/>
      </BrowserRouter>
    </Provider>
  )
};

describe('Homepage', () => {
  it('should redirect to "/prenumerera" when link is clicked', () => {
    render(<MockHomepage/>);
    const linkElement = screen.getByRole('link', {name: /prenumerera nu/i});
    fireEvent.click(linkElement);
    expect(window.location.href).toBe("http://localhost/prenumerera");
  })
  it('should redirect to "/prenumerera" when link is clicked', () => {
    render(<MockHomepage/>)
    const linkElement = screen.getByRole('link', {name: /logga in/i})
    fireEvent.click(linkElement)
    expect(window.location.href).toBe("http://localhost/login")
  })
  it('should render loading or articles',( )=> { /* hur articles???*/
    render(<MockHomepage/>)
    const loading = screen.getByText(/loading.../i)
    expect(loading).toBeTruthy()
  })
  it('should go back to top when ⬆️ is clicked', () => {
    window.scrollTo = jest.fn()
    render(<MockHomepage/>)
    const backToTop = screen.getByText(/Tillbaka till toppen/i)
    fireEvent.click(backToTop)
    expect(window.scrollTo).toBeCalledWith({"behavior": "smooth", "left": 0, "top": 0})
  })
})

