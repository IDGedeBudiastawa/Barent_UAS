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
  ListView,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal
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
      foto : '',
      nama : '',
      id : '',
      gabung : '',
      cariumum : '',
      alert : false,
      dataSource: new ListView.DataSource({rowHasChanged : (row1, row2)=> row1 !== row2}),
    };
    this.data=[];
  }

  closeControlPanel = () => {
    this._drawer.close();
  };
  openControlPanel = () => {
    this._drawer.open();
  };

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

  search = (cariumum) =>{
    if(this.state.cariumum == ''){
      this.data=[];
      alert("Pastikan anda memasukan kata kunci dengan benar ! ");
      this.setState({
        dataSource : this.state.dataSource.cloneWithRows(this.data),
      });
    }
    else{
      this.data=[];
      //alert(userId);
      var database = firebase.database().ref().child("viewup").orderByChild("upacara").startAt(cariumum).endAt(cariumum+"\uf8ff");
      //alert(JSON.stringify(database));
      database.on("child_added", (dataSnapshot)=>{
        this.data.push({
          id : dataSnapshot.key,
          foto : dataSnapshot.val().urlpost,
          nama : dataSnapshot.val().upacara,
          hari : dataSnapshot.val().date,
          lokasi : dataSnapshot.val().loc,
          tempat : dataSnapshot.val().place,
          biaya : dataSnapshot.val().biaya,
          pengguna : dataSnapshot.val().username,
          userId : dataSnapshot.val().userId,
          detail : dataSnapshot.val().ulasan,
          kontak : dataSnapshot.val().kontak,
          postId : dataSnapshot.val().postId,
        });
        //alert(JSON.stringify(dataSnapshot));
        this.setState({
          dataSource : this.state.dataSource.cloneWithRows(this.data),
        });
      });
    }
  }

  render () {
    const { navigate } = this.props.navigation;

    return (
      <Drawer
        ref={(ref) => this._drawer = ref}
        type="overlay"
        content={
          <View style={{width:width*0.75, height:height, backgroundColor:'#7f8c8d', position:'absolute'}}>
            <ImageBackground style={styles.container}
            source={require('.././image/bag6.jpg')}>
              <Image style={{width:60, height:60, marginTop:130, justifyContent:'center', borderRadius:60, marginLeft:10, position:'absolute'}}
                source={require('.././image/user.png')}
              />
              <Text style={{marginTop:160, marginLeft:80, color:'white', fontStyle:'italic', fontWeight:'bold'}}>You're not logging on</Text>
            </ImageBackground>

              <View style={{height:5, width:width*0.75, backgroundColor:'red'}}>
              </View>

              <TouchableOpacity onPress={()=>navigate('Home')}>
                  <View style={styles.posisi}>
                  <Icon name='home' style={{marginLeft:20, marginTop:5, color:'#34495e'}}/>
                    <Text style={{textAlign:'center', marginTop:10, marginLeft:35, fontWeight:'bold', color:'black'}}>Beranda</Text>
                  </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>this.setState({alert : true})}>
                  <View style={styles.drawvi1}>
                  <Icon name='person' style={{marginLeft:20, marginTop:10, color:'#3498db'}}/>
                    <Text style={{textAlign:'center', marginTop:15, marginLeft:35, color:'black'}}>Profile</Text>
                  </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>navigate('Viewup')}>
                  <View style={styles.drawvi}>
                    <Icon name='paper' style={{marginLeft:20, marginTop:10, color:'#3498db'}}/>
                    <Text style={{textAlign:'center', marginTop:15, marginLeft:35, color:'black'}}>Upacara</Text>
                  </View>
              </TouchableOpacity>
               <TouchableOpacity onPress={()=>navigate('Viewsar')}>
                  <View style={styles.drawvi}>
                    <Icon name='flame' style={{marginLeft:20, marginTop:10, color:'#3498db'}}/>
                    <Text style={{textAlign:'center', marginTop:15, marginLeft:39, color:'black'}}>Sarana Upacara</Text>
                  </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>navigate('Daftar')}>
                  <View style={styles.drawvi}>
                    <Icon name='bookmarks' style={{marginLeft:20, marginTop:10, color:'#3498db'}}/>
                    <Text style={{textAlign:'center', marginTop:15, marginLeft:35, color:'black'}}>Daftar Peserta</Text>
                  </View>
              </TouchableOpacity>

              <View style={{height:2, width:width*0.75, backgroundColor:'#f1c40f', marginTop:-5}}>
              </View> 

              <TouchableOpacity onPress={()=>navigate('Login')}>
                  <View style={{height:60, width:width/2, marginTop:15, flexDirection:'row'}}>
                    <Icon name='lock' style={{marginLeft:20, marginTop:10, color:'#3498db'}}/>
                    <Text style={{textAlign:'center', marginTop:15, marginLeft:35, color:'black'}}>Login</Text>
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

        <Modal animationType = {"fade"} transparent   = {true} visible  = {this.state.alert} onRequestClose ={()=>this.setState({alert : false})}>
            <TouchableWithoutFeedback onPress={()=>this.setState({alert : false})}>
              <View style={{height : height, width : width, backgroundColor : 'rgba(51,44,43,0.5)'}}>
                <TouchableWithoutFeedback>
                  <View style={{backgroundColor : 'white', height : height/5, width : width-100, borderRadius : 5, alignSelf : 'center', marginTop : height/2.5}}>
                    <View style={{height : 35, width : width-100, backgroundColor : '#2980b9', borderTopLeftRadius : 5, borderTopRightRadius : 5 }}>
                      <Text style={{color : 'white', fontSize : 18, textAlign : 'center', marginTop : 5}}>Culture Event Says</Text>
                    </View>
                    <Text style={{color : 'black', fontSize : 15, textAlign : 'center', marginTop:20}}>Login First</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>

          <View style={{width:width, height:height}}>
            <View style={{backgroundColor:'rgba(0,0,0,.2)', width:width, height:220}}>
                  <Swiper autoplay={true} style={styles.wrapper} showsButtons={true}>
                    <View style={styles.slide1}>
                      <Image style={{height: 100, width: 100}} 
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
                  onChangeText={(text) => this.setState({cariumum : text})}
                  value={this.state.cariumum}
                />
                <Button transparent onPress= {() =>this.search(this.state.cariumum)}>
                  <Icon name='search' style={{marginLeft:10, marginTop:-3}}/>
                  <Text>Sarana</Text>
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
    marginTop:15,
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