// @flow
import React from 'react';
import { View } from 'react-native';
import { Location, Permissions } from 'expo';

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
    this.props.ref.child(uid).update({ location });
    this.setState({ location });
  };

  props: {
    trackingOn: Boolean,
    uid: string,
    ref: Object,
  };

  render() {
    return <View />;
  }
}
