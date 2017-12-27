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
  ListView,
  ScrollView,
  Image,
  TextInput,
  MainView,
  Dimensions,
  ControlPanel,
  Main,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal
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

var{width, height}=Dimensions.get('window');

import * as firebase from 'firebase';

import { StackNavigator } from 'react-navigation';
import Drawer from 'react-native-drawer';
import Swiper from 'react-native-swiper';
import { Container, Header, Content, Button, Fab, Icon, Left, Right, Body, Title} from 'native-base';

export default class sarana extends Component {  
  static navigationOptions = {
    header : null
  };

  constructor(props) {
    super(props);
    this.state = {
      user1: 'Useless placeholder' ,
      password : '',
      email : '',
      data : '',
      day : '',
      wuku : '',
      foto : '',
      sasih : '',
      sarana : '',
      detail : '',
      carisar : '',
      alert : false,
      view : false,
      dataSource: new ListView.DataSource({rowHasChanged : (row1, row2)=> row1 !== row2}),
    };
    this.elemen=[];
  }

  closeControlPanel = () => {
    this._drawer.close();
  };
  openControlPanel = () => {
    this._drawer.open();
  };

  search = (carisar) =>{
    if(this.state.carisar == ''){
      this.elemen=[];
      alert("Pastikan anda memasukan kata kunci dengan benar ! ");
      this.setState({
        dataSource : this.state.dataSource.cloneWithRows(this.elemen),
      });
    }
    else{
      this.elemen=[];
      //alert(userId);
      var database = firebase.database().ref().child("view").orderByChild("namup").startAt(carisar).endAt(carisar+"\uf8ff");
      //alert(JSON.stringify(database));
      database.on("child_added", (dataSnapshot)=>{
        this.elemen.push({
          id : dataSnapshot.key, 
          foto : dataSnapshot.val().uri, 
          nama : dataSnapshot.val().namup, 
          hari : dataSnapshot.val().dayup, 
          wuku : dataSnapshot.val().wuku,
          sasih : dataSnapshot.val().sasih,
          sarana : dataSnapshot.val().sarana,
          detail : dataSnapshot.val().detail,
          pengguna : dataSnapshot.val().username
        });
        //alert(JSON.stringify(dataSnapshot));
        this.setState({
          dataSource : this.state.dataSource.cloneWithRows(this.elemen),
        });
      });
    }

  }


  componentWillMount() {
    var db = firebase.database().ref("view");
    //alert(JSON.stringify(db));
    db.on("child_added", (dataSnapshot)=>{ //macet 
      //alert(dataSnapshot.val());
      //alert(JSON.stringify(this.elemen));
        this.elemen.push({
          id : dataSnapshot.key, 
          foto : dataSnapshot.val().uri, 
          nama : dataSnapshot.val().namup, 
          hari : dataSnapshot.val().dayup, 
          wuku : dataSnapshot.val().wuku,
          sasih : dataSnapshot.val().sasih,
          sarana : dataSnapshot.val().sarana,
          detail : dataSnapshot.val().detail,
          pengguna : dataSnapshot.val().username
        });
      this.setState({
        dataSource : this.state.dataSource.cloneWithRows(this.elemen),
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
          <View style={{width:width*0.75, height:height, backgroundColor:'#7f8c8d'}}>
            <ImageBackground style={styles.container}
            source={require('.././image/bag6.jpg')}>
              <Image style={{width:60, height:60, marginTop:130, justifyContent:'center', borderRadius:60, marginLeft:10, position:'absolute'}}
                source={require('.././image/user.png')}
              />
              <Text style={{marginTop:160, marginLeft:80, color:'white', fontStyle:'italic', fontWeight:'bold'}}>You're not logging on</Text>
            </ImageBackground>

              <TouchableOpacity onPress={()=>navigate('Home')}>
                  <View style={styles.drawvi1}>
                  <Icon name='home' style={{marginLeft:20, marginTop:5, color:'#3498db'}}/>
                    <Text style={{textAlign:'center', marginTop:10, marginLeft:35, color:'black'}}>Beranda</Text>
                  </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>this.setState({alert : true})}>
                  <View style={styles.drawvi1}>
                  <Icon name='person' style={{marginLeft:20, marginTop:6, color:'#3498db'}}/>
                    <Text style={{textAlign:'center', marginTop:12, marginLeft:35, color:'black'}}>Profile</Text>
                  </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>navigate('Viewup')}>
                  <View style={styles.drawvi1}>
                    <Icon name='paper' style={{marginLeft:20, marginTop:5, color:'#3498db'}}/>
                    <Text style={{textAlign:'center', marginTop:10, marginLeft:35, color:'black'}}>Upacara</Text>
                  </View>
              </TouchableOpacity>
               <TouchableOpacity onPress={()=>navigate('Viewsar')}>
                  <View style={styles.posisi}>
                    <Icon name='flame' style={{marginLeft:20, marginTop:5, color:'#3498db'}}/>
                    <Text style={{textAlign:'center', marginTop:10, fontWeight:'bold', marginLeft:39, color:'black'}}>Sarana Upacara</Text>
                  </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>this.setState({alert : true})}>
                  <View style={styles.drawvi2}>
                    <Icon name='bookmarks' style={{marginLeft:20, marginTop:10, color:'#3498db'}}/>
                    <Text style={{textAlign:'center', marginTop:15, marginLeft:35, color:'black'}}>Daftar Peserta</Text>
                  </View>
              </TouchableOpacity>
              
              <View style={{height:2, width:width*0.75, backgroundColor:'#f1c40f', marginTop:5}}>
              </View>

              <TouchableOpacity onPress={()=>navigate('Login')}>
                  <View style={{height:60, width:width/2, marginTop:5, flexDirection:'row'}}>
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

          <Container style={{width:width, height:height}}>

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

      {/* Modal Tampil Data Detail */}
          <Modal animationType = {"slide"} transparent   = {true} visible  = {this.state.view} onRequestClose ={()=>this.setState({view : false})}>
              <Content>
              <TouchableWithoutFeedback>
                <View style={{height : height, width : width, backgroundColor : 'rgba(51,44,43,0.5)'}}>
                  <TouchableWithoutFeedback>
                    <View style={{backgroundColor : 'white', height : 500, width : width-50, alignSelf : 'center', marginTop : 100}}>
                      <View style={{height : 35, width : width-50, backgroundColor : '#2980b9'}}>
                        <Text style={{color : 'white', fontSize : 18, textAlign : 'center', marginTop : 5}}>Detail Sarana Upacara</Text>
                      </View>

                      <ListView dataSource = {this.state.dataSource} renderRow={(rowData) =>
                          <View style={{marginTop:10, height:450}}>
                            <Image source={{uri : this.state.foto}} style={{width:240, height:170, marginLeft:60}} />
                            <View style={{width:width-55, height:450, position:'absolute', marginTop:180}}>
                              <Text style={{fontSize:15, fontWeight:'bold', color:'black', alignSelf:'center'}}>{this.state.nama}</Text>
                              <View style={{marginLeft:20}}>
                                <Text style={{fontSize:12, fontWeight:'bold', color:'black', marginTop:10}}>Rahina : </Text>
                                <View style={{flexDirection:'row'}}>
                                  <Text style={{fontSize:12, color:'black'}}>   {this.state.day}, </Text>
                                  <Text style={{fontSize:12, color:'black'}}>{this.state.wuku}, </Text>
                                  <Text style={{fontSize:12, color:'black'}}>{this.state.sasih}</Text>
                                </View>

                                <View style={{height:0.5, width:width-40, marginTop:7, marginLeft:-20, backgroundColor:'black'}}></View>

                                <Text style={{fontSize:12, fontWeight:'bold', color:'black', marginTop:7}}>Sarana Yang Digunakan : </Text>
                                <Text style={{fontSize:12, color:'black', marginTop:3}}>   {this.state.sarana}</Text>

                                <View style={{height:1, width:width-40, marginTop:7, marginLeft:-20, backgroundColor:'black'}}></View>

                                <Text style={{fontSize:12, fontWeight:'bold', color:'black', marginTop:7}}>Detail Sarana : </Text>
                                <Text style={{fontSize:12, color:'black', marginTop:3}}>   {this.state.detail}</Text>
                              </View>
                            </View>
                          </View>
                      }
                      />

                        <TouchableOpacity onPress={()=>this.setState({ view : false })}>
                          <View style={{height:40, width:70, backgroundColor:"red", marginLeft:145, marginTop:-10, borderRadius:5}}>
                            <Text style={{color:"white", textAlign:"center", marginTop:10}}>Keluar</Text>
                          </View>
                        </TouchableOpacity>                                  

                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </TouchableWithoutFeedback>
              </Content>
            </Modal>

            <View style={{height:70, backgroundColor:'#3498db'}}>
              <View style={{flexDirection:'row', height:40, backgroundColor:'white', marginTop:10, width:340, marginLeft:10, borderRadius:5}}>
                <Button transparent onPress= {() =>this.openControlPanel()}>
                  <Icon name='menu' style={{marginTop:-4}}/>
                </Button>
                <TextInput
                  underlineColorAndroid="transparent"
                  placeholder="SARANA UPACARA"
                  style={{height: 40, width:250, borderWidth: 0, textAlign:"center", marginTop:0, marginLeft:0}}
                  onChangeText={(text) => this.setState({carisar : text})}
                  value={this.state.cariumum}
                />
                <Button transparent onPress= {() =>this.search(this.state.carisar)}>
                  <Icon name='search' style={{marginLeft:10, marginTop:-3}}/>
                </Button>
              </View>
            </View>


  {/* Data Dami */}
            <Content>
              

              <ListView dataSource = {this.state.dataSource} renderRow={(rowData) => 
                <TouchableOpacity onPress= {() =>
                  this.setState({
                    view : true,
                    foto : rowData.foto,
                    data : rowData.id,
                    day : rowData.hari,
                    wuku : rowData.wuku,
                    sasih : rowData.sasih,
                    sarana : rowData.sarana,
                    detail : rowData.detail,
                    nama : rowData.nama
                  })}>
                  <View style={{marginTop:10, height:120}}>
                    <View style={{width:50, height:100}}>
                      <Image source={{uri : rowData.foto}} style={{width:120, height:100, marginLeft:20}} />
                    </View>
                    <View style={{width:width-55, height:50, position:'absolute', left:150}}>
                      <Text style={{fontSize:15, fontWeight:'bold', color:'black'}}>{rowData.nama}</Text>
                      <Text style={{fontSize:12, color:'black', marginTop:3}}>{rowData.hari}</Text>
                      <Text style={{fontSize:12, color:'black', marginTop:3}}>{rowData.wuku}</Text>
                      <Text style={{fontSize:12, color:'black', marginTop:3}}>{rowData.sasih}</Text>
                      <Text style={{fontSize:10, marginTop:3}}>Post by : {rowData.pengguna}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              }
              />



            </Content>

          {/*Batas data dummy*/}

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
    marginTop:25,
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
    height:30, 
    width:width/2, 
    marginTop:25,
    flexDirection:'row'
    // marginLeft:10,
  },
  drawvi2:{
    height:60, 
    width:width/2, 
    marginTop:25,
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
