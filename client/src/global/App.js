import React, { Suspense } from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';

import './App.scss';
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import MountainTrails from '../pages/MountainTrails';

function App() {

  return (
    <Suspense fallback="Loading...">
      <Header></Header>
      <main className="ui--Main">
        <BrowserRouter>
          <Switch>
              <Route path="/mountain/:mountain" children={ <MountainTrails /> }></Route>
          </Switch>
        </BrowserRouter>
      </main>
      <Footer></Footer>
    </Suspense>
  );
}

export default App;
