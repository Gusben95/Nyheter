import { render , screen, fireEvent} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store/Reducer';
import Subscribe from '../views/Subscribe/Subscribe';

const MockSubscribe = () => {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Subscribe/>
        </BrowserRouter>
      </Provider>
    )
  }

const url = "http://localhost/";


describe('signUp', () => {

  it('subscribe button should be rendered', () => {
    render(<MockSubscribe/>)
    const premButtonEl = screen.getByRole('button', {name: /Prenumerera nu/i})
    expect(premButtonEl).toBeInTheDocument()
  })
  it('subscribe button should render with correct text',  () => {
    const { queryByText } = render(<MockSubscribe/>);
    expect(queryByText("Prenumerera nu")).toBeTruthy(); 
  })
 
});