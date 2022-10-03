import { render , screen, fireEvent} from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../store/Reducer';
import { BrowserRouter } from 'react-router-dom';
import Payment from '../components/Payment/Payment';

const MockPayment = () => {
  return (
      <Provider store={store}>
        <BrowserRouter>
          <Payment/>
        </BrowserRouter>
      </Provider>
  )
};


describe('Payment', () => {

  it('pay button should be rendered', () => {
    render(<MockPayment/>)
    const buttonEl = screen.getByRole('button', {name: /betala/i})
    expect(buttonEl).toBeInTheDocument()
  })


  //Mathias Test
  it('cardnumber input should be rendered', () => {
      render(<MockPayment/>)
      const CardNumberInputEl = screen.getByText(/kortnummer/i)
      expect(CardNumberInputEl).toBeInTheDocument()
  })
  it('cardHolder input should be rendered', () => {
      render(<MockPayment/>)
      const CardHolderInputEl = screen.getByText(/Namn på kortägare/i)
      expect(CardHolderInputEl).toBeInTheDocument()
  })
  it('cardExpire input should be rendered', () => {
      render(<MockPayment/>)
      const CardExpireInputEl = screen.getByText(/Utgångsdatum/i)
      expect(CardExpireInputEl).toBeInTheDocument()
  })
  
  //Christian Test
  it('cardCVC input should be rendered', () => {
    render(<MockPayment/>)
    const cardcvcInputEl = screen.getByLabelText("CVC")
    expect(cardcvcInputEl).toBeInTheDocument()
  })
})


