// @flow
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { Constants, Location, Permissions } from 'expo';

export default class App extends React.Component {
  state = {
    loading: true,
    error: false,
    tracking: false,
    trackingAllowed: false,
    location: null,
  };

  props: {
    uid: string,
  };

  trackLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status) {
      console.log('Tracking Allowed!');
      this.setState({ trackingAllowed: true });
    }

    const location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  }

  render() {
    console.log(this.state);
    if (this.state.tracking) {
      this.trackLocation();
    } else {
      console.log('Not Tracking');
      if (this.state.location) {
        this.state.location.remove();
      }
    }
    return (
      <View style={styles.container}>
        <CheckBox
          title="Turn On Tracking"
          checked={this.state.tracking}
          onPress={() => this.setState({ tracking: !this.state.tracking })}
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
