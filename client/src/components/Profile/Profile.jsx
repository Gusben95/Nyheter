import { useSelector } from "react-redux";

import styles from './Profile.module.css'

export default function Profile() {
  const stateUser = useSelector(state => state.User);

  let subscriptionEndFormatted = new Date(stateUser.subscriptionEnd).toLocaleDateString('sv-SE', {year: 'numeric', month: 'long', day: 'numeric'});

  <section className={styles.loggedIn}>
    <h2>Hej {stateUser.name}</h2>
    <h4>Du är {stateUser.role}</h4>
    {stateUser.stillPaying ? (
      <>
        <p>Du betalar fortfarande</p>
        <p>Kom ihåg att din prenumeration slutar {subscriptionEndFormatted}</p>
      </>
    ) : ""}
  </section>
}