import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  AsyncStorage,
  Image,
  StatusBar,
  TextInput,
  Dimensions,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Modal
} from 'react-native';
import * as firebase from 'firebase';
import { StackNavigator } from 'react-navigation';
import { DotIndicator } from 'react-native-indicators';


var{width,height}=Dimensions.get('window');

var config = {
    apiKey: "AIzaSyAZEii7bZXtXiG8eBe2B5jfpQ57OTZ6Noo",
    authDomain: "barent-aa8ea.firebaseapp.com",
    databaseURL: "https://barent-aa8ea.firebaseio.com",
    projectId: "barent-aa8ea",
    storageBucket: "barent-aa8ea.appspot.com",
    messagingSenderId: "1050405465639"
};

const firebaseApp = firebase.initializeApp(config);

export default class SplashScreen extends Component {
  static navigationOptions = {
      header : null
  };
  
  constructor(props){
    super(props);
    this.state =({
      email : '',
      password : '',
    });

    AsyncStorage.multiGet(['email', 'password', 'userId']).then((data) => {
      const { navigate } = this.props.navigation;
          let email = data[0][1];
          // let email = 12;
          let password = data[1][1];
          let userId = data[2][1];

          if(email!=null){
            firebaseApp.auth().signInWithEmailAndPassword(email, password).then(() => {
              navigate('Homelogin');
            }).catch((error) => {
            alert("error " + error.message );
            });
          }
          else{
           navigate('Home');
          }
    });
    
  }

  render() {
  const { navigate } = this.props.navigation;
    return (
      <View style={{alignItems : 'center',backgroundColor : 'black', position : 'absolute', top : 0, left : 0, right : 0, bottom : 0}}>
        
        <View style={{position :"absolute", bottom : height/3, width : width}}>
          <Image style={{height : 200, width : 200, alignSelf : "center"}} source={require('.././image/logo1.png')} />
        </View>

        <View style={{marginTop : 280}}>
          <DotIndicator color='white' size={20} />
        </View>

      </View>
    );
  }
}