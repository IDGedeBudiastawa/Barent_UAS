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
  TouchableOpacity,
  resizeMode,
  Dimensions
} from 'react-native';

var{width, height}=Dimensions.get('window');

import * as firebase from 'firebase';

import ImageSlider from 'react-native-image-slider';

export default class Login extends Component {
  static navigationOptions = {
      header : null
  };

  constructor(props) {
    super(props);
    this.state = {
    user1: 'Useless placeholder' ,
    password : '',
    username : '',
    position: 1,
    interval: null
  };
  }

  create=()=>{
    firebaseApp.auth().createUserWithEmailAndPassword(this.state.username, this.state.password);
  }

    
    // const resizeMode = 'center';

  render() {
    const { navigate } = this.props.navigation;
    const images = [
      {source: require('./image/canang.jpg'), width: 100, height: 100},
      {source: require('./image/indah.jpg'), width: 100, height: 100},
      {source: require('./image/logo.png'), width: 100, height: 100},
    ];
    


    return (
      <Slider
      images={this.state.images}
      loadMoreAfter={hasMoreImages}
      onEnd={() => {
        if (hasMoreImages) {
          this.setState({images: [
            ...this.state.images,
            images[this.state.images.length],
          ]});
        }
      }}
      />;
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

