//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import io from 'socket.io-client/dist/socket.io';

// create a component
class SignUp extends Component {
  static navigationOptions = {
    headerTitle: 'Sign Up'
  }
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password1: '',
      password2: '',
      pwAlert: '',
      email: ''
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.checkPw = this.checkPw.bind(this);
    this.validate = this.validate.bind(this);
    this.checkPwLength = this.checkPwLength.bind(this);
    socket = io('http://localhost:3000')
  }

  checkPwLength() {
    if (this.state.password1.length < 6) {
      this.setState({
        pwAlert: "Password must be at least 6 characters"
      })
    } else {
      this.setState({
        pwAlert: ""
      })
    }
  }

  checkPw() {
    if (this.state.password1 === this.state.password2) {
      return true
    } else {
      return false
    }
  }

  validate = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(this.state.email) === false) {
      return false;
    }
    else {
      return true
    }
  }

  onSubmit = async () => {
    let pwBool = this.checkPw()
    // if passwords match
    if (pwBool === true) {
      // if password length is less than 6
      if (this.state.password1.length < 6) {
        Alert.alert('Password must be more than 6 characters')
      } else {
        let emailBool = this.validate()
        // if email is in correct format
        if (emailBool === true) {
          let data = { username: this.state.username, password: this.state.password }
          await socket.emit('signup', data)
          socket.on('newUser', (data) => {
            Alert.alert('new user created')
          })
        } else {
          Alert.alert("Need to enter valid Email")
        }
      }
    } else {
      Alert.alert("Passwords must be the same")
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.words}>Username</Text>
          <TextInput
            style={styles.input}
            multiline={false}
            placeholder={`Username`}
            placeholderTextColor="gray"
            allowFontScaling={true}
            clearTextOnFocus={true}
            onChangeText={(value) => this.setState({ username: value })}
            value={this.state.username}
            enablesReturnKeyAutomatically={true}
            autoCorrect={false}
            color='black'
          />
          <Text style={styles.words}>Password</Text>
          <Text style={styles.pwLength}>{this.state.pwAlert}</Text>
          <TextInput
            style={styles.input}
            multiline={false}
            placeholder={`Password`}
            placeholderTextColor="gray"
            allowFontScaling={true}
            clearTextOnFocus={true}
            onChangeText={(value) => {
              this.setState({ password1: value })
              this.checkPwLength()
            }}
            value={this.state.password1}
            enablesReturnKeyAutomatically={true}
            autoCorrect={false}
            color='black'
            secureTextEntry={true}
          />
          <TextInput
            style={styles.input}
            multiline={false}
            placeholder={`Confirm Password`}
            placeholderTextColor="gray"
            allowFontScaling={true}
            clearTextOnFocus={true}
            onChangeText={(value) => this.setState({ password2: value })}
            value={this.state.password2}
            enablesReturnKeyAutomatically={true}
            autoCorrect={false}
            color='black'
            secureTextEntry={true}
          />
          <Text style={styles.words}>Email Address</Text>
          <TextInput
            style={styles.input}
            multiline={false}
            placeholder={`Email Address`}
            placeholderTextColor="gray"
            allowFontScaling={true}
            clearTextOnFocus={true}
            onChangeText={(value) => this.setState({ email: value })}
            value={this.state.email}
            enablesReturnKeyAutomatically={true}
            autoCorrect={false}
            color='black'
            keyboardType='email-address'
          />
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button
              title="Create New Account"
              onPress={() => { this.onSubmit() }}
              color="white"
            />
          </View>
        </View>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  inputContainer: {
    width: '90%',
  },
  input: {
    borderColor: 'darkorange',
    borderWidth: 1,
    margin: 5,
    padding: 10
  },
  words: {
    margin: 5,
    marginTop: 20,
    fontSize: 18,
    color: 'red'
  },
  buttonContainer: {
    margin: 20
  },
  button: {
    margin: 15,
    backgroundColor: "darkorange",
    alignSelf: 'center',
    margin: 3,
    borderRadius: 14,
    padding: 1,
    width: 200
  },
  pwLength: {
    marginLeft: 5
  }
});

//make this component available to the app
export default SignUp;
