import { useRef } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import styles from './Footer.module.css'

export default function Footer() {

    return(
        <footer className={styles.footer}>
            {/* <h2> Tipslåda</h2>
				Här kan du skicka in tips annonymt om saker i samhället som du anser bör rapporteras. <br/>
        <textarea /> <br/>
        <button>skicka tipset</button> */}

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
        </footer>
    )
}