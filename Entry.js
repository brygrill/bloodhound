import React from 'react';

import fire from './fire';

import Track from './Track';
import Login from './Login';

export default class App extends React.Component {
  state = {
    loading: true,
    authed: false,
    user: {
      uid: null,
    },
  };

  componentDidMount() {
    this.listenForAuthChange();
  }

  listenForAuthChange = () => {
    return fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          loading: false,
          authed: true,
          user: { uid: user.uid },
        });
      } else {
        this.setState({ loading: false, authed: false, user: { uid: null } });
      }
    });
  };

  render() {
    console.log('Render Entry');
    const { authed, user } = this.state;
    return authed ? <Track uid={user.uid} /> : <Login />;
  }
}
