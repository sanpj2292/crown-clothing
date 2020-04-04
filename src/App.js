import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import './App.css';
import HomePage from './pages/homepage/homepage';
import ShopPage from './pages/shop/shop';
import SignInSignUpPage from './pages/sign-in-sign-up/sign-in-sign-up';
import CheckoutPage from "./pages/checkout/checkout";

import Header from './components/header/header';
import { auth, createUserProfileDocument, addCollectionDocs } from './firebase/firebase-utils';
import { setCurrentUser } from "./redux/user/user-actions";
import { selectCurrentUser } from "./redux/user/user-selectors";
import { selectCollectionsForPreview } from "./redux/shop/shop-selectors";

class App extends React.Component {

  unsubscribeFromAuth = null;


  componentDidMount() {
    // This setCurrentUser is different from the one imported
    const { setCurrentUser, collectionArray } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapshot => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          });
        });
      } else {
        setCurrentUser(userAuth);
      }
      addCollectionDocs('collections', collectionArray.map(({ title, items }) => ({ title, items })));
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact component={HomePage} path='/' />
          <Route component={ShopPage} path='/shop' />
          <Route exact component={CheckoutPage} path='/checkout' />
          <Route exact path='/signin'
            render={
              () => {
                const { currentUser } = this.props;
                return currentUser ? <Redirect to='/' /> : <SignInSignUpPage />
              }
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  collectionArray: selectCollectionsForPreview
});


const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUser: user => {
      const userAction = setCurrentUser(user); // User Action Object
      return dispatch(userAction);
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);