import styles from '../Article/ArticleComp.module.css'

export default function EditingArticleFields(props) {
  const {article, handleEdit, handleRadioEdit, sendEdit} = props;
  const {author, categories, dateAdded, id, images, mainText, shortDescription, title, views, dateUpdated} = article;

  return (
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
  )
}
