import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/homepage/homepage';
import ShopPage from './pages/shop/shop';
import SignInSignUpPage from './pages/sign-in-sign-up/sign-in-sign-up';
import Header from './components/header/header';
import { auth } from './firebase/firebase-utils';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: ''
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user });
      console.log(user);
    });
  }

  render() {
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
}

export default App;
