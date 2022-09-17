import { useState } from 'react';
import styles from './ArticleComp.module.css'
import { updateArticle, deleteArticle, incrementViewCount } from '../../dbUtils/articleActions';
import { useDispatch } from 'react-redux';

export default function ArticleComp(props) {
  var parse = require('html-react-parser');
  let {author, categories, dateAdded, id, images, mainText, shortDescription, title, views} = props.article;
  
  const [isEditing, setIsEditing] = useState(false);
  const [opened, setOpened] = useState(false);
  const [viewCounted, setViewCounted] = useState(false);
  const dispatch = useDispatch();

  const newEditedArticle = {
    title: title,
    shortDescription: shortDescription,
    mainText: mainText,
    images: images,
    categories: categories,
    author: author,
    dateAdded: dateAdded,
    views: views,
    id: id
  }


  function switchOpened(){
    if(!viewCounted && !opened) {
      setViewCounted(true);
      dispatch({type: "incrementViewCount", data: id});
      incrementViewCount({id: id});
    }

    if(opened) {
      setIsEditing(false);
    }
    
    setOpened(!opened);
  }

  function switchEditing(){
    setIsEditing(!isEditing);
  }

  function handleEdit(e) {
    newEditedArticle[e.target.name] = e.target.value;
  }

  function sendEdit() {
    updateArticle(newEditedArticle);
    dispatch({type: "editArticle", data: newEditedArticle});
    switchEditing();
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
          {isEditing ? (
              <div className={styles.editingContainer} onClick={(e)=> { e.stopPropagation() }}>
                <input type="text" name="title" defaultValue={title} onChange={handleEdit} />
                <input type="text" name="shortDescription" defaultValue={shortDescription} onChange={handleEdit} />
                <textarea type="text" name="mainText" defaultValue={mainText} onChange={handleEdit} />
                <input type="text" name="images" defaultValue={images} onChange={handleEdit} />
                <div onChange={handleEdit}>
                  <label htmlFor="inrikes">Inrikes</label>
                  <input id="inrikes" type="radio" name="categories" value="inrikes" /> 
                  <label htmlFor="utrikes">Utrikes</label>
                  <input id="utrikes" type="radio" name="categories" value="utrikes" /> 
                  <label htmlFor="sport">Sport</label>
                  <input id="sport" type="radio" name="categories" value="sport" /> 
                </div>
                <input type="text" name="author" defaultValue={author} onChange={handleEdit} />
                <input type="text" name="dateAdded" defaultValue={dateAdded} onChange={handleEdit} />
                <input type="text" name="views" defaultValue={views} onChange={handleEdit} />
                <input type="text" name="id" defaultValue={id} onChange={handleEdit} />

                <button onClick={sendEdit}>Save</button>
              </div>
            ) : (
              <>
                <div className={styles.adminButtons}>
                  <button className={styles.editArticleBtn} onClick={(e)=> {
                    e.stopPropagation();
                    switchEditing();
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
            )}
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