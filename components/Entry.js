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

  setFireRef() {
    // Set firebase ref
    const db = this.props.fire.database();
    const ref = db.ref('users');
    this.setState({ ref });
  }

  listenForAuthChange = () => {
    return this.props.fire.auth().onAuthStateChanged(user => {
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

  props: {
    fire: Object,
  };

  render() {
    const { authed, ref, user } = this.state;
    return authed ? (
      <Track uid={user.uid} ref={ref} />
    ) : (
      <Login fire={this.props.fire} />
    );
  }
}
