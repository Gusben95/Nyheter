import { useParams } from 'react-router-dom'
import styles from './Search.module.css'

export default function Search() {
  const {query} = useParams();

  return (
    <div className={styles.search}>
      <h1>Search</h1>
      <h2>Searching for: {query}</h2>
    </div>
  )
}