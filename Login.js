'use strict';

import React, { Component } from 'react';
import { Text, StyleSheet, View, Image, TextInput,
TouchableHighlight } from 'react-native';

export default class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('image!Octocat')} />
        <Text style={styles.heading}>
          GitHub Browser
        </Text>
        <TextInput style={styles.input}
          placeholder="Github username" />
        <TextInput style={styles.input}
          placeholder="Github password"
          secureTextEntry={true} />
          <TouchableHighlight style={styles.button}>
            <Text style={styles.buttonText}>Log in</Text>
          </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop: 40,
    padding: 10
  },
  logo: {
    width: 66,
    height: 55
  },
  heading: {
    fontSize: 30,
    margin: 10
  },
  input: {
    height: 50,
    marginTop: 10,
    padding: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48bbec'
  },
  button: {
    height: 50,
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    marginTop: 10,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center',
  }
});
