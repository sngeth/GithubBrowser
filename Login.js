'use strict';

import React, { Component } from 'react';
import { Text, StyleSheet, View, Image, TextInput,
TouchableHighlight, ActivityIndicator } from 'react-native';

var buffer = require('buffer')

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showProgress: false,
    }
  }

  onLoginPressed() {
    this.setState({showProgress: true});

    var b = buffer.Buffer(this.state.username +
                          ':' + this.state.password);
    var encodedAuth = b.toString('base64');

    fetch('https://api.github.com/user', {
        headers: {
          'Authorization' : 'Basic ' + encodedAuth
        }
    })
    .then((response) => {
      if(response.status >= 200 && response.status < 300) {
        return response;
      }

      throw {
        badCredentials: response.status == 401,
        unknownError: response.status != 401
      }
    })
    .then((response) => {
      return response.json();
    })
    .then((results) => {
      console.log(results);
      this.setState({success: true})
    })
    .catch((err) => {
      console.log('logon failed: ' + err);
    })
    .finally(() => {
      this.setState({showProgress: false});
    })
  }

  render() {
    var errorCtrl = <View />;

    if(!this.state.success && this.state.badCredentials) {
      errorCtrl = <Text style={styles.error}>
        That username and password combination did not work
      </Text>
    }

    if(!this.state.success && this.state.unknownError) {
      errorCtrl = <Text style={styles.error}>
        We experienced an unexpected issue
      </Text>
    }

    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('image!Octocat')} />
        <Text style={styles.heading}>
          JIRA Coconut
        </Text>
        <TextInput style={styles.input}
          onChangeText={(text)=> this.setState({username: text})}
          placeholder="Github username" />
        <TextInput style={styles.input}
          onChangeText={(text)=> this.setState({password: text})}
          placeholder="Github password"
          secureTextEntry={true} />
          <TouchableHighlight
            onPress={this.onLoginPressed.bind(this)}
            style={styles.button}>
            <Text style={styles.buttonText}>Log in</Text>
          </TouchableHighlight>

          {errorCtrl}

          <ActivityIndicator
            animation={this.state.showProgress}
            size="large"
            style={styles.loader}
            />
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
  },
  loader: {
    marginTop: 20
  },
  error: {
    color: 'red',
    paddingTop: 10
  }
});
