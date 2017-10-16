// @flow
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Location, Permissions } from 'expo';

import GetLocation from './Location';

export default class App extends React.Component {
  state = {
    loading: false,
    error: false,
    trackingOn: true,
    location: null,
  };

  componentDidMount() {
    // this.watchLocation(this.props.uid);
    // Location.watchPositionAsync({}, this.logLocation);
  }

  getLocation = async uid => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({ error: true });
    }

    const location = await Location.getCurrentPositionAsync({});
    this.props.ref.child(uid).update({ location });
    this.setState({ location });
  };

  logLocation = coords => {
    console.log('Getting Location!');
    console.log(coords);
    this.props.ref.child(this.props.uid).update({ location: coords });
    this.setState({ location: coords });
  };

  props: {
    uid: string,
    ref: Object,
  };

  render() {
    return (
      <View style={styles.container}>
        <Text h1>Tracking Location...</Text>
        <GetLocation
          trackingOn={this.state.trackingOn}
          ref={this.props.ref}
          uid={this.props.uid}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
