import React, { Suspense } from 'react';
import Header from './Header';
import Footer from './Footer';

function App() {

  return (
    <Suspense fallback="Loading...">
      <Header></Header>
      <Footer></Footer>
    </Suspense>
  );
}

export default App;
