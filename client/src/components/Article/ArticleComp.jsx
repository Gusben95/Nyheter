import styles from './ArticleComp.module.css'

export default function ArticleComp(props) {
  let {title, mainText, images} = props.article;

  return (
    <div className={styles.article}>
      <img className={styles.articleImg} src={images ? images[0] : ""} alt={title ? title : ""} />

      <h2 className={styles.articleHeader}>{title ? title : ""}</h2>
      
      <p className={styles.mainText}>
        {mainText ? mainText : ""}
      </p>
    </div>
  )
}