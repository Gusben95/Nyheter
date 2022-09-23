import { useState } from 'react';
import styles from './ArticleComp.module.css'
import { updateArticle, deleteArticle, incrementViewCount } from '../../dbUtils/articleActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import EditingArticleFields from '../editArticle/EditingArticleFields';

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
    <div className={styles.article} onClick={switchOpened}>
      {props.smallVersion && !opened ? (
        <div className={styles.smallArticle}>
          <h2 className={styles.articleHeader}>{title ? title : ""}</h2>

          <div className={styles.articleContent}>

            <div className={styles.shortDescription}>
              {shortDescParsed ? shortDescParsed : shortDescription}
            </div>
            <div className={styles.imageContainer}>
              <img className={styles.articleImg} src={images ? images[0] : ""} alt={title ? title : ""} loading="lazy" />
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.largeArticle}>
          <div className={styles.imageContainer}>
            <img className={styles.articleImg} src={images ? images[0] : ""} alt={title ? title : ""} loading="lazy" />
          </div>

          <div className={styles.articleContent}>

            <h2 className={styles.articleHeader}>{title ? title : ""}</h2>

            {opened ? (
              <>
              {isEditing ? (
                  <EditingArticleFields article={newEditedArticle} handleEdit={handleEdit} handleRadioEdit={handleRadioEdit} sendEdit={sendEdit} />
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
                        { !stateUser.stillPaying ? (
                          <>
                            <div className={styles.noPayingMainText}>
                              <div className={styles.noPayingMainTextShadow}> </div>
                              {mainTextSliced}
                            </div>
                            <h4 className={styles.subscribeNotif}>Bli medlem idag för endast 2kr/dagen! <Link to="/prenumerera">Prenumerera</Link></h4>
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
      )}
    </div>
  )
}
