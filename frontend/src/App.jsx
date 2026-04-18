import React from 'react';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomePage from './components/HomePage';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <HomePage />
      </main>
      <Footer />
    </div>
  );
}

export default App;
