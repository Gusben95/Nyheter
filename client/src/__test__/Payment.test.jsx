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
  // it('', () => {
  //   render(<MockPayment/>)
  //   screen.debug()
  // })

  it('cardCVC input should be rendered', () => {
    render(<MockPayment/>)
    const cardcvcInputEl = screen.getByLabelText("CVC")
    expect(cardcvcInputEl).toBeInTheDocument()
  })

  // it('cardCVC input should change', () => {
  //   render(<MockPayment/>)
  //   const cardcvcInputEl = screen.getByLabelText("CVC")
  //   fireEvent.change(cardcvcInputEl, {target: {value: user.email}})
  //   expect(cardcvcInputEl.value).toBe(user.email)
  // })

  it('pay button should be rendered', () => {
    render(<MockPayment/>)
    const buttonEl = screen.getByRole('button', {name: /betala/i})
    expect(buttonEl).toBeInTheDocument()
  })
  // it('pay button should redirect when clicked', () => {
  //   render(<MockPayment/>)

  // })
})

  //Mathias Test
  describe('Payment', () => {
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


  })
