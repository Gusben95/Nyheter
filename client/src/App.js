import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from "react";
import { Link, Route, Routes } from 'react-router-dom';

function App() {
  const stateMessage = useSelector(state => state.Message)
  const dispatch = useDispatch()

  // let article = {
  //   title: "title",
  //   shortDescription: "shortDescription 1234",
  //   mainText: "mainText",
  //   categorys: ["category 1", "category 2", "category 3"],
  //   author: "author",
  //   images: ["image 1", "image 2", "image 3"]
  // }
  // useEffect(() =>{
  //   PostArticle(article);
  // }, [])

  useEffect(() => {
    fetchData();
    fetchArticles();
    setInterval(fetchData, 600000); // 10 minutes in ms
  }, []);

  function fetchData() {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => dispatch({type: "setMessage", text: data.message}))
  }

  async function fetchArticles() {
    const response = await fetch("/items");
    const data = await response.json();
    console.log(data);
  }

  async function PostArticle(article) {
    const response = await fetch("/postArticle", {
      method: 'POST',
      body: JSON.stringify(article),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log(data);
  }

  return (
    <Routes>
      <Route path="/" element={
        <div className="App">
          <p>{stateMessage ? stateMessage : "Loading..."}</p>
        </div>
      } />

      <Route path="/admin" element={
        <h1>Här ska man kunna lägga till artiklar o sånt kanske</h1>
      } />

      <Route path="*" element={
        <div style={{height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", textAlign: "center", backgroundColor: "#FFFAF1"}}>
          <h1>404</h1>
          <h2>Verkar som att din tidning har blivit borttappad!😭</h2>
          <Link to="/">Gå tillbaka till Startsidan😁</Link>
        </div>
      } />

    </Routes>
  );
}

export default App;
