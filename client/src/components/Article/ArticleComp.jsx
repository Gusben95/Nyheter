import { useState } from 'react';
import styles from './ArticleComp.module.css'
import { deleteArticle } from '../../dbUtils/articleActions';
import { useDispatch } from 'react-redux';

export default function ArticleComp(props) {
  var parse = require('html-react-parser');
  let {author, categories, dateAdded, id, images, mainText, shortDescription, title, views} = props.article;

  const [opened, setOpened] = useState(false);
  const [viewCounted, setViewCounted] = useState(false);
  const dispatch = useDispatch();

  function switchOpened(){
    if(!viewCounted && !opened) {
      setViewCounted(true);
      dispatch({type: "incrementViewCount", data: id});
      // updateViews({id: id});
    }
    
    setOpened(!opened);
  }

  // This is to explain what the parent div should have as className
  let containerClass;
  // If the container is opened (big or small version), the opened article should show a big picture :)
  if(opened) {
    containerClass = styles.article
  } else if(props.smallVersion) {
    // If artile is smallversion and not opened, show it as is :)
    containerClass = styles.smallArticle
  } else {
    // If article is small and not opened, show it as normal
    containerClass = styles.article;
  }

  let categoriesMapped = categories.map((category, index) => {
    return <div className={styles.articleTag} key={index}>{category}</div>
  })

  // Format dateAdded into actual time, not just string code
  let dateFormatted = new Date(dateAdded)
  dateFormatted = dateFormatted.toLocaleDateString();

  // Format code in mainText and shortDescription into actual code
  let mainTextParsed = parse(mainText)
  let shortDescParsed = parse(shortDescription)

  return (
    <div className={containerClass} onClick={switchOpened}>
      <div className={styles.imageContainer}>
        <img className={styles.articleImg} src={images ? images[0] : ""} alt={title ? title : ""} />
      </div>

      <div className={styles.articleContent}>

        <h2 className={styles.articleHeader}>{title ? title : ""}</h2>
        
        {opened ? (
          <>
            <div className={styles.adminButtons}>
              <button className={styles.editArticleBtn} onClick={() => {
                /* editArticle({id: id}) */
/*                 dispatch({type:"editArticle", data: id}) */
              }}>✏️</button>
              <button className={styles.deleteArticleBtn} onClick={() => {
                // eslint-disable-next-line no-restricted-globals
                if(confirm("Are you sure you want to delte this article?")) {
                  deleteArticle({id: id})
                  dispatch({type:"deleteArticle", data: id})
                }
              }}>🗑</button>
            </div>
            <div className={styles.mainText}>
              {mainTextParsed ? mainTextParsed : mainText}
            </div>
            <p>Written by: {author}</p>
            <p>Written {dateFormatted}</p>

            <h4>Visat {views === 1 ? views + " gång" : views + " gånger"}</h4>
          </>
        ) : (
          <div className={styles.shortDescription}>
            {shortDescParsed ? shortDescParsed : shortDescription}
          </div>
        )}

        <div className={styles.articleTags}>
          {categoriesMapped}
        </div>
      </div>
    </div>
  )
}