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

const url = "http://localhost/";


describe('Homepage', () => {

  it('subscribe link should be rendered', () => {
    render(<MockHomepage/>)
    const subscribeLinkEl = screen.getByText(/prenumerera nu/i)
    expect(subscribeLinkEl).toBeInTheDocument()
  })
  it('subscribe link should redirect when clicked', () => {
    render(<MockHomepage/>)
    const subscribeLinkEl = screen.getByText(/prenumerera nu/i)
    fireEvent.click(subscribeLinkEl)
    expect(window.location.href).toBe(`${url}prenumerera`)
  })

  it('login link should be rendered', () => {
    render(<MockHomepage/>)
    const loginLinkEl = screen.getByText(/logga in/i)
    expect(loginLinkEl).toBeInTheDocument()
  })
  it('login link should redirect when clicked', () => {
    render(<MockHomepage/>)
    const loginLinkEl = screen.getByText(/logga in/i)
    fireEvent.click(loginLinkEl)
    expect(window.location.href).toBe(`${url}login`)
  })

  // it('articles should be rendered', () => {
  //   render(<MockHomepage/>)
  //   screen.debug()
  // })

  it('back to top should be rendered', () => {
    render(<MockHomepage/>)
    const backToTop = screen.getByText(/Tillbaka till toppen/i)
    expect(backToTop).toBeInTheDocument()
  })
  it('back to top should scrollToTop when clicked', () => {
    window.scrollTo = jest.fn()
    render(<MockHomepage/>)
    const backToTop = screen.getByText(/Tillbaka till toppen/i)
    fireEvent.click(backToTop)
    expect(window.scrollTo).toBeCalledWith({"behavior": "smooth", "left": 0, "top": 0})
  })
})

