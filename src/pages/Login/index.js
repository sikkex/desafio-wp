import React, { Component } from 'react';

import './styles.css'

import firebase from '../../Firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import estoque from '../../assets/warehouse.png'

export default class Login extends Component {
  state = { isSignedIn: false }
  
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID, 
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      // firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
    })
  }

  render() {
    return <div className="login">
      <img className="estoque" src={estoque} alt= "estoque"/>
      {this.state.isSignedIn ? 
      (this.props.history.push("/dashboard"))
      :
      (
        <StyledFirebaseAuth
          uiConfig={this.uiConfig}
          firebaseAuth={firebase.auth()}
        />
      
    )}
  </div>;
  }
}