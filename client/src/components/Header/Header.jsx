import logo from '../../Logo.png';
import styles from './Header.module.css';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  function linkToHomepage(){
    navigate('/')
  }

  return (
    <header onClick={linkToHomepage} className={styles.header}>
      <img className={styles.headerImg} src={logo} alt="logo"></img>
    </header>
  )
}