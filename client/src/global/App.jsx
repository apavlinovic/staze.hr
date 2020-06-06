import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import React, { Suspense } from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';

import './App.scss';
import MountainTrails from '../pages/MountainTrails';
import Trail from '../pages/Trail';
import Homepage from '../pages/Homepage';

const cache = new InMemoryCache();
const link = new HttpLink({
    uri: 'http://localhost:4000/',
});

const client = new ApolloClient({
    cache,
    link,
});

function App() {
    return (
        <ApolloProvider client={client}>
            <Suspense fallback="Loading...">
                <BrowserRouter>
                    <Header></Header>
                    <main className="ui--Main">
                        <Switch>
                            <Route
                                path="/mountain/:mountain"
                                children={<MountainTrails />}
                            ></Route>
                            <Route
                                path="/trail/:slug"
                                children={<Trail />}
                            ></Route>
                            <Route path="/" children={<Homepage />}></Route>
                        </Switch>
                    </main>
                    <Footer></Footer>
                </BrowserRouter>
            </Suspense>
        </ApolloProvider>
    );
}

export default App;
