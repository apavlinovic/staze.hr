import React from 'react';

import Header from './header/Header';
import Footer from './footer/Footer';

import './Reset.scss';
import './Theme.scss';
import './App.scss';
import { Route, Switch } from 'react-router-dom';
import Mountains from '../../pages/Mountains';
import Mountain from '../../pages/Mountain';
import Trail from '../../pages/Trail';

function App() {
    return (
        <div className="App">
            <Header></Header>
            <Switch>
                <Route path="/areas">
                    <Mountains />
                </Route>

                <Route path="/area/:slug">
                    <Mountain />
                </Route>

                <Route path="/trail/:slug">
                    <Trail />
                </Route>
            </Switch>
            <Footer></Footer>
        </div>
    );
}

export default App;
