import React from 'react';

import Header from './header/Header';
import Footer from './footer/Footer';

import './styling/Reset.scss';
import './styling/Theme.scss';
import './styling/Grid.scss';
import './styling/Forms.scss';
import './styling/InlineFlexibleList.scss';
import './styling/UtilityClasses.scss';
import './App.scss';

import { Route, Switch } from 'react-router-dom';
import Mountains from '../../pages/public/areas/Areas';
import Mountain from '../../pages/public/area/Area';
import Trail from '../../pages/public/trail/Trail';
import Register from '../../pages/auth/Register';
import { AuthContext, initialState } from '../core/auth-context/AuthContext';
import AdminDashboard from '../../pages/Admin/Dashboard';

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

                        <Route path="/admin">
                            <AdminDashboard />
                        </Route>
                    </Switch>
                </main>
                <Footer></Footer>
            </div>
        </AuthContext.Provider>
    );
}

export default App;
