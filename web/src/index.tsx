import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './common/app/App';
import reportWebVitals from './common/monitoring/reportWebVitals';
import './common/i18n/setupTranslations';

ReactDOM.render(
    <React.StrictMode>
        <Suspense fallback="Loading...">
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Suspense>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
