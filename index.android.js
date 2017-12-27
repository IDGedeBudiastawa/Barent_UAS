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
  View,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';

import { StackNavigator } from 'react-navigation';

import Splash from './js/splash';
import Home from './js/home';
import Login from './js/login';
import Signup from './js/Signup';
import Tes from './js/tes';
import Kelola from './js/kelola';
import Epro from './js/editprofil';
import Sarana from './js/sarana';
import Daftar from './js/daftar';
import Homelogin from './js/homelogin';
import Viewup from './js/viewup';
import Viewsar from './js/viewsar';

// import Masuk from './masuk'; 


export default class BARENT extends Component {
  static navigationOptions = {
      header : null
  };

  constructor(props){
    super(props);
  }

  render() {
     const { navigation } = this.props;
     const { navigate } = this.props.navigation;
    return (
    <View style={{height: height, width: null, backgroundColor:"green", flex:1, alignItems:'center', justifyContent:'center'}}>
       <Splash navigation={navigation}/>
    </View>
     
    );
  }
}

const BARENTNavigation = StackNavigator({
  Splash : {screen : Splash},
  Home : {screen : Home},
  Login : {screen : Login},
  Signup : {screen : Signup},
  Tes : {screen : Tes},
  Kelola : {screen : Kelola},
  Epro : {screen :Epro},
  Sarana : {screen : Sarana},
  Daftar : {screen : Daftar},
  Homelogin : {screen : Homelogin},
  Viewup : {screen : Viewup},
  Viewsar : {screen : Viewsar}
  // Masuk : {screen : Masuk}
});

AppRegistry.registerComponent('BARENT', () => BARENTNavigation);