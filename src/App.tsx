import React from 'react';
import './App.css';
import {Routes, Route} from "react-router-dom";
import Layout from "./layout";
import Home from "./pages/Home";

function App() {

  return (
    <div className={'App'}>
      <Routes>
        <Route element={<Layout />}>
          <Route path={'/'} element={<Home/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
