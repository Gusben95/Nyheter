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

describe('Footer', () => {
  it('should redirect to "/facebook" when icon is clicked', () => {
    render(<MockFooter/>)
    const linkElement = screen.getByRole('svg', {name: /facebook/i})
    fireEvent.click(linkElement)
    expect(window.location.href).toBe("https://www.facebook.com/")
  })
  it('should redirect to "/instagram" when icon is clicked', () => {
    render(<MockFooter/>)
    const linkElement = screen.getByRole('link', {name: /instagram/i})
    fireEvent.click(linkElement)
    expect(window.location.href).toBe("https://www.instagram.com/")
  })
  it('should redirect to "/youtube" when icon is clicked', () => {
    render(<MockFooter/>)
    const linkElement = screen.getByRole('link', {name: /youtube/i})
    fireEvent.click(linkElement)
    expect(window.location.href).toBe("http://youtube.com/")
  })
  it('should redirect to "/twitter" when icon is clicked', () => {
    render(<MockFooter/>)
    const linkElement = screen.getBy('link', {target: {type: "twitter"}})
    fireEvent.click(linkElement)
    expect(window.location.href).toBe("https://twitter.com/")
  })
})