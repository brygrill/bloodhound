// @flow
import React from 'react';
import { View } from 'react-native';
import { Location, Permissions } from 'expo';

import fire from '../firebase';

const db = fire.database();
const ref = db.ref('users');

export default class GetLocation extends React.Component {
  state = {};

  componentDidMount() {
    if (this.props.trackingOn) {
      setInterval(() => {
        this.getLocation(this.props.uid);
      }, 1000);
    }
  }

  getLocation = async uid => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({ error: true });
    }

    const location = await Location.getCurrentPositionAsync({});
    console.log(location);
    ref.child(uid).update({ location });
    this.setState({ location });
  };

  props: {
    trackingOn: Boolean,
    uid: string,
  };

  render() {
    return <View />;
  }
}
