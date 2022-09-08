import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from "react";
import { Link, Route, Routes } from 'react-router-dom';
import Homepage from './views/Homepage/Homepage';
import Admin from './views/Admin/Admin';
import Contact from './views/Contact/Contact';
import Navbar from './components/Navbar/Navbar';
import Login from './views/Login/Login';
import Subscribe from './views/Subscribe/Subscribe';

function App() {
  const dispatch = useDispatch()

  // let article = {
  //   title: "title",
  //   shortDescription: "shortDescription 1234",
  //   mainText: "mainText",
  //   categories: ["category 1", "category 2", "category 3"],
  //   author: "author",
  //   images: ["image 1", "image 2", "image 3"]
  // }
  // useEffect(() =>{
  //   postArticle(article);
  // }, [])

  let thisCatagory = {category: "sport"};

  useEffect(() => {
    fetchArticlesByCategory(thisCatagory)
    fetchArticles();
    setInterval(fetchArticles, 600000); // 10 minutes in ms
  }, []);

  // function fetchData() {
  //   fetch("/api")
  //     .then((res) => res.json())
  //     .then((data) => dispatch({type: "setMessage", text: data.message}))
  // }

  // fetches all articles
  async function fetchArticles() {
    const response = await fetch("/allArticles");
    const data = await response.json();
    console.log(data);
  }

  // post a article
  async function postArticle(article) {
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

  async function fetchArticlesByCategory(category) {
    console.log(category)
    const response = await fetch("/articlesByCategory", {
      method: 'POST',
      body: JSON.stringify(category),
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
        [<Homepage key="1" />, <Navbar key="2" />]
      } />

      <Route path="/kategori/:category" element={
        [<Homepage key="1" />, <Navbar key="2" />]
      } />

      <Route path="/admin" element={
        [<Admin key="1" />, <Navbar key="2" />]
      } />

      <Route path="/kontakt" element={
        [<Contact key="1" />, <Navbar key="2" />]
      } />

      <Route path="/login" element={
        [<Login key="1" />, <Navbar key="2" />]
      } />

      <Route path="/prenumerera" element={
        [<Subscribe key="1" />, <Navbar key="2" />]
      } />

      <Route path="*" element={
        [<div key="1" style={{height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", textAlign: "center", backgroundColor: "#FFFAF1"}}>
          <h1>404</h1>
          <h2>Verkar som att din tidning har blivit borttappad!😭</h2>
          <Link to="/">Gå tillbaka till Startsidan😁</Link>
        </div>, <Navbar key="2" />]
      } />

    </Routes>
  );
}

export default App;
