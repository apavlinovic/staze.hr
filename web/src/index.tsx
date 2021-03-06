import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import {
    ApolloClient,
    HttpLink,
    ApolloProvider,
    InMemoryCache,
} from '@apollo/client';

import App from './common/app/App';
import reportWebVitals from './common/core/monitoring/reportWebVitals';
import './common/core/i18n/setupTranslations';

const graphqlClient = new ApolloClient({
    link: new HttpLink({
        uri: 'http://localhost:4000/graphql',
    }),
    cache: new InMemoryCache(),
});

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={graphqlClient}>
            <Suspense fallback="Loading...">
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Suspense>
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
