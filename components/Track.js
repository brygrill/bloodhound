// @flow
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Location, Permissions } from 'expo';

import GetLocation from './Location';
import fire from '../firebase';

const db = fire.database();
const ref = db.ref('users');

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
    ref.child(uid).update({ location });
    this.setState({ location });
  };

  logLocation = coords => {
    console.log('Getting Location!');
    console.log(coords);
    ref.child(this.props.uid).update({ location: coords });
    this.setState({ location: coords });
  };

  // watchLocation = async uid => {
  //   const { status } = await Permissions.askAsync(Permissions.LOCATION);
  //   if (status) {
  //     this.setState({ trackingAllowed: true });
  //   }

  //   const location = await Location.watchPositionAsync(
  //     { timeInterval: 1000 },
  //     coords => {
  //       console.log(coords);
  //       ref.child(uid).update({ location: coords });
  //       this.setState({ location: coords });
  //     },
  //   );
  // };

  props: {
    uid: string,
  };

  render() {
    return (
      <View style={styles.container}>
        <Text h1>Tracking Location...</Text>
        <GetLocation
          trackingOn={this.state.trackingOn}
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
