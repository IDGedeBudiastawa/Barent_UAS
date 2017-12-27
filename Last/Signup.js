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
  ScrollView,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Alert
} from 'react-native';

import { Container, Header, Content, Button, Icon, Left, Right, Body, Title} from 'native-base';

var{width, height}=Dimensions.get('window');

import {
  SkypeIndicator,
  BarIndicator,
} from 'react-native-indicators';

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
      user1: 'Useless placeholder'
    };
  }



  create=()=>{
    if (this.state.password != this.state.repassword || this.state.email == '' || this.state.password == '' ||  this.state.repassword == '' ||  this.state.username == '' ||  this.state.fullname == '' || this.state.kelamin == '') {
      alert('gagal');
    }
    else{
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(() => {
          var userId = firebase.auth().currentUser.uid;
          this.writeakun(userId);
        }).catch((error) => {
            alert("error " + error.message );
        });
    }
    // const { navigate } = this.props.navigation;
    // firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);
    // Alert.alert('Sign Up Success')
    // navigate('Home');
  }

  writeakun=()=>{
    let today = new Date();
    let Times = today.getDate() + "/" + today.getMonth() + "/" + today.getFullYear() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let sortTime = -1*today.getTime();
    var userId = firebase.auth().currentUser.uid;
    var database = firebase.database().ref("admin").child(userId);

    database.set({
      sortTime : sortTime,
      createdAt : Times,
      userId : userId,
      email : this.state.email,
      username :this.state.username,
      fullName : this.state.fullname,
      birthday : this.state.date,
      kelamin : this.state.kelamin
    }).then((snapshot)=>{

       firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(() => {

        /** Set AsyncStorage START **/
        const { navigate } = this.props.navigation;
        navigate('Home');
        
        }).catch((error) => {
            alert("error " + error.message );
           
        });
    });
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      // <Image 
      //   source={require('./image/signinpict.jpg')} 
      //   style={styles.container}>
      <Content>
      <Image
        style={{height:height, width:width}}
        source={require('./image/log21.jpg')}
        style={styles.container}>
        <Image
          style={{height: 120, width: 120, marginTop:15}}
          source={require('./image/logo1.png')}
        />
            <TextInput
              underlineColorAndroid="transparent"
              placeholder="Full Name"
              style={{height: 40, borderColor: 'black', width:200, borderWidth: 1, textAlign:"center", borderRadius:5, marginTop:40, fontStyle:'italic'}}
              onChangeText={(fullname) => this.setState({fullname})}
              value={this.state.fullname}
            />

            <TextInput
              underlineColorAndroid="transparent"
              placeholder="Username"
              style={{height: 40, borderColor: 'black', width:200, borderWidth: 1, textAlign:"center", borderRadius:5, marginTop:10, fontStyle:'italic'}}
              onChangeText={(username) => this.setState({username})}
              value={this.state.username}
            />

            <TextInput
              underlineColorAndroid="transparent"
              placeholder="E-Mail"
              style={{height: 40, borderColor: 'black', width:200, borderWidth: 1, textAlign:"center", borderRadius:5, marginTop:10, fontStyle:'italic'}}
              onChangeText={(email) => this.setState({email})}
              value={this.state.email}
            />

            <TextInput
              underlineColorAndroid="transparent"
              placeholder="Gender"
              style={{height: 40, borderColor: 'black', width:200, borderWidth: 1, textAlign:"center", borderRadius:5, marginTop:10, fontStyle:'italic'}}
              onChangeText={(kelamin) => this.setState({kelamin})}
              value={this.state.kelamin}
            />

            <TextInput
              underlineColorAndroid="transparent"
              secureTextEntry={true}
              placeholder="Password"
              style={{height: 40, borderColor: 'black', width:200, borderWidth: 1, textAlign:"center", borderRadius:5, marginTop:10, fontStyle:'italic'}}
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}
            />

            <TextInput
              underlineColorAndroid="transparent"
              secureTextEntry={true}
              placeholder="Re-Type Password"
              style={{height: 40, borderColor: 'black', width:200, borderWidth: 1, textAlign:"center", borderRadius:5, marginTop:10, fontStyle:'italic'}}
              onChangeText={(repassword) => this.setState({repassword})}
              value={this.state.repassword}
            />

            <View style={{borderWidth:1, height:40, width:200, borderRadius:5, marginTop:10, borderColor:'black'}}>
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
              <View style={{height:40, width:200, backgroundColor:"#2980b9", marginTop:30, borderRadius:5}}>
                <Text style={{color:"white", textAlign:"center", marginTop:10}}>SIGN UP</Text>
              </View>
            </TouchableOpacity>

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

