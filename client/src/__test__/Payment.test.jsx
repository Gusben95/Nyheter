import { render , screen, fireEvent } from '@testing-library/react';
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

  it('cardExpire dropdown should correctly set default option=N/A', () => {
    render(<MockPayment />)
    expect(screen.getByLabelText('Utgångsdatum').selected).toBeFalsy()
  })
  it('cardExpire dropdown should display the correct number of options', () => {
    render(<MockPayment />)
    expect(screen.getAllByRole('option').length).toBe(20)
  })
  it('cardExpire dropdown should allow user to change option', () => {
    render(<MockPayment />)
    fireEvent.select(screen.getByRole('option', {name: '02'}))
    expect(screen.getByRole('option', {name: '02'})).toBeInTheDocument()
  })
  
  it('pay button should be rendered and clickable', () => {
    render(<MockPayment/>)
    const buttonEl = screen.getByRole('button', {name: /betala/i})
    expect(buttonEl).toBeInTheDocument()
    fireEvent.click(buttonEl)
    expect(buttonEl).toBeValid()
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


