import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/homepage/homepage';
import ShopPage from './pages/shop/shop';
import SignInSignUpPage from './pages/sign-in-sign-up/sign-in-sign-up';
import Header from './components/header/header';
import { auth, createUserProfileDocument } from './firebase/firebase-utils';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: null
    };
  }
  unsubscribeFromAuth = null;


  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapshot => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          }, () => {
            console.log(this.state);
          });
        });
      } else {
        this.setState({ currentUser: userAuth });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
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
