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
import Trail from '../pages/Trail';
import Homepage from '../pages/Homepage';

function App() {

  return (
    <Suspense fallback="Loading...">
      <BrowserRouter>
        <Header></Header>
        <main className="ui--Main">
            <Switch>
                <Route path="/mountain/:mountain" children={ <MountainTrails /> }></Route>
                <Route path="/trail/:slug" children={ <Trail /> }></Route>
                <Route path="/" children={ <Homepage /> }></Route>
            </Switch>
        </main>
        <Footer></Footer>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
