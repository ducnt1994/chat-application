import React from 'react';
import './App.css';
import {Routes, Route} from "react-router-dom";
import Layout from "./layout";
import Home from "./pages/Home";
import LayoutSetting from "./layout/LayoutSetting";
import ConversationScript from "./pages/ConversationScript";

function App() {

  return (
    <div className={'App'}>
      <Routes>
        <Route element={<Layout />}>
          <Route path={'/'} element={<Home/>}/>
          <Route path={'setting'} element={<LayoutSetting/>}>
            <Route path={'conversation-script'} element={<ConversationScript/>}/>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
