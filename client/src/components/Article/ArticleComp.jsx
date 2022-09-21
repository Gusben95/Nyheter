import { useState } from 'react';
import styles from './ArticleComp.module.css'
import { updateArticle, deleteArticle, incrementViewCount } from '../../dbUtils/articleActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

export default function ArticleComp(props) {
  var parse = require('html-react-parser');
  let {author, categories, dateAdded, id, images, mainText, shortDescription, title, views, dateUpdated} = props.article;
  
  const stateUser = useSelector(state => state.User);

  const [isEditing, setIsEditing] = useState(false);
  const [opened, setOpened] = useState(false);
  const [viewCounted, setViewCounted] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const newEditedArticle = {
    title: title,
    shortDescription: shortDescription,
    mainText: mainText,
    images: images,
    categories: categories,
    author: author,
    dateAdded: dateAdded,
    dateUpdated: dateUpdated,
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

  function handleRadioEdit(e) {
    // we get here when one of the checkboxes is checked or unchecked
    // we need to update the categories array in the newEditedArticle object
    // add all categories that are in the article
    let newCategories = categories;
    // if the checkbox is checked, add it to the newCategories array
    if(e.target.checked) {
      newCategories.push(String(e.target.value));
    }
    // if the checkbox is unchecked, remove it from the newCategories array 
    else {
      newCategories = newEditedArticle.categories.filter(category => category !== String(e.target.value));
    }
    // update the newEditedArticle object
    newEditedArticle.categories = newCategories;
  }

  function sendEdit() {
    updateArticle(newEditedArticle);
    dispatch({type: "updateArticle", data: newEditedArticle});
    switchEditing();
  }

  // This is to explain what the parent div should have as className
  let containerClass;
  // If the container is opened (big or small version), the opened article should show a big picture :)
  if(opened) {
    containerClass = styles.article;
  } else if(props.smallVersion) {
    // If artile is smallversion and not opened, show it as is :)
    containerClass = styles.smallArticle;
  } else {
    // If article is small and not opened, show it as normal
    containerClass = styles.article;
  }



  let categoriesMapped = categories.map((category, index) => {
    return <div className={styles.articleTag} onClick={()=>{navigate('/Kategori/' + category)}} key={index}>{category}</div>
  })

  // Format dateAdded into actual time, not just string code
  let dateFormatted = "Uppladdad: " + new Date(dateAdded).toLocaleDateString() + " Kl:" + new Date(dateAdded).toLocaleTimeString();
  if(dateUpdated) {
    // If the article has been updated, show the dateUpdated instead
    dateFormatted = "Redigerad: " + new Date(dateUpdated).toLocaleDateString() + " Kl:" + new Date(dateUpdated).toLocaleTimeString();
  }

  // Format code in mainText and shortDescription into actual code
  let mainTextParsed = parse(mainText);
  let shortDescParsed = parse(shortDescription);

  let mainTextSliced = mainText.slice(0, 100) + "...";

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
                <label className={styles.editingLabel}>Titel</label>
                <input type="text" name="title" defaultValue={title} onChange={handleEdit} />
                <label className={styles.editingLabel}>Kort beskrivning</label>
                <input type="text" name="shortDescription" defaultValue={shortDescription} onChange={handleEdit} />
                <label className={styles.editingLabel}>Brödtext</label>
                <textarea type="text" name="mainText" defaultValue={mainText} onChange={handleEdit} />
                <label className={styles.editingLabel}>Bilder</label>
                <input type="text" name="images" defaultValue={images} onChange={handleEdit} />
                <label className={styles.editingLabel}>Kategorier</label>
                <div>
                  <label htmlFor="inrikes">Inrikes</label>
                  <input id="inrikes" type="checkbox"  onChange={handleRadioEdit} value="inrikes" defaultChecked={categories.includes("inrikes")} /> 
                  <label htmlFor="utrikes">Utrikes</label>
                  <input id="utrikes" type="checkbox"  onChange={handleRadioEdit} value="utrikes" defaultChecked={categories.includes("utrikes")} /> 
                  <label htmlFor="sport">Sport</label>
                  <input id="sport" type="checkbox"  onChange={handleRadioEdit} value="sport" defaultChecked={categories.includes("sport")} /> 
                </div>
                <label className={styles.editingLabel}>Skribent</label>
                <input type="text" name="author" defaultValue={author} onChange={handleEdit} />
                <label className={styles.editingLabel}>Views</label>
                <input type="text" name="views" defaultValue={views} onChange={handleEdit} />
                {dateUpdated ? (
                  <>
                    <label className={styles.editingLabel}>Senast uppdaterad</label>
                    <input type="text" name="dateUpdated" defaultValue={dateUpdated} onChange={handleEdit} disabled />
                  </>
                  ) : (
                    <></>
                  )}
                <label className={styles.editingLabel}>Datum skapad (Obs: Artikeln får ett nytt datum som visar när den blir uppdaterad)</label>
                <input type="text" name="dateAdded" defaultValue={dateAdded} onChange={handleEdit} disabled />
                <label className={styles.editingLabel}>Id</label>
                <input type="text" name="id" defaultValue={id} onChange={handleEdit} disabled />

                <button onClick={sendEdit}>Save</button>
              </div>
            ) : (
              <>
                { stateUser.role === "admin" ? (
                  <div className={styles.adminButtons}>
                    <button className={styles.editArticleBtn} onClick={(e)=> {
                      e.stopPropagation();
                      switchEditing();
                    }}>✏️</button>
                    <button className={styles.deleteArticleBtn} onClick={() => {
                      // eslint-disable-next-line no-restricted-globals
                      if(confirm("Are you sure you want to delete this article?")) {
                        deleteArticle({id: id})
                        dispatch({type:"deleteArticle", data: id})
                      }
                    }}>🗑</button>
                  </div>
                ) : ""}
                  <div className={styles.mainText}>
                    { !stateUser.isPaying ? (
                      <>
                        {mainTextSliced}
                        <h4>Du måste vara betalande medlem för att läsa artiklar! <Link to="/prenumerera">Prenumerera</Link></h4>
                      </>
                    ) : (
                      <>
                        {mainTextParsed ? mainTextParsed : mainText}
                      </>
                    )}
                  </div>
                  <p>Skriven av: {author}</p>
                  <p>{dateFormatted}</p>

                  <h4>{views} visningar</h4>
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