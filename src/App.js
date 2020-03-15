import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/homepage/homepage';
import ShopPage from './pages/shop/shop';
import SignInSignUpPage from './pages/sign-in-sign-up/sign-in-sign-up';
import Header from './components/header/header';

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact component={HomePage} path='/' />
        <Route exact component={ShopPage} path='/shop/' />
        <Route exact component={SignInSignUpPage} path='/signin/' />
      </Switch>
    </div>
  );
}

export default App;
