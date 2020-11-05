import React from 'react';

import Header from './header/Header';
import Footer from './footer/Footer';

import './Reset.scss';
import './Theme.scss';
import './App.scss';
import { Route, Switch } from 'react-router-dom';
import Mountains from '../../pages/Mountains';
import Mountain from '../../pages/Mountain';

function App() {
    return (
        <div className="App">
            <Header></Header>
            <Switch>
                <Route path="/mountains">
                    <Mountains />
                </Route>

                <Route path="/mountain/:mountain">
                    <Mountain />
                </Route>
            </Switch>
            <Footer></Footer>
        </div>
    );
}

export default App;
