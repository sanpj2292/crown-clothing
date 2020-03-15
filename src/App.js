import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/homepage/homepage';
import ShopPage from './pages/shop/shop';
import Header from './components/header/header';

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact component={HomePage} path='/' />
        <Route exact component={ShopPage} path='/shop/' />
      </Switch>
    </div>
  );
}

export default App;
