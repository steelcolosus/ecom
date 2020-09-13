import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import './App.css';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { connect } from 'react-redux';
import { setCurrentUser } from "./redux/user/user.actions";

import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from "./pages/checkout/checkout.component";

const App = (props) => {

  const { setCurrentUser, currentUser } = props;

  useEffect(() => {
    const unsuscribeFromAuth = auth.onAuthStateChanged(async userAuth => {

      if (userAuth) {

        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          })
        })

      } else {

        setCurrentUser(userAuth)

      }
    })
    return () => {
      unsuscribeFromAuth();
    }
  }, []);


  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />∏
        <Route path='/shop' component={ShopPage} />
        <Route exact path='/checkout' component={CheckoutPage} />
        <Route path='/signin'
          render={() => currentUser ? (<Redirect to='/' />) : (<SignInAndSignUpPage />)}
        />
      </Switch>
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
