import React, { Suspense } from 'react';
import Header from './Header';

function App() {

  return (
    <Suspense fallback="Loading...">
      <Header></Header>

    </Suspense>
  );
}

export default App;
