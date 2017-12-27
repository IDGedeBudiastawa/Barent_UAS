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
  Dimensions
} from 'react-native';

var{width, height}=Dimensions.get('window');

import DatePicker from 'react-native-datepicker';

export default class homeuser extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      user1: 'Useless placeholder',
    };
    
  }

  render() {
    return (
      <Image 
          style={styles.container} 
          source={require('./image/masuk.png')}>
      </Image>
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

