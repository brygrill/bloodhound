// @flow
// https://snack.expo.io/@bgrill/react-native-login-form
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';

export default class App extends React.Component {
  state = {
    user: null,
    password: null,
    error: false,
  };

  submitCredintials = () => {
    this.props.fire
      .auth()
      .signInWithEmailAndPassword(this.state.user, this.state.password)
      .catch(error => {
        this.setState({ error });
      });
    this.setState({ user: null, password: null });
  };

  props: {
    fire: Object,
  };

  render() {
    return (
      <View style={styles.container}>
        <Text h1>Login</Text>
        <FormLabel>Email</FormLabel>
        <FormInput
          value={this.state.user}
          onChangeText={user => this.setState({ user })}
          keyboardType="email-address"
        />
        <FormLabel>Password</FormLabel>
        <FormInput
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
          secureTextEntry
        />
        <Button title="Submit" onPress={this.submitCredintials} />
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
    padding: 10,
  },
});
