/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Picker, 
  Alert,
  StatusBar,
  Modal,
  TouchableWithoutFeedback
} from 'react-native';

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

import { Container, Header, Content, Button, Icon, Left, Right, Body, Title} from 'native-base';

var{width, height}=Dimensions.get('window');

import DatePicker from 'react-native-datepicker';

import * as firebase from 'firebase';

export default class Signup extends Component {  
  static navigationOptions = {
      header : null
  };

  constructor(props) {
    super(props);
    this.state = { 
      email : '',
      password : '',
      repassword : '',
      fullname : '',
      username : '',
      kelamin : '',
      date:"16-02-1997",
      user1: 'Useless placeholder',
      profileUri : '',
      alert : false, 
      sukses : false,
      animation : false
    };
  }



  create=()=>{
    if (this.state.password != this.state.repassword || this.state.email == '' || this.state.password == '' ||  this.state.repassword == '' ||  this.state.username == '' ||  this.state.fullname == '' || this.state.kelamin == '') {
      this.setState({
        alert : true
      });
    }
    else{
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(() => {
          var userId = firebase.auth().currentUser.uid;
          AsyncStorage.multiSet([
                    ["email", this.state.email],
                    ["password", this.state.password],
                    ["userId", userId]
          ]);
          this.writeakun(userId);
        }).catch((error) => {
            alert("error " + error.message );
        });
    }
  }

  writeakun=()=>{
    let today = new Date();
    let Times = today.getDate() + "/" + today.getMonth() + "/" + today.getFullYear() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let sortTime = -1*today.getTime();
    var userId = firebase.auth().currentUser.uid;
    var database = firebase.database().ref("admin").child(""+userId+"");

    database.set({
      sortTime : sortTime,
      createdAt : Times,
      userId : userId,
      PhotoProfile : "https://firebasestorage.googleapis.com/v0/b/barent-aa8ea.appspot.com/o/usermale.png?alt=media&token=8faafb1a-4d21-439a-84ea-2f1be05b2e6f",
      email : this.state.email,
      username :this.state.username,
      fullName : this.state.fullname,
      birthday : this.state.date,
      kelamin : this.state.kelamin
    }).then((snapshot)=>{
      firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(() => {
          AsyncStorage.multiSet([
            ["email", this.state.email],
            ["password", this.state.password],
            ["userId", userId],
            ["fullName", this.state.fullname],
            ["kelamin", this.state.kelamin],
            ["username", this.state.username],
            ["birthday", this.state.birthday],
            ["username", this.state.username]
          ]);


        /** Set AsyncStorage START **/
        const { navigate } = this.props.navigation;
        navigate('Homelogin');
        
        }).catch((error) => {
            //alert("error " + error.message );
            alert(JSON.stringify(snapshot));
            alert(userId);
           
        });
    });
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      // <Image 
      //   source={require('./image/signinpict.jpg')} 
      //   style={styles.container}>
      <Image style={{height:height, width:width}} source={require('.././image/siglog.jpg')}>
      <Container>
        <Modal animationType = {"fade"} transparent   = {true} visible  = {this.state.alert} onRequestClose ={()=>this.setState({alert : false})}>
          <TouchableWithoutFeedback onPress={()=>this.setState({alert : false})}>
            <View style={{height : height, width : width, backgroundColor : 'rgba(51,44,43,0.5)'}}>
              <TouchableWithoutFeedback>
                <View style={{backgroundColor : 'white', height : height/5, width : width-100, borderRadius : 5, alignSelf : 'center', marginTop : height/2.5}}>
                  <View style={{height : 35, width : width-100, backgroundColor : '#2980b9', borderTopLeftRadius : 5, borderTopRightRadius : 5 }}>
                    <Text style={{color : 'white', fontSize : 18, textAlign : 'center', marginTop : 5}}>Culture Event Says</Text>
                  </View>
                  <Text style={{color : 'black', fontSize : 15, textAlign : 'center', marginTop:20}}>Fill the sign up form by a correct information ! </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>


        <Modal animationType = {"fade"} transparent   = {true} visible  = {this.state.animation} onRequestClose ={()=>this.setState({animation : false})}>
          <BarIndicator color='black' />
        </Modal>



    {/* Identiti */}

        <Content>
        <View style={{alignItems:'center'}}>
            <Text style={{fontStyle:'italic', fontWeight:'bold', color:'#2ecc71', textShadowOffset: {weidth:6, height:7}, marginLeft:-7, fontSize:30, marginTop:20}}>Sign Up Form</Text>

            <TextInput
              underlineColorAndroid="transparent"
              placeholder="Full Name"
              style={{height: 40, backgroundColor:'#ecf0f1', width:200, borderWidth: 0, textAlign:"left", marginTop:30, fontStyle:'italic'}}
              onChangeText={(fullname) => this.setState({fullname})}
              value={this.state.fullname}
            />

            <TextInput
              underlineColorAndroid="transparent"
              placeholder="Username"
              style={{height: 40, backgroundColor:'#ecf0f1', width:200, borderWidth: 0, textAlign:"left", marginTop:10, fontStyle:'italic'}}
              onChangeText={(username) => this.setState({username})}
              value={this.state.username}
            />

            <TextInput
              underlineColorAndroid="transparent"
              placeholder="E-Mail"
              style={{height: 40, backgroundColor:'#ecf0f1', width:200, borderWidth: 0, textAlign:"left", marginTop:10, fontStyle:'italic'}}
              onChangeText={(email) => this.setState({email})}
              value={this.state.email}
            />

          
            <View style={{ width:200, borderWidth : 0, backgroundColor:'#ecf0f1', marginTop : 10, height : 40}}>
              <Picker
                mode = {'dropdown'}
                selectedValue={this.state.kelamin}
                onValueChange={(itemValue) => this.setState({kelamin: itemValue})}
                style={{color : 'black', borderWidth : 0, marginTop:-5}}
                >
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
              </Picker>
            </View>



            <TextInput
              underlineColorAndroid="transparent"
              secureTextEntry={true}
              placeholder="Password"
              style={{height: 40, backgroundColor:'#ecf0f1', width:200, borderWidth: 0, textAlign:"left", marginTop:10, fontStyle:'italic'}}
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}
            />

            <TextInput
              underlineColorAndroid="transparent"
              secureTextEntry={true}
              placeholder="Re-Type Password"
              style={{height: 40, backgroundColor:'#ecf0f1', width:200, borderWidth: 0, textAlign:"left", marginTop:10, fontStyle:'italic'}}
              onChangeText={(repassword) => this.setState({repassword})}
              value={this.state.repassword}
            />

            <View style={{borderWidth:0, height:40, width:200, marginTop:10, backgroundColor:'#ecf0f1'}}>
              <DatePicker
                style={{width: 200}}
                date={this.state.date}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                minDate="1000-05-01"
                maxDate="2080-06-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    marginLeft: 36
                  }
                }}
                onDateChange={(date) => {this.setState({date: date})}}
              />
            </View>

            <TouchableOpacity onPress={()=>this.create()}>
              <View style={{height:40, width:250, backgroundColor:"#2ecc71", marginTop:30, borderRadius:5}}>
                <Text style={{color:"white", textAlign:"center", marginTop:10}}>SIGN UP</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>navigate('Login')}>
              <View style={{height:40, width:200, backgroundColor:"transparent", marginTop:10, borderRadius:5}}>
                <Text style={{color:"#2ecc71", textAlign:"center", marginTop:10}}>Press for back to login</Text>
              </View>
            </TouchableOpacity>

            <Text style={{marginTop:20, color:'#2ecc71'}}>*) Fill the form by a real information and click Sign Up</Text>
          </View>
          </Content>
        </Container>
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
    // backgroundColor: '#1abc9c',
  },

  welcome: {
    fontSize: 12,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

