import styles from './Contact.module.css'


export default function Contact() {
    return (
    <div className='contactPage'>
        <h2> Tipslåda</h2>
				Här kan du skicka in tips annonymt om saker i samhället som du anser bör rapporteras. <br/>
        <textarea /> <br/>
        <button>skicka tipset</button>

        <h2>Kontakta oss. </h2>
        <ul>
            <li>
                Adress: Järntorget 1. 413 14, Göteborg.
            </li>
            <li>
                Telefonnummer: 12345678910 - Öppettider 10-16 vardagar. 
            </li>
            <li>
                Mailadress: jacob.klaren@nyhetssida.se
            </li>
        </ul>
    </div>
    )
}
