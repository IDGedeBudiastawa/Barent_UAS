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
  MainView,
  Dimensions,
  ControlPanel,
  Main,
  TouchableOpacity
} from 'react-native';

var{width, height}=Dimensions.get('window');

import * as firebase from 'firebase';

import { StackNavigator } from 'react-navigation';
import Drawer from 'react-native-drawer';
import Swiper from 'react-native-swiper';
import { Container, Header, Content, Button, Icon, Left, Right, Body, Title} from 'native-base';

  // var config = {
  //     apiKey: "AIzaSyAZEii7bZXtXiG8eBe2B5jfpQ57OTZ6Noo",
  //     authDomain: "barent-aa8ea.firebaseapp.com",
  //     databaseURL: "https://barent-aa8ea.firebaseio.com",
  //     projectId: "barent-aa8ea",
  //     storageBucket: "barent-aa8ea.appspot.com",
  //     messagingSenderId: "1050405465639"
  // };
  // const firebaseApp = firebase.initializeApp(config);

export default class sarana extends Component {  
  static navigationOptions = {
    header : null
  };

  constructor(props) {
    super(props);
    this.state = {
    user1: 'Useless placeholder' ,
    password : '',
    email : ''
  };
  }

  closeControlPanel = () => {
    this._drawer.close();
  };
  openControlPanel = () => {
    this._drawer.open();
  };

  render () {
    const { navigate } = this.props.navigation;

    return (
      <Drawer
        ref={(ref) => this._drawer = ref}
        type="overlay"
        content={
          <View style={{width:width*0.75, height:height, backgroundColor:'white'}}>
            <Image style={styles.container}
            source={require('./image/back.jpg')}>
              <Image style={{width:60, height:60, marginTop:60, justifyContent:'center', marginLeft:105}}
                source={require('./image/user1.png')}
              />
              <Text style={{marginTop:10, textAlign:'center', fontWeight:'bold'}}>WELCOME</Text>

            </Image>

              <TouchableOpacity onPress={()=>navigate('Home')}>
                  <View style={styles.drawvi1}>
                  <Icon name='home' style={{marginLeft:20, marginTop:5, color:'#34495e'}}/>
                    <Text style={{textAlign:'center', marginTop:10, marginLeft:35, color:'black'}}>Beranda</Text>
                  </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>navigate('Epro')}>
                  <View style={styles.drawvi1}>
                  <Icon name='person' style={{marginLeft:20, marginTop:6, color:'#95a5a6'}}/>
                    <Text style={{textAlign:'center', marginTop:12, marginLeft:35, color:'black'}}>Profile</Text>
                  </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>navigate('Kelola')}>
                  <View style={styles.drawvi1}>
                    <Icon name='paper' style={{marginLeft:20, marginTop:5, color:'green'}}/>
                    <Text style={{textAlign:'center', marginTop:10, marginLeft:35, color:'black'}}>Kelola Upacara</Text>
                  </View>
              </TouchableOpacity>
               <TouchableOpacity onPress={()=>navigate('Sarana')}>
                  <View style={styles.drawvi1}>
                    <Icon name='flame' style={{marginLeft:20, marginTop:5, color:'#e74c3c'}}/>
                    <Text style={{textAlign:'center', marginTop:10, marginLeft:39, color:'black'}}>Sarana Upacara</Text>
                  </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>navigate('Daftar')}>
                  <View style={styles.posisi}>
                    <Icon name='bookmarks' style={{marginLeft:20, marginTop:5, color:'#2980b9'}}/>
                    <Text style={{textAlign:'center', marginTop:10, fontWeight:'bold', marginLeft:35, color:'black'}}>Daftar Peserta</Text>
                  </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>navigate('Login')}>
                  <View style={styles.drawvi2}>
                    <Image style={styles.drawim}
                      source={require('./image/login.png')}
                    />
                    <Text style={{textAlign:'center', marginTop:15, marginLeft:35, color:'black'}}>Login</Text>
                  </View>
              </TouchableOpacity>
          </View>
        }
        tapToClose={true}
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        closedDrawerOffset={-3}
        styles={drawerStyles}
        tweenHandler={(ratio) => ({
          main: { opacity:(2-ratio)/2 }
        })}
        >

          <View style={{width:width, height:height}}>

            <View style={{flexDirection:'row', height:47, backgroundColor:'#2980b9'}}>
                <Button transparent onPress= {() =>this.openControlPanel()}>
                  <Icon name='menu' style={{marginTop:-4, color:'white'}}/>
                </Button>
                <Text style={{marginLeft:50, marginTop:8, color:'white', fontWeight:'bold', fontSize:20}}>Member Of Event</Text>
                <Button transparent onPress= {() =>navigate('Home')}>
                  <Icon name='home' style={{marginTop:1, color:'white', marginLeft:65}}/>
                </Button>
            </View>
            <View style={{flexDirection:'row'}}>
              <Image style={{width: 180, height: 150, marginTop:10, marginLeft:10, borderRadius:10}}
                source={require('./image/otonan.jpg')}
              />
              <TouchableOpacity style={{alignItems:'center'}}
                onPress={()=>this.onPressButton}>
                <View style={{height:40, width:100, marginLeft:10, backgroundColor:"red", marginTop:120, borderRadius:3}}>
                  <Text style={{color:"white", textAlign:"center", marginTop:10}}>Lihat Peserta</Text>
                </View>
              </TouchableOpacity> 
            </View>

              <View style={{flexDirection:'row'}}>
              <Image style={{width: 180, height: 150, marginTop:10, marginLeft:10, borderRadius:10}}
                source={require('./image/mebayuh.jpg')}
              />
              <TouchableOpacity style={{alignItems:'center'}}
                onPress={()=>this.onPressButton}>
                <View style={{height:40, width:100, marginLeft:10, backgroundColor:"red", marginTop:120, borderRadius:3}}>
                  <Text style={{color:"white", textAlign:"center", marginTop:10}}>Lihat Peserta</Text>
                </View>
              </TouchableOpacity> 
            </View>
          </View>
      </Drawer>
    );
  }
}

const drawerStyles = {
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
  main: {paddingLeft: 3},
};

const styles = StyleSheet.create({
  wrapper: {
  },

  container:{
    width:width*0.75,
    height:200,

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
    // fontWeight: 'bold',
    textAlign:'center',
    fontStyle:'italic',
  },
  posisi:{
    height:40, 
    width:300, 
    marginTop:20,
    flexDirection:'row',
    backgroundColor:'#bdc3c7'
    // marginLeft:10,
  },
  drawvi:{
    height:60, 
    width:width/2, 
    marginTop:-5,
    flexDirection:'row'
    // marginLeft:10,
  },
  drawvi1:{
    height:30, 
    width:width/2, 
    marginTop:15,
    flexDirection:'row'
    // marginLeft:10,
  },
  drawvi2:{
    height:60, 
    width:width/2, 
    marginTop:10,
    flexDirection:'row'
    // marginLeft:10,
  },
  drawim:{
    height:25, 
    width:25, 
    marginTop:10,
    marginLeft:15
  }, 
  drawtext:{
    textAlign:'center', 
    marginTop:15, 
    marginLeft:20, 
    fontWeight:'bold'
  }
});
