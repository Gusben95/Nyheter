import styles from './Payment.module.css';

import { useSelector } from 'react-redux';

export default function Payment(props) {
  const stateUser = useSelector(state => state.User);
    //saves today as a long number
    let today = new Date().getTime();
    let ThreeMonthsFromToday = today + 7776000000;
    let SixMonthsFromToday = today + 15552000000;
    let TwelveMonthsFromToday = today + 31104000000;
  
    let subscribeEnd;
    let subscriptionCost = 0;
    switch(props.subscription) {
      case 3:
        subscribeEnd = ThreeMonthsFromToday;
        subscriptionCost = 300;
        break;
      case 6:
        subscribeEnd = SixMonthsFromToday;
        subscriptionCost = 500;
        break;
      case 12:
        subscribeEnd = TwelveMonthsFromToday;
        subscriptionCost = 800;
        break;
      default:
        subscribeEnd = TwelveMonthsFromToday;
    }

    let newUser = {
      ...stateUser,
      stillPaying: true,
      subscriptionEnd: subscribeEnd
    }

    function pay() {
      /* dispatch({type: "updateUser", data: newUser});
      updateUser(newUser); */
    }
  
  return (
    <div className={styles.paymentContainer}>
      <h1>Payment</h1>
      <p>Du har valt {props.subscription} Månader.</p>
      <p>Det kostar {subscriptionCost}kr.</p>

      <section className={styles.cardDetails}>
        <h2>Kortuppgifter</h2>
        <label htmlFor="cardNumber">Kortnummer</label>
        <input type="text" id="cardNumber" name="cardNumber" />

        <label htmlFor="cardHolder">Namn på kortägare</label>
        <input type="text" id="cardHolder" name="cardHolder" />

        <div className={styles.cardExpiry}>
          <label htmlFor="cardExpire">Utgångsdatum</label>
          <select name="cardExpire" id="cardExpire">
            <option value="01">01</option>
            <option value="02">02</option>
            <option value="03">03</option>
            <option value="04">04</option>
            <option value="05">05</option>
            <option value="06">06</option>
            <option value="07">07</option>
            <option value="08">08</option>
            <option value="09">09</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
          <h4>/</h4>
          <select name="cardExpire" id="cardExpire">
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
            <option value="24">24</option>
            <option value="25">25</option>
            <option value="26">26</option>
            <option value="27">27</option>
            <option value="28">28</option>
          </select>
        </div>

        <label htmlFor="cardCVC">CVC</label>
        <input type="text" id="cardCVC" name="cardCVC" />

        <button onClick={pay}>Betala</button>
      </section>
    </div>
  )
}