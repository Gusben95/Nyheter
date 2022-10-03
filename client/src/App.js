import { Link, Route, Routes } from 'react-router-dom';
import Homepage from './views/Homepage/Homepage';
import Admin from './views/Admin/Admin';
import Navbar from './components/Navbar/Navbar';
import Login from './views/Login/Login';
import Subscribe from './views/Subscribe/Subscribe';
import Search from './views/Search/Search'
import Footer from './components/Footer/Footer';
/* import Comingsoon from './components/Footer/Footer.module.css'; */
import Comingsoon from './views/Comingsoon/Comingsoon';
import { getAccountWithToken } from './dbUtils/accountActions';

import { useDispatch } from 'react-redux';
import { fetchArticles } from './dbUtils/articleActions';
import { useEffect } from 'react';
import Header from './components/Header/Header';

function App() {
  const dispatch = useDispatch();

  // Since we want articles to be fetched on load,
  // just load them directly when we load the page

  //this load get overwritten by homepage later, but this helps other pages who need articles
  useEffect(() => {
    fetchArticles().then(articles =>{
      articles.sort(function compare(a, b) {
        var dateA = new Date(a.dateAdded);
        var dateB = new Date(b.dateAdded);
        return dateB - dateA;
      });
  
      dispatch({type:"setArticles", data: articles});
    })
  }, []);

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
        }
      }
      featchToken().catch(console.error);
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={
        [<Homepage key="1" />, <Navbar key="2" />, <Footer key="3" />]
      } />
      
      <Route path="/mestPopulara" element={
        [<Homepage mostPopular key="1" />, <Navbar key="2" />, <Footer key="3" />]
      } />

      <Route path="/kategori/:category" element={
        [<Homepage key="1" />, <Navbar key="2" />, <Footer key="3" />]
      } />

      <Route path="/admin" element={
        [<Admin key="1" />, <Navbar key="2" hideSubscribe />, <Footer key="3" />]
      } />

      <Route path="/search/:query" element={
        [<Search key="1" />, <Navbar key="2" />, <Footer key="3" />]
      } />

      <Route path="/login" element={
        [<Login key="1" />, <Navbar key="2" />, <Footer key="3" />]
      } />

      <Route path="/prenumerera" element={
        [<Subscribe key="1" />, <Navbar key="2" hideSubscribe/>, <Footer key="3" />]
      } />

      <Route path="/kommersnart" element={
        [<Comingsoon key="1" />, <Navbar key="2" hideSubscribe />, <Footer key="3" />]
      } />

      <Route path="*" element={
        [<div key="1" style={{height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", textAlign: "center", backgroundColor: "#F5F5F5"}}>
          <Header></Header> 
          <h1>404</h1>
          <h2>Verkar som att din tidning har blivit borttappad!😭</h2>
          <h3><Link to="/">Gå tillbaka till Startsidan😁</Link></h3>
        </div>, <Navbar key="2" hideSubscribe/>]
      } />

    </Routes>
  );
}

export default App;
