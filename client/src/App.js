import { useDispatch } from 'react-redux'
import {useEffect } from "react";
import { Link, Route, Routes } from 'react-router-dom';
import Homepage from './views/Homepage';
import Admin from './views/Admin';
import Contact from './views/Contact';
import Navbar from './components/Navbar';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    fetchData()
    setInterval(fetchData, 600000) // 10 minutes in ms
  }, []);

  function fetchData() {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => dispatch({type: "setMessage", text: data.message}))
  }

  return (
    <Routes>
      <Route path="/" element={
        [<Homepage key="1" />, <Navbar key="2" />]
      } />

      <Route path="/admin" element={
        [<Admin key="1" />, <Navbar key="2" />]
      } />

      <Route path="/contact" element={
        [<Contact key="1" />, <Navbar key="2" />]
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
