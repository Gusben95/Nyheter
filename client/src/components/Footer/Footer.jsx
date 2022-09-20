import { useRef } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import styles from './Footer.module.css'

export default function Footer() {

    return (
        <footer className={styles.footer}>
            {/* <h2> Tipslåda</h2>
				Här kan du skicka in tips annonymt om saker i samhället som du anser bör rapporteras. <br/>
        <textarea /> <br/>
        <button>skicka tipset</button> */}

            <h2>Nyhetssidan</h2>

            <h4>Get in touch</h4>

            <div className={styles.footerLinks}>
                <div className={styles.footerLinkLeft}>
                    <p>Om oss</p>
                    <p>Hjälp</p>
                    <p>Annonsera</p>
                </div>
                <div className={styles.footerLinkRight}>
                    <p>Kontakta oss</p>
                    <p>Korrigeringar</p>
                    <p>Karriär</p>
                </div>
                <div className={styles.footerLinkMedia}>

                </div>
            </div>

            <p>Adress: Järntorget 1. 413 14, Göteborg.</p>
            <p>Telefonnummer: 12345678910 - Öppettider 10-16 vardagar.</p>
            <p>Mailadress: jacob.klaren@nyhetssida.se</p>




        </footer>
    )
}