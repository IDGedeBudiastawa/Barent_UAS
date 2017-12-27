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
  Dimensions,
  TouchableOpacity
} from 'react-native';

var{width, height}=Dimensions.get('window');

import ImageSlider from 'react-native-image-slider';

import DatePicker from 'react-native-datepicker';

import Swiper from 'react-native-swiper';

import Drawer from 'react-native-drawer'

import { Container, Header, Content, Button, Icon, Left, Right, Body, Title} from 'native-base';

import * as firebase from 'firebase';

export default class tes extends Component {  
  static navigationOptions = {
      header : null
  };

  constructor(props) {
    super(props);
    this.state = { 
      email : '',
      password : '',
      position: 2,
      interval: null,
      user1: 'Useless placeholder',
      date:"2017-09-27"
    };
    
  }



  // create=()=>{
  //   alert("halo")
  //   firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);
  //   // const { navigate } = this.props.navigation;
  //   // firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
  //   // .then(()=> {
  //   //   alert("sucess");
  //   //   // navigate('Homeuser');
  //   //   // Sign-out successful.
  //   // }).catch((error)=> {
  //   //   alert("Email atau Password Tidak Sesuai ! ")
  //   //   // Handle Errors here.
  //   //   var errorCode = error.code;
  //   //   var errorMessage = error.message;
  //   //   // ...
  //   // });
  // }

      componentWillMount() {
          this.setState({interval: setInterval(() => {
              this.setState({position: this.state.position === 2 ? 0 : this.state.position + 1});
          }, 2000)});
      }

      componentWillUnmount() {
          clearInterval(this.state.interval);
      }

    render() {
      const { navigate } = this.props.navigation;
        return (
          <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title style={{marginLeft:60}}>Profile</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Right>
        </Header>
      </Container> 
        );
    }
  }

  const styles = StyleSheet.create({
  wrapper: {
  },

  sliderimg:{
    width:width,
    height:height,
    flex:1,
  },

  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#34495e',
  },
  text: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign:'center',
    fontStyle:'italic',
  }
});

