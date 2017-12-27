/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  AsyncStorage,
  BackHandler,
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  TextInput,
  MainView,
  Dimensions,
  ControlPanel,
  Main,
  ImageBackground,
  TouchableOpacity
} from 'react-native';

var{width, height}=Dimensions.get('window');

import * as firebase from 'firebase';

import { StackNavigator } from 'react-navigation';

import Drawer from 'react-native-drawer';
import Swiper from 'react-native-swiper';
import { Container, Header, Content, Button, Icon, Left, Right, Body, Title} from 'native-base';

export default class home extends Component {  
  static navigationOptions = {
    header : null
  };

  constructor(props) {
    super(props);
    this.state = {
      user1: 'Useless placeholder' ,
      password : '',
      email : '',
      profileUri : '',
      id : '',
      foto : '',
      nama : '',
      gabung : '',
      dataSource: new ListView.DataSource({rowHasChanged : (row1, row2)=> row1 !== row2}),
    };
    this.data=[];

    AsyncStorage.multiGet(['userId','username', 'fullName', 'email', 'kelamin', 'birthday']).then((data) => {
      //alert(JSON.stringify(data));
      this.setState({
        Uid : data[0][1],
        username : data[1][1],
        fullName : data[2][1],
        email : [3][1],
        kelamin : data[4][1],
        birthday : data[5][1]
      });

          let storage = firebase.storage().ref("admin/"+data[0][1]+"/PhotoProfile/").child(data[0][1]);
          storage.getDownloadURL().then((url)=>{
            this.setState({profileUri:url});
          }).catch((error)=>{
            this.setState({profileUri:"https://firebasestorage.googleapis.com/v0/b/barent-aa8ea.appspot.com/o/usermale.png?alt=media&token=8faafb1a-4d21-439a-84ea-2f1be05b2e6f"});
            //alert('halo')
          });
     });
  }

  closeControlPanel = () => {
    this._drawer.close();
  };
  openControlPanel = () => {
    this._drawer.open();
  };

  logout=()=>{
    const { navigate } = this.props.navigation;
    let keys = ['fullName','email', 'password', 'userId','username', 'kelamin', 'birthday'];
    AsyncStorage.multiRemove(keys, (err) => {
        alert("You are logged out");
    });
    firebase.auth().signOut();
    navigate('Home')
    return false;
  }

  componentWillMount() {
      var database = firebase.database().ref().child("admin").orderByChild("username");
      database.on("child_added", (dataSnapshot)=>{
        this.data.push({
          id : dataSnapshot.key, 
          foto : dataSnapshot.val().PhotoProfile,
          nama : dataSnapshot.val().username,
          gabung : dataSnapshot.val().createdAt,
        });
        this.setState({
          dataSource : this.state.dataSource.cloneWithRows(this.data),
        });
      });
  }

  render () {
    const { navigate } = this.props.navigation;

    return (
      <Drawer
        ref={(ref) => this._drawer = ref}
        type="overlay"
        content={
          <View style={{width:width*0.75, height:height, backgroundColor:'#34495e', position:'absolute'}}>
            <ImageBackground style={styles.container}
            source={require('.././image/drawimage.jpg')}>
              <Image style={{width:70, height:70, marginTop:120, borderRadius:70, justifyContent:'center', marginLeft:10, position:'absolute'}}
                source={{uri : this.state.profileUri}}
              />
              <Text style={{marginTop:145, marginLeft:85, color:'black', fontStyle:'italic', fontWeight:'bold'}}>{this.state.fullName}</Text>
              <Text style={{marginLeft:85, color:'black', fontStyle:'italic'}}>{this.state.username}</Text>
            </ImageBackground>

              <View style={{height:5, width:width*0.75, backgroundColor:'blue'}}>
              </View>

              <TouchableOpacity onPress={()=>navigate('Homelogin')}>
                  <View style={styles.posisi}>
                  <Icon name='home' style={{marginLeft:20, marginTop:5, color:'#16a085'}}/>
                    <Text style={{textAlign:'center', marginTop:10, marginLeft:35, fontWeight:'bold', color:'black'}}>Beranda</Text>
                  </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>navigate('Epro')}>
                  <View style={styles.drawvi1}>
                  <Icon name='person' style={{marginLeft:20, marginTop:10, color:'#2980b9'}}/>
                    <Text style={{textAlign:'center', marginTop:15, marginLeft:35, color:'black'}}>Profile</Text>
                  </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>navigate('Kelola')}>
                  <View style={styles.drawvi}>
                    <Icon name='paper' style={{marginLeft:20, marginTop:10, color:'#2980b9'}}/>
                    <Text style={{textAlign:'center', marginTop:15, marginLeft:35, color:'black'}}>Kelola Upacara</Text>
                  </View>
              </TouchableOpacity>
               <TouchableOpacity onPress={()=>navigate('Sarana')}>
                  <View style={styles.drawvi}>
                    <Icon name='flame' style={{marginLeft:20, marginTop:15, color:'#2980b9'}}/>
                    <Text style={{textAlign:'center', marginTop:15, marginLeft:39, color:'black'}}>Sarana Upacara</Text>
                  </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>navigate('Daftar')}>
                  <View style={styles.drawvi}>
                    <Icon name='bookmarks' style={{marginLeft:20, marginTop:10, color:'#2980b9'}}/>
                    <Text style={{textAlign:'center', marginTop:15, marginLeft:35, color:'black'}}>Daftar Peserta</Text>
                  </View>
              </TouchableOpacity>

              <View style={{height:1, width:width*0.75, backgroundColor:'gray', marginTop:-5}}>
              </View>

              <TouchableOpacity onPress={()=>this.logout()}>
                  <View style={{height:60, width:width/2, marginTop:7, flexDirection:'row'}}>
                    <Icon name='lock' style={{marginLeft:20, marginTop:10, color:'#2980b9'}}/>
                    <Text style={{textAlign:'center', marginTop:15, marginLeft:35, color:'black'}}>Log Out</Text>
                  </View>
              </TouchableOpacity>

              <View style={{height:70, marginTop:10, width:width*0.75, backgroundColor:'#bdc3c7'}}>
                <Text style={{marginTop:5, textAlign:'center'}}>&copy; Balinese Culture Event</Text>
                <Text style={{textAlign:'center', fontStyle:'italic'}}>Make balinese ceremony to be easy</Text>
              </View>
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

        <Container>
          <View style={{width:width, height:height}}>
            <View style={{backgroundColor:'rgba(0,0,0,.2)', width:width, height:220}}>
                  <Swiper autoplay={true} style={styles.wrapper} showsButtons={true}>
                    <View style={styles.slide1}>
                      <Image style={{height: 100, width: 150}} 
                        source={require('.././image/logo1.png')}
                      />
                      <Text style={styles.text}>Solution Of Your Ceremony</Text>
                    </View>

                    <View style={styles.slide}>
                      <Image style={{height:200, width:360}}
                        source={require('.././image/back8.jpg')}
                      />
                      <Text style={styles.text}>Balinese culture is more famous</Text>
                    </View>

                    <View style={styles.slide}>
                      <Image style={{height:200, width:360}}
                        source={require('.././image/otonan.jpg')}
                      />
                      <Text style={styles.text}>Young generation knows the culture of bali</Text>
                    </View>

                    <View style={styles.slide}>
                      <Image style={{height:200,width:360}}
                        source={require('.././image/metatah.jpg')}
                      />
                      <Text style={styles.text}>Ceremony becomes easier and cheaper</Text>
                    </View>
                  </Swiper>
            </View>

            <View style={{flexDirection:'row', height:60, backgroundColor:'#3498db'}}>
              <View style={{flexDirection:'row', height:40, backgroundColor:'white', marginTop:8, width:340, marginLeft:10, borderRadius:5}}>
                <Button transparent onPress= {() =>this.openControlPanel()}>
                  <Icon name='menu' style={{marginTop:-4}}/>
                </Button>
                <TextInput
                  underlineColorAndroid="transparent"
                  placeholder="Enter Keywords"
                  style={{height: 40, width:250, borderWidth: 0, textAlign:"center", marginTop:0, marginLeft:0}}
                  onChangeText={(cariumum) => this.setState({cariumum})}
                  value={this.state.cariumum}
                />
                <Button transparent onPress= {() =>this.onPressButton}>
                  <Icon name='search' style={{marginLeft:10, marginTop:-3}}/>
                  <Text>Sarana</Text>
                </Button>

                <Button transparent onPress= {() =>this.onPressButton}>
                  <Icon name='search' style={{marginLeft:10, marginTop:-3}}/>
                  <Text>Upacara</Text>
                </Button>
              </View>
            </View>

          {/*Tempat menu akun orang*/}
            <Content>
              <ListView dataSource = {this.state.dataSource} renderRow={(rowData) =>
                <TouchableOpacity>
                  <View style={{marginTop:15, height:140}}>
                    <View style={{width:50, height:100}}>
                      <Image source={{uri : rowData.foto}} style={{width:120, height:120, borderRadius:120, marginLeft:20}} />
                    </View>
                    <View style={{width:width-55, height:50, position:'absolute', left:150, marginTop:20}}>
                      <Text style={{fontSize:15, fontWeight:'bold', color:'black'}}>{rowData.nama}</Text>
                      <Text style={{fontSize:12, color:'black', marginTop:3}}>{rowData.gabung}</Text>
                      <Text style={{fontSize:12, color:'black', marginTop:3}}>{rowData.tempat}</Text>
                      <Text style={{fontSize:12, color:'black', marginTop:3}}>{rowData.pengguna}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              }
              />
            </Content>


          </View>
        </Container>
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
    marginTop:5,
    flexDirection:'row'
    // marginLeft:10,
  },
  drawvi1:{
    height:60, 
    width:width/2, 
    marginTop:15,
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
