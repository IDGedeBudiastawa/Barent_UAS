/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Alert,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  resizeMode,
  Dimensions,
  ImageSlider,
  Modal,
  TouchableWithoutFeedback
} from 'react-native';

import { Container, Header, Content, Button, Icon, Left, Right, Body, Title} from 'native-base';

import {
  SkypeIndicator,
  BarIndicator,
  BallIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  UIActivityIndicator,
  WaveIndicator
} from 'react-native-indicators';

var{width, height}=Dimensions.get('window');

import * as firebase from 'firebase';
  
var config = {
    apiKey: "AIzaSyAZEii7bZXtXiG8eBe2B5jfpQ57OTZ6Noo",
    authDomain: "barent-aa8ea.firebaseapp.com",
    databaseURL: "https://barent-aa8ea.firebaseio.com",
    projectId: "barent-aa8ea",
    storageBucket: "barent-aa8ea.appspot.com",
    messagingSenderId: "1050405465639"
};

const firebaseApp = firebase.initializeApp(config);
  

export default class Login extends Component {
  static navigationOptions = {
      header : null
  };

  constructor(props) {
    super(props);
    this.state = {
    user1: 'Useless placeholder' ,
    password : '',
    email : '',
    animation : false
  };
  }

  login=()=>{
    const { navigate } = this.props.navigation;
    this.setState({
      animation : true
    });
    firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(()=> {
    this.setState({
      animation : false 
    });
      navigate('Home');
      // Sign-out successful.
    }).catch((error)=> {
      Alert.alert( 'Login Error', 'try again by enter the correct password and username')
      //alert("enter the correct password and username")
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    // const resizeMode = 'center';

    return (
      <Content> 
        <Modal animationType = {"fade"} transparent   = {true} visible  = {this.state.animation} onRequestClose ={()=>this.setState({animation : false})}>
          <SkypeIndicator color='white' />
        </Modal> 
        <Image 
          style={styles.container} 
          source={require('./image/log3.jpg')}>
            <Image style={{height:160, width:160, marginTop:40}}
              source={require('./image/logo1.png')}
            />

            <View style={{marginTop:80}}>
              <TextInput
                underlineColorAndroid="transparent"
                placeholder="E-MAIL"
                style={{height: 40, borderColor: 'black', width:250, borderWidth: 1, textAlign:"center", borderRadius:5, marginTop:20}}
                onChangeText={(email) => this.setState({email})}
                value={this.state.email}
              />

              <TextInput
                underlineColorAndroid="transparent"
                placeholder="PASSWORD"
                secureTextEntry={true}
                style={{opacity:60, marginTop:40, height: 40, borderColor: 'black', width:250, borderWidth: 1, textAlign:"center", borderRadius:5, marginTop:10}}
                onChangeText={(password) => this.setState({password})}
                value={this.state.password}
              />

              <TouchableOpacity style={{alignItems:'center'}}
                onPress={()=>this.login()}>
                <View style={{height:40, width:250, backgroundColor:"red", marginTop:20, borderRadius:5}}>
                  <Text style={{color:"white", textAlign:"center", marginTop:10}}>LOGIN</Text>
                </View>
              </TouchableOpacity> 

              <Text style={{marginTop:10, textAlign:'center'}}>Create an Account</Text>

              <TouchableOpacity style={{alignItems:'center'}}
                onPress={()=>navigate('Signup')}>
                <View style={{height:40, width:250, backgroundColor:"blue", borderRadius:5, marginTop:10}}>
                  <Text style={{color:"white", textAlign:"center", marginTop:10}}>SIGN UP</Text>
                    <View style={{position : 'absolute', marginTop : 7, alignSelf : 'center'}}>
                      <SkypeIndicator count={5} color={this.state.animation} size={28}/>
                    </View>
                </View>
              </TouchableOpacity>
            </View>
        </Image>
      </Content>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height,
    resizeMode: 'stretch',
    backgroundColor: 'white',
  },

  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

