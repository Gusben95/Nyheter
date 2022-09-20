import { Link, Route, Routes } from 'react-router-dom';
import Homepage from './views/Homepage/Homepage';
import Admin from './views/Admin/Admin';
import Navbar from './components/Navbar/Navbar';
import Login from './views/Login/Login';
import Subscribe from './views/Subscribe/Subscribe';
import Search from './views/Search/Search'
import Footer from './components/Footer/Footer';

function App() {
  return (
    <Routes>
      <Route path="/" element={
        [<Homepage key="1" />, <Navbar key="2" />, <Footer key="3" />]
      } />

      <Route path="/kategori/:category" element={
        [<Homepage key="1" />, <Navbar key="2" />, <Footer key="3" />]
      } />

      <Route path="/admin" element={
        [<Admin key="1" />, <Navbar key="2" />, <Footer key="3" />]
      } />

      <Route path="/search/:query" element={
        [<Search key="1" />, <Navbar key="2" />, <Footer key="3" />]
      } />

      <Route path="/login" element={
        [<Login key="1" />, <Navbar key="2" />, <Footer key="3" />]
      } />

      <Route path="/prenumerera" element={
        [<Subscribe key="1" />, <Navbar key="2" />, <Footer key="3" />]
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
