import { fetchArticles, postArticle, fetchArticleAndSendToDatabase } from '../../dbUtils/articleActions';
import { createAccount } from '../../dbUtils/accountActions';
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

import styles from './Admin.module.css'
import { useNavigate } from 'react-router-dom';


export default function Admin() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const stateArticles = useSelector(state => state.Articles)
  const stateUser = useSelector(state => state.User)

  useEffect(() => {
    if(stateUser?.role !== "admin") {
      alert("Du måste vara admin för att komma åt denna sida");
      navigate('/');
    }
  }, [stateUser])

  let newArticle = {
    title: "",
    shortDescription: "",
    mainText: "",
    categories: [],
    author: "",
    images: []
  }

  useEffect(() => {
    fetchArticles().then(articles =>{
      dispatch({type:"setArticles", data: articles});
    })
  }, [])

  async function createFakeArticle() {
    let newFakeArticle = await fetchArticleAndSendToDatabase(stateArticles)
    if(newFakeArticle) {
      postArticle(newFakeArticle)
      dispatch({type:"addArticle", data: newFakeArticle});
    }
  }

  function handleEdit(e) {
    newArticle[e.target.name] = e.target.value;
  }

  function handleImageEdit(e) {
    newArticle.images = [e.target.value];
    console.log(newArticle.images);
  }

  function handleRadioEdit(e) {
    // we get here when one of the checkboxes is checked or unchecked
    // we need to update the categories array in the newEditedArticle object
    // add all categories that are in the article
    let newCategories = newArticle.categories;
    // if the checkbox is checked, add it to the newCategories array
    if(e.target.checked) {
      newCategories.push(String(e.target.value));
    }
    // if the checkbox is unchecked, remove it from the newCategories array
    else {
      newCategories = newArticle.categories.filter(category => category !== String(e.target.value));
    }
    // update the newEditedArticle object
    newArticle.categories = newCategories;
  }

  function sendArticle() {
    postArticle(newArticle);
    dispatch({type: "addArticle", data: newArticle});
  }

  return (
    <div className={styles.adminpage}>

      <div className={styles.addArticle}>
        <h2>Lägg till artikel:</h2>

        <label className={styles.editingLabel}>Titel</label>
        <input type="text" name="title" onChange={handleEdit} />
        <label className={styles.editingLabel}>Kort beskrivning</label>
        <input type="text" name="shortDescription" onChange={handleEdit} />
        <label className={styles.editingLabel}>Brödtext</label>
        <textarea type="text" name="mainText" onChange={handleEdit} />
        <label className={styles.editingLabel}>Bilder</label>
        <input type="text" name="images" onChange={handleImageEdit} />
        <label className={styles.editingLabel}>Kategorier</label>
        <div>
          <label htmlFor="inrikes">Inrikes</label>
          <input id="inrikes" type="checkbox"  onChange={handleRadioEdit} value="inrikes" />
          <label htmlFor="utrikes">Utrikes</label>
          <input id="utrikes" type="checkbox"  onChange={handleRadioEdit} value="utrikes" />
          <label htmlFor="sport">Sport</label>
          <input id="sport" type="checkbox"  onChange={handleRadioEdit} value="sport" />
        </div>
        <label className={styles.editingLabel}>Skribent</label>
        <input type="text" name="author" onChange={handleEdit} />

        <button onClick={sendArticle}>Spara</button>
      </div>

      <button onClick={createFakeArticle}>Post article</button>
    </div>
  )
}
