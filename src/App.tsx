import React, {Suspense} from 'react';
import './App.css';
import {Routes, Route} from "react-router-dom";
import Layout from "./layout";
import LayoutSetting from "./layout/LayoutSetting";
import PageLoading from "./components/shared/PageLoading";
import useSocketListener from "./hooks/useSocketListener";
import {useDispatch} from "react-redux";

function App() {
  const Home = React.lazy(() => import('./pages/Home'));
  const ConversationScriptPage = React.lazy(() => import('./pages/ConversationScriptPage'));
  const dispatch = useDispatch()
  useSocketListener(dispatch)
  
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
