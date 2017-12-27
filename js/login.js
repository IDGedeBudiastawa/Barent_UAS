/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  AsyncStorage,
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
  ImageBackground,
  TouchableWithoutFeedback,
  ScrollView
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
    userId : '',
    animation : false,
    alert : false
  };
  }

  login = () =>{
    if (this.state.password == '' || this.state.email == '') {
      this.setState({
        alert : true 
      });
    }
    else{
      this.setState({
            animation : true
      });
      const { navigate } = this.props.navigation;
      firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(() => {
          var userId = firebase.auth().currentUser.uid;
          var database = firebase.database().ref("admin").child(""+userId+"");
          database.once('value',(snapshot)=>{
            AsyncStorage.multiSet([
              ["email", snapshot.val().email],
              ["password", this.state.password],
              ["userId", userId],
              ["fullName", snapshot.val().fullName],
              ["kelamin", snapshot.val().kelamin],
              ["username", snapshot.val().username],
              ["birthday", snapshot.val().birthday],
              ["username", snapshot.val().username]
            ]);
          });

          //alert(JSON.stringify(snapshot));

          navigate('Homelogin')
          this.setState({
            animation : false
          });

      });
    }
  }


  

  render() {
    const { navigate } = this.props.navigation;
    // const resizeMode = 'center';
    return (
      <Container> 
        <Modal animationType = {"fade"} transparent   = {true} visible  = {this.state.alert} onRequestClose ={()=>this.setState({alert : false})}>
            <TouchableWithoutFeedback onPress={()=>this.setState({alert : false})}>
              <View style={{height : height, width : width, backgroundColor : 'rgba(51,44,43,0.5)'}}>
                <TouchableWithoutFeedback>
                  <View style={{backgroundColor : 'white', height : height/5, width : width-100, borderRadius : 5, alignSelf : 'center', marginTop : height/2.5}}>
                    <View style={{height : 35, width : width-100, backgroundColor : '#2980b9', borderTopLeftRadius : 5, borderTopRightRadius : 5 }}>
                      <Text style={{color : 'white', fontSize : 18, textAlign : 'center', marginTop : 5}}>Culture Event Says</Text>
                    </View>
                    <Text style={{color : 'black', fontSize : 15, textAlign : 'center', marginTop:20}}>Input the valid email and password, if dont have account click sign up</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
          
        <Modal animationType = {"fade"} transparent   = {true} visible  = {this.state.animation} onRequestClose ={()=>this.setState({animation : false})}>
          <SkypeIndicator color='black' />
        </Modal> 
        <Content style={{height:height, width:width, backgroundColor:'#95a5a6'}}>
          <ScrollView style={{width:width, height:height}}>
            <Image style={{height:160, width:160, marginTop:40, marginLeft:90}}
              source={require('.././image/logo1.png')}
            />

            <View style={{marginTop:80}}>
              <TextInput
                underlineColorAndroid="transparent"
                placeholder="E-MAIL"
                style={{height: 40, borderColor: '#bdc3c7', backgroundColor:'#bdc3c7', width:250, borderWidth: 1, alignSelf:'center', textAlign:"center", borderRadius:5, marginTop:0}}
                onChangeText={(email) => this.setState({email})}
                value={this.state.email}
              />

              <TextInput
                underlineColorAndroid="transparent"
                placeholder="PASSWORD"
                secureTextEntry={true}
                style={{opacity:60, marginTop:40, height: 40, borderColor: '#bdc3c7', backgroundColor:'#bdc3c7', width:250, borderWidth: 1, textAlign:"center", borderRadius:5, alignSelf:'center', marginTop:10}}
                onChangeText={(password) => this.setState({password})}
                value={this.state.password}
              />

              <TouchableOpacity style={{alignItems:'center'}}
                onPress={()=>this.login()}>
                <View style={{height:40, width:250, backgroundColor:"#e67e22", marginTop:40, borderRadius:5}}>
                  <Text style={{color:"white", textAlign:"center", marginTop:10}}>LOGIN</Text>
                </View>
              </TouchableOpacity> 

              <Text style={{marginTop:10, textAlign:'center', color:'white'}}>Create an Account</Text>

              <View style={{flexDirection:'row', alignSelf:'center'}}>
                <TouchableOpacity style={{alignItems:'center'}}
                  onPress={()=>navigate('Signup')}>
                  <View style={{height:40, width:100, backgroundColor:"#2ecc71", borderRadius:5, marginTop:10}}>
                    <Text style={{color:"white", textAlign:"center", marginTop:10}}>SIGN UP</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style={{alignItems:'center'}}
                  onPress={()=>navigate('Home')}>
                  <View style={{height:40, width:100, backgroundColor:"#3498db", borderRadius:5, marginTop:10}}>
                    <Text style={{color:"white", textAlign:"center", marginTop:10}}>HOME</Text>
                  </View>
                </TouchableOpacity>

              </View>
            </View>
          </ScrollView>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height
  },

  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

