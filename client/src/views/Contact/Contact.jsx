import styles from './Contact.module.css'


export default function Contact() {
    return (
    <div className={styles.contactPage}>
        <div className={styles.tips}>
          <fieldset>   
            <legend>Tipslåda</legend> 
            <p>Här kan du skicka in tips annonymt om saker i samhället som du anser bör rapporteras.</p>
            <div className={styles.tipsRuta}>            
              <textarea /> 
            </div> 
          </fieldset> 
          <button>skicka tipset</button>
        </div>

        <h2>Kontakta oss. </h2>
        <ul>
          <li>Adress: Järntorget 1. 413 14, Göteborg.</li>
          <li>Telefonnummer: 12345678910 - Öppettider 10-16 vardagar.</li>
          <li>Mailadress: jacob.klaren@nyhetssida.se</li>
        </ul>
    </div>
    )
}