// @flow
import React from 'react';

import Track from './Track';
import Login from './Login';

export default class App extends React.Component {
  state = {
    loading: true,
    authed: false,
    ref: null,
    user: {
      uid: null,
    },
  };

  componentDidMount() {
    // Listen for login/logout
    this.listenForAuthChange();
  }

  listenForAuthChange = () => {
    return this.props.fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          loading: false,
          authed: false,
          user: { uid: user.uid },
        });
      } else {
        this.setState({ loading: false, authed: false, user: { uid: null } });
      }
    });
  };

  props: {
    fire: Object,
  };

  render() {
    const { authed, user } = this.state;
    return authed ? (
      <Track uid={user.uid} fire={this.props.fire} />
    ) : (
      <Login fire={this.props.fire} />
    );
  }
}
