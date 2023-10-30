import React, {Suspense} from 'react';
import './App.css';
import {Routes, Route} from "react-router-dom";
import Layout from "./layout";
import Home from "./pages/Home";
import LayoutSetting from "./layout/LayoutSetting";
import ConversationScriptPage from "./pages/ConversationScriptPage";
import {Spin} from "antd";
import PageLoading from "./components/shared/PageLoading";

function App() {
  const Home = React.lazy(() => import('./pages/Home'));
  const ConversationScriptPage = React.lazy(() => import('./pages/ConversationScriptPage'));

  return (
    <div className={'App'}>
      <Routes>
        <Route element={<Layout />}>
          <Route path={'/'} element={
            <Suspense fallback={<PageLoading/>}>
              <Home/>
            </Suspense>
          }/>

          <Route path={'setting'} element={<LayoutSetting/>}>
            <Route path={'conversation-script'} element={
              <Suspense fallback={<PageLoading/>}>
                <ConversationScriptPage/>
              </Suspense>
            }/>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
