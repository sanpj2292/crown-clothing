import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/homepage/homepage';
import ShopPage from './pages/shop/shop';

function App() {
  return (
    <div>
      <Switch>
        <Route exact component={HomePage} path='/' />
        <Route exact component={ShopPage} path='/shop/' />
      </Switch>
    </div>
  );
}

export default App;
