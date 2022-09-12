import styles from './ArticleComp.module.css'

export default function ArticleComp(props) {
  let {author, categories, dateAdded, id, images, mainText, shortDescription, title, views} = props.article;

  return (
    <div className={props.smallVersion ? styles.smallArticle : styles.article}>
      <img className={styles.articleImg} src={images ? images[0] : ""} alt={title ? title : ""} />

      <div className={styles.articleContent}>
        <h2 className={styles.articleHeader}>{title ? title : ""}</h2>
        
        <p className={styles.shortDescription}>
          {shortDescription ? shortDescription : ""}
        </p>
      </div>
    </div>
  )
}