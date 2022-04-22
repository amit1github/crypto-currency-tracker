import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import HomePage from "./Pages/HomePage"
import CoinPage from './Pages/CoinPage';
import PageNotFound from './Pages/PageNotFound';

//check here if something happens with dark mode
// const useStyles = styled(() => ({
//   App: {
//     backgroundColor: "#14161a",
//     color: "white",
//     minHeight: "100vh",
//   },
// }))

const App = () => {


  return (
    <BrowserRouter>
    <div style={{ backgroundColor: "#14161a", color: "white", minHeight: "100vh" }}>
      <Header/>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/coins/:id' element={<CoinPage/>} />
        <Route path='*' element={<PageNotFound/>} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
