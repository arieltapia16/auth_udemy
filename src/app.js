import React, { Component } from 'react';
import firebase from 'firebase';
import { View } from 'react-native';
import { Header, Button, CardSection, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
    state ={ loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBIuEokB78-bYeEJZZQwLgeG8Kg9vAXZjc',
      authDomain: 'auth-6ec33.firebaseapp.com',
      databaseURL: 'https://auth-6ec33.firebaseio.com',
      projectId: 'auth-6ec33',
      storageBucket: 'auth-6ec33.appspot.com',
      messagingSenderId: '96378818547'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <CardSection>
            <Button onPress={() => firebase.auth().signOut()}>
              Log Out
            </Button>
          </CardSection>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner />;
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
