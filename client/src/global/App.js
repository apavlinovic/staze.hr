import React, { Suspense } from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';

import './App.scss';

function App() {

  return (
    <Suspense fallback="Loading...">
      <Header></Header>
      <main className="ui--Main">
      </main>
      <Footer></Footer>
    </Suspense>
  );
}

export default App;
