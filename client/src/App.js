import { useSelector, useDispatch } from 'react-redux'
import {useEffect } from "react";
import { Link, Route, Routes } from 'react-router-dom';

function App() {
  const stateMessage = useSelector(state => state.Message)
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
