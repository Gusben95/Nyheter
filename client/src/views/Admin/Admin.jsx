import { fetchArticles, postArticle, fetchArticleAndSendToDatabase } from '../../dbUtils/articleActions';
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'

import styles from './Admin.module.css'
import { useNavigate } from 'react-router-dom';
import ArticleComp from '../../components/Article/ArticleComp';
import { getAccountWithToken } from '../../dbUtils/accountActions';
import Header from '../../components/Header/Header';


export default function Admin() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const stateArticles = useSelector(state => state.Articles)
  const stateUser = useSelector(state => state.User)

  const [newArticle, setNewArticle] = useState({
    title: "",
    shortDescription: "",
    mainText: "",
    categories: [],
    author: "",
    images: []
  })

  useEffect(() => {
    const sessionToken = sessionStorage.getItem("token");
    if (sessionToken !== null || sessionToken === "") {
      let account = {
        token: sessionToken
      }
      const featchToken = async () => {
        let accountInfo = await getAccountWithToken(account);
        if (accountInfo !== []) {
          dispatch({type: "setUser", data: accountInfo});
        } else if(accountInfo.role !== "admin") {
          alert("Du måste vara admin för att komma åt denna sida");
          navigate('/');
        }
      }
      featchToken().catch(console.error);
    }


  }, [stateUser])

  useEffect(() => {
  }, [newArticle])

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
    let newArticleCopy = {...newArticle};
    newArticleCopy[e.target.name] = e.target.value;
    setNewArticle(newArticleCopy);
  }

  function handleImageEdit(e) {
    let newArticleCopy = {...newArticle};
    newArticleCopy.images = [e.target.value];
    setNewArticle(newArticleCopy);
  }

  function handleRadioEdit(e) {
    // we get here when one of the checkboxes is checked or unchecked
    // we need to update the categories array in the newEditedArticle object
    // add all categories that are in the article
    let newArticleCopy = {...newArticle};

    let newCategories = newArticleCopy.categories;
    // if the checkbox is checked, add it to the newCategories array
    if(e.target.checked) {
      newCategories.push(String(e.target.value));
    }
    // if the checkbox is unchecked, remove it from the newCategories array
    else {
      newCategories = newArticleCopy.categories.filter(category => category !== String(e.target.value));
    }
    // update the newEditedArticle object
    newArticleCopy.categories = newCategories;
    setNewArticle(newArticleCopy);
  }

  async function sendArticle() {
    let response = await postArticle(newArticle);
    if(response === "Success") {
      dispatch({type:"addArticle", data: newArticle});
      alert("Artikeln har skapats");
      window.location.reload();
    } else {
      alert("Något gick fel");
    }
  }

  return (
    
    <div className={styles.adminpage}>

<Header/>

      <div className={styles.addArticle}>
        <h2>Lägg till artikel:</h2>

        <label className={styles.editingLabel}>Titel</label>
        <input type="text" name="title" onChange={handleEdit}  className={styles.editingInput} style={newArticle.title !== "" ? {border: "1px solid #600f0c"} : {}}/>
        <label className={styles.editingLabel}>Kort beskrivning</label>
        <input type="text" name="shortDescription" onChange={handleEdit}  className={styles.editingInput} style={newArticle.shortDescription !== "" ? {border: "1px solid #600f0c"} : {}}/>
        <label className={styles.editingLabel}>Brödtext</label>
        <textarea type="text" name="mainText" onChange={handleEdit}  className={styles.editingInput} style={newArticle.mainText !== "" ? {border: "1px solid #600f0c"} : {}}/>
        <label className={styles.editingLabel}>Bilder</label>
        <input type="text" name="images" onChange={handleImageEdit}className={styles.editingInput} style={newArticle.images!== "" ? {border: "1px solid #600f0c"} : {}} />
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
        <input type="text" name="author" onChange={handleEdit}className={styles.editingInput} />

        <button onClick={sendArticle}className={styles.saveButton}>Spara</button>
      </div>

      <h2 style={{textAlign: "center"}}>Live exempel av hur artikeln kommer se ut:</h2>
      <ArticleComp article={newArticle} />

      <div style={{display: "flex", justifyContent: "center"}}>
        <button onClick={createFakeArticle} className={styles.addRandomArticleBtn}>Lägg till en färdig random artikel</button>
      </div>
    </div>
  )
}
