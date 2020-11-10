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
import Register from '../../pages/auth/Register';
import { AuthContext, initialState } from '../core/auth-context/AuthContext';

function App() {
    return (
        <AuthContext.Provider value={initialState}>
            <div className="staze-hr">
                <Header></Header>
                <main>
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

                        <Route path="/register">
                            <Register />
                        </Route>
                    </Switch>
                </main>
                <Footer></Footer>
            </div>
        </AuthContext.Provider>
    );
}

export default App;
