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
  ListView,
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
import ImagePicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import { Picker, Label, Container,Footer, Fab, FooterTab, Form, Item, Input,Tab,Tabs, Content, ListItem, CheckBox, Header, Left, Right,Body, Button, Icon, Title, Subtitle, Thumbnail, CardItem, Card } from 'native-base';

const polyfill = RNFetchBlob.polyfill;

window.XMLHttpRequest = polyfill.XMLHttpRequest;
window.Blob = polyfill.Blob; 

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
      namup : '',
      dayup : '',
      wuku : '',
      sasih : '',
      sarana : '',
      foto : '',
      deleteId : '',
      desa : '',
      carisar : '',
      Imagesar : '',
      imagesar : '',
      pilih : false,
      alert : false,
      input : false,
      animation : false,
      edit : false,
      profileUri : '',
      dataSource: new ListView.DataSource({rowHasChanged : (row1, row2)=> row1 !== row2}),
    };
    this.data=[];
    //this.renderRow = this.renderRow.bind(this);
    //this.pressRow = this.pressRow.bind(this);
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

  delitem = () => {
    var userId = firebase.auth().currentUser.uid;
    var database = firebase.database().ref("sarana/"+userId+"/"+this.state.deleteId+"");
    //alert(JSON.stringify(this.state.userId))  ;
    database.remove();
    this.setState({pilih : false});
    //const { navigate } = this.props.navigation;
    //  navigate('Sarana');
  }


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

  imagesarana = () =>{
    ImagePicker.openPicker({
    width: 300,
    height: 400,
    cropping: false
    }).then(image => {
      // alert(JSON.stringify(image))
      this.setState({
        imagesar : image.path
      });
    });
  
  }

  addsar = () => {
    if (this.state.namup == '' || this.state.dayup == '' || this.state.wuku == '' ||  this.state.sasih == '' ||  this.state.sarana == '' || this.state.desa == '') {
        this.setState({
          alert : true
        });
      }
      else{
        let today = new Date();
        let Times = today.getDate() + "/" + today.getMonth() + "/" + today.getFullYear() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let sortTime = -1*today.getTime();// mengambil waktu sekarang utuk sorting

        var userId = firebase.auth().currentUser.uid;
        
        //alert(userId);

        try{
              //alert(this.state.imagesar);
          this.setState({
            animation : true,
            pilih : false
          });
              if(this.state.imagesar == ''){
                var database = firebase.database().ref("sarana/"+userId+"");
                database.push({
                  sortTime : sortTime,
                  createdAt : Times,
                  userId : userId,
                  uri : 'https://firebasestorage.googleapis.com/v0/b/barent-aa8ea.appspot.com/o/sarana.png?alt=media&token=7f8c716c-e7e3-4057-bbb2-302ecae34230',
                  namup : this.state.namup,
                  dayup :this.state.dayup,
                  wuku: this.state.wuku,
                  sasih : this.state.sasih,
                  sarana : this.state.sarana,
                  detail : this.state.desa
                }).then(()=>{
                  database = firebase.database().ref("view");
                  database.push({
                    sortTime : sortTime,
                    createdAt : Times,
                    userId : userId,
                    uri : 'https://firebasestorage.googleapis.com/v0/b/barent-aa8ea.appspot.com/o/sarana.png?alt=media&token=7f8c716c-e7e3-4057-bbb2-302ecae34230',
                    namup : this.state.namup,
                    dayup :this.state.dayup,
                    wuku: this.state.wuku,
                    username : this.state.username,
                    sasih : this.state.sasih,
                    sarana : this.state.sarana,
                    detail : this.state.desa
                  }).then(()=>{
                    this.setState({
                      animation : false,
                      input : false
                    });
                  });
                });
              }
              else{
                Blob.build(RNFetchBlob.wrap(this.state.imagesar), { type : 'image/jpeg' }).then((blob)=>{
                  firebase.storage().ref("photosarana/").child(""+sortTime+"").put(blob, {contentType : 'image/png'}).then(()=>{
                      var storage = firebase.storage().ref("photosarana/"+sortTime+"");
                      storage.getDownloadURL().then((url)=>{
                          var database = firebase.database().ref("sarana/"+userId+"");
                          database.push({
                            sortTime : sortTime,
                            createdAt : Times,
                            userId : userId,
                            uri : url,
                            namup : this.state.namup,
                            dayup :this.state.dayup,
                            wuku: this.state.wuku,
                            sasih : this.state.sasih,
                            sarana : this.state.sarana,
                            detail : this.state.desa
                          }).then(()=>{
                            database = firebase.database().ref("view");
                            database.push({
                              sortTime : sortTime,
                              createdAt : Times,
                              userId : userId,
                              uri : url,
                              namup : this.state.namup,
                              dayup :this.state.dayup,
                              wuku: this.state.wuku,
                              username : this.state.username,
                              sasih : this.state.sasih,
                              sarana : this.state.sarana,
                              detail : this.state.desa
                            }).then(()=>{
                              this.setState({
                                animation : false,
                                input : false
                              });
                            });
                          });
                      });
                  });
                });
              }
        }catch(e){
          alert("error");
        }
    }
  }

  editsar = () =>{
    this.setState({ animation : true });
    let today = new Date();
    let Times = today.getDate() + "/" + today.getMonth() + "/" + today.getFullYear() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let sortTime = -1*today.getTime();// mengambil waktu sekarang utuk sorting
    var userId = firebase.auth().currentUser.uid;

    if(this.state.imagesar == ''){
      let url = this.state.foto;
      //alert(this.state.foto);
      var database = firebase.database().ref("sarana/"+userId+"/"+this.state.deleteId+"");
      database.update({
        userId : userId,
        uri : url,
        namup : this.state.namup,
        dayup :this.state.dayup,
        wuku: this.state.wuku,
        sasih : this.state.sasih,
        sarana : this.state.sarana,
        detail : this.state.desa,
      }).then(()=>{
        this.setState({
          pilih : false,
          animation : false,
          edit : false
        });
        const {navigate} = this.props.navigation;
        navigate('Sarana');
      });
    }
    else{
      Blob.build(RNFetchBlob.wrap(this.state.imagesar), { type : 'image/jpeg' }).then((blob)=>{
        firebase.storage().ref("photosarana/").child(""+sortTime+"").put(blob, {contentType : 'image/png'}).then(()=>{
          var storage = firebase.storage().ref("photosarana/"+sortTime+"");
            storage.getDownloadURL().then((url)=>{
              var database = firebase.database().ref("sarana/"+userId+"/"+this.state.deleteId+"");
                database.update({
                  userId : userId,
                  uri : url,
                  namup : this.state.namup,
                  dayup :this.state.dayup,
                  wuku: this.state.wuku,
                  sasih : this.state.sasih,
                  sarana : this.state.sarana,
                  detail : this.state.desa
                }).then(()=>{
                  this.setState({
                    pilih : false,
                    animation : false,
                    edit : false,
                  });
                  const {navigate} = this.props.navigation;
                  navigate('Sarana');
                });
            });//storage end 
        });//firebase end 
      });//end blob 
    }
  }

  search = (carisar) =>{
    if(this.state.carisar == ''){
      alert("Pastikan anda memasukan kata kunci dengan benar ! ");
      this.setState({
        dataSource : this.state.dataSource.cloneWithRows(this.data),
      });
    }
    else{
      this.data=[];
      var userId = firebase.auth().currentUser.uid;
      //alert(userId);
      var database = firebase.database().ref().child("sarana/"+userId+"").orderByChild("namup").startAt(carisar).endAt(carisar+"\uf8ff");
      //alert(JSON.stringify(database));
      database.on("child_added", (dataSnapshot)=>{
        this.data.push({
          id : dataSnapshot.key,
          foto : dataSnapshot.val().uri, 
          nama : dataSnapshot.val().namup, 
          hari : dataSnapshot.val().dayup, 
          wuku : dataSnapshot.val().wuku,
          sarana : dataSnapshot.val().sarana,
          sasih : dataSnapshot.val().sasih,
          detail : dataSnapshot.val().detail,
        });
        //alert(JSON.stringify(dataSnapshot));
        this.setState({
          dataSource : this.state.dataSource.cloneWithRows(this.data),
        });
      });
    }

  }

  componentWillMount() {
    AsyncStorage.getItem("userId").then((userId)=>{
      var database = firebase.database().ref("sarana/"+userId+"");
      //alert(JSON.stringify(database));
      database.on("child_added", (dataSnapshot)=>{
        this.data.push({
          id : dataSnapshot.key,
          foto : dataSnapshot.val().uri, 
          nama : dataSnapshot.val().namup,
          hari : dataSnapshot.val().dayup, 
          wuku : dataSnapshot.val().wuku,
          sarana : dataSnapshot.val().sarana,
          sasih : dataSnapshot.val().sasih,
          detail : dataSnapshot.val().detail,
        });
        //alert(JSON.stringify(dataSnapshot))
        this.setState({
          dataSource : this.state.dataSource.cloneWithRows(this.data),
        });
      });
    });

    var userId = firebase.auth().currentUser.uid;
    var database = firebase.database().ref("sarana/"+userId+"");
      database.on("child_removed", (databaseSnapshot)=>{
        this.data = this.data.filter((x)=>x.id !== databaseSnapshot.key);
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
          <View style={{width:width*0.75, height:height, backgroundColor:'#34495e'}}>
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
                  <View style={styles.drawvi1}>
                  <Icon name='home' style={{marginLeft:20, marginTop:5, color:'#2980b9'}}/>
                    <Text style={{textAlign:'center', marginTop:10, marginLeft:35, color:'black'}}>Beranda</Text>
                  </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>navigate('Epro')}>
                  <View style={styles.drawvi1}>
                  <Icon name='person' style={{marginLeft:20, marginTop:6, color:'#2980b9'}}/>
                    <Text style={{textAlign:'center', marginTop:12, marginLeft:35, color:'black'}}>Profile</Text>
                  </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>navigate('Kelola')}>
                  <View style={styles.drawvi1}>
                    <Icon name='paper' style={{marginLeft:20, marginTop:5, color:'#2980b9'}}/>
                    <Text style={{textAlign:'center', marginTop:10, marginLeft:35, color:'black'}}>Kelola Upacara</Text>
                  </View>
              </TouchableOpacity>
               <TouchableOpacity onPress={()=>navigate('Sarana')}>
                  <View style={styles.posisi}>
                    <Icon name='flame' style={{marginLeft:20, marginTop:5, color:'#16a085'}}/>
                    <Text style={{textAlign:'center', marginTop:10, fontWeight:'bold', marginLeft:39, color:'black'}}>Sarana Upacara</Text>
                  </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>navigate('Daftar')}>
                  <View style={styles.drawvi2}>
                    <Icon name='bookmarks' style={{marginLeft:20, marginTop:10, color:'#2980b9'}}/>
                    <Text style={{textAlign:'center', marginTop:15, marginLeft:35, color:'black'}}>Daftar Peserta</Text>
                  </View>
              </TouchableOpacity>

              <View style={{height:1, width:width*0.75, backgroundColor:'gray', marginTop:-5}}>
              </View>

              <TouchableOpacity onPress={()=>this.logout()}>
                  <View style={{height:60, width:width/2, marginTop:20, flexDirection:'row'}}>
                    <Icon name='lock' style={{marginLeft:20, marginTop:10, color:'#2980b9'}}/>
                    <Text style={{textAlign:'center', marginTop:15, marginLeft:35, color:'black'}}>Log Out</Text>
                  </View>
              </TouchableOpacity>

              <View style={{height:70, marginTop:15, width:width*0.75, backgroundColor:'#bdc3c7'}}>
                <Text style={{marginTop:5, textAlign:'center'}}>&copy; Balinese Culture Event</Text>
                <Text style={{textAlign:'center', fontStyle:'italic'}}>Make balinese ceremony to be easy</Text>
              </View>
              <Text>Powered By Barent</Text>
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


            <Modal animationType = {"slide"} transparent   = {true} visible  = {this.state.input} onRequestClose ={()=>this.setState({input : false})}>
                <Content>
                <TouchableWithoutFeedback>
                  <View style={{height : height, width : width, backgroundColor : 'rgba(51,44,43,0.5)'}}>
                    <TouchableWithoutFeedback>
                      <View style={{backgroundColor : 'white', height : 500, width : width-50, borderRadius : 5, alignSelf : 'center', marginTop : 100}}>
                        <View style={{height : 35, width : width-50, backgroundColor : '#2980b9', borderTopLeftRadius : 5, borderTopRightRadius : 5 }}>
                          <Text style={{color : 'white', fontSize : 18, textAlign : 'center', marginTop : 5}}>Input Sarana Upacara</Text>
                        </View>

                        <View style={{flexDirection:'row', marginTop:20}}>
                          <Text style={{marginTop:10, marginLeft : 10, color : 'black'}}>Nama Upacara   : </Text>
                          <TextInput
                            underlineColorAndroid="transparent"
                            placeholder="Upacara"
                            style={{borderColor: 'black', borderWidth : 1, borderRadius : 5, height: 40, width:185, textAlign:"center", marginTop:3, marginLeft:0}}
                            onChangeText={(namup) => this.setState({namup})}
                            value={this.state.namup}
                          />
                        </View>

                        <View style={{flexDirection:'row', marginTop:10}}>
                          <Text style={{marginTop:10, marginLeft : 10, color : 'black'}}>Hari Upacara       : </Text>
                          <TextInput
                            underlineColorAndroid="transparent"
                            placeholder="Rahina"
                            style={{borderColor: 'black', borderWidth : 1, borderRadius : 5, height: 40, width : 185, borderColor: 'black', borderWidth : 1, textAlign:"center", marginTop:0, marginLeft:0}}
                            onChangeText={(dayup) => this.setState({dayup})}
                            value={this.state.dayup}
                          />
                        </View>

                        <View style={{flexDirection:'row', marginTop:10}}>
                          <Text style={{marginTop:10, marginLeft : 10, color : 'black'}}>Pawukon              : </Text>
                          <TextInput
                            underlineColorAndroid="transparent"
                            placeholder="Wuku"
                            style={{borderColor: 'black', borderWidth : 1, borderRadius : 5, height: 40, width : 185, borderColor: 'black', borderWidth : 1, textAlign:"center", marginTop:0, marginLeft:0}}
                            onChangeText={(wuku) => this.setState({wuku})}
                            value={this.state.wuku}
                          />
                        </View>

                        <View style={{flexDirection:'row', marginTop:10}}>
                          <Text style={{marginTop:10, marginLeft : 10, color : 'black'}}>Sasih                     : </Text>
                          <TextInput
                            underlineColorAndroid="transparent"
                            placeholder="Sasih"
                            style={{borderColor: 'black', borderWidth : 1, borderRadius : 5, height: 40, width : 185, borderColor: 'black', borderWidth : 1, textAlign:"center", marginTop:0, marginLeft:0}}
                            onChangeText={(sasih) => this.setState({sasih})}
                            value={this.state.sasih}
                          />
                        </View>

                        <View style={{flexDirection:'row', marginTop:10}}>
                          <Text style={{marginTop:10, marginLeft : 10, color : 'black'}}>Sarana Upacara  : </Text>
                          <TextInput
                            underlineColorAndroid="transparent"
                            placeholder="Sarana Upacara"
                            style={{borderColor: 'black', borderWidth : 1, borderRadius : 5, height: 40, width : 185, borderColor: 'black', borderWidth : 1, textAlign:"center", marginTop:0, marginLeft:0}}
                            onChangeText={(sarana) => this.setState({sarana})}
                            value={this.state.sarana}
                          />
                        </View>

                        <View style={{flexDirection:'row', marginTop:10}}>
                          <Text style={{marginTop:10, marginLeft : 10, color : 'black'}}>Detail Sarana       : </Text>
                          <TextInput
                            underlineColorAndroid="transparent"
                            placeholder="Detail Penggunaan Sarana"
                            style={{borderColor: 'black', borderWidth : 1, borderRadius : 5, height: 40, width : 185, borderColor: 'black', borderWidth : 1, textAlign:"center", marginTop:0, marginLeft:0}}
                            onChangeText={(desa) => this.setState({desa})}
                            value={this.state.desa}
                          />
                        </View>


                        <TouchableOpacity onPress={()=>this.imagesarana()}>
                          <View style={{height:30, width:140, backgroundColor:"#ecf0f1", marginLeft:90, marginTop:20, borderRadius:5, flexDirection:'row'}}>
                            <Icon name='camera' style={{marginLeft:8, marginTop:0, color:'#95a5a6'}}/>
                            <Text style={{color:"black", textAlign:"center", marginLeft:10, marginTop:6}}>Pilih Gambar</Text>
                          </View>
                        </TouchableOpacity>

                        <Text style={{color : 'gray', fontSize : 15, marginTop:20}}>   *) Lengkapi lalu simpan</Text>
                        
                        <View style={{flexDirection:'row', marginTop:-5}}>
                          <TouchableOpacity onPress={()=>this.setState({ input : false })}>
                            <View style={{height:40, width:70, backgroundColor:"red", marginLeft:145, marginTop:20, borderRadius:5}}>
                              <Text style={{color:"white", textAlign:"center", marginTop:10}}>Keluar</Text>
                            </View>
                          </TouchableOpacity>

                          <TouchableOpacity onPress={()=>this.addsar()}>
                            <View style={{height:40, width:70, backgroundColor:"#2980b9", marginLeft:5, marginTop:20, borderRadius:5}}>
                              <Text style={{color:"white", textAlign:"center", marginTop:10}}>Simpan</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                        

                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                </TouchableWithoutFeedback>
                </Content>
              </Modal>

          {/* Modal Edit Data */}
          <Modal animationType = {"slide"} transparent   = {true} visible  = {this.state.edit} onRequestClose ={()=>this.setState({edit : false})}>
              <Content>
                <TouchableWithoutFeedback>
                  <View style={{height : height, width : width, backgroundColor : 'rgba(51,44,43,0.5)'}}>
                    <TouchableWithoutFeedback>
                      <View style={{backgroundColor : 'white', height : 500, width : width-50, borderRadius : 5, alignSelf : 'center', marginTop : 100}}>
                        <View style={{height : 35, width : width-50, backgroundColor : '#2980b9', borderTopLeftRadius : 5, borderTopRightRadius : 5 }}>
                          <Text style={{color : 'white', fontSize : 18, textAlign : 'center', marginTop : 5}}>Edit Data Sarana Upacara</Text>
                        </View>

                        <View style={{flexDirection:'row', marginTop:20}}>
                          <Text style={{marginTop:10, marginLeft : 10, color : 'black'}}>Nama Upacara   : </Text>
                          <TextInput
                            underlineColorAndroid="transparent"
                            placeholder="Upacara"
                            style={{borderColor: 'black', borderWidth : 1, borderRadius : 5, height: 40, width:185, textAlign:"center", marginTop:3, marginLeft:0}}
                            onChangeText={(namup) => this.setState({namup})}
                            value={this.state.namup}
                          />
                        </View>

                        <View style={{flexDirection:'row', marginTop:10}}>
                          <Text style={{marginTop:10, marginLeft : 10, color : 'black'}}>Hari Upacara       : </Text>
                          <TextInput
                            underlineColorAndroid="transparent"
                            placeholder="Rahina"
                            style={{borderColor: 'black', borderWidth : 1, borderRadius : 5, height: 40, width : 185, borderColor: 'black', borderWidth : 1, textAlign:"center", marginTop:0, marginLeft:0}}
                            onChangeText={(dayup) => this.setState({dayup})}
                            value={this.state.dayup}
                          />
                        </View>

                        <View style={{flexDirection:'row', marginTop:10}}>
                          <Text style={{marginTop:10, marginLeft : 10, color : 'black'}}>Pawukon              : </Text>
                          <TextInput
                            underlineColorAndroid="transparent"
                            placeholder="Wuku"
                            style={{borderColor: 'black', borderWidth : 1, borderRadius : 5, height: 40, width : 185, borderColor: 'black', borderWidth : 1, textAlign:"center", marginTop:0, marginLeft:0}}
                            onChangeText={(wuku) => this.setState({wuku})}
                            value={this.state.wuku}
                          />
                        </View>

                        <View style={{flexDirection:'row', marginTop:10}}>
                          <Text style={{marginTop:10, marginLeft : 10, color : 'black'}}>Sasih                     : </Text>
                          <TextInput
                            underlineColorAndroid="transparent"
                            placeholder="Wuku"
                            style={{borderColor: 'black', borderWidth : 1, borderRadius : 5, height: 40, width : 185, borderColor: 'black', borderWidth : 1, textAlign:"center", marginTop:0, marginLeft:0}}
                            onChangeText={(sasih) => this.setState({sasih})}
                            value={this.state.sasih}
                          />
                        </View>

                        <View style={{flexDirection:'row', marginTop:10}}>
                          <Text style={{marginTop:10, marginLeft : 10, color : 'black'}}>Sarana Upacara  : </Text>
                          <TextInput
                            underlineColorAndroid="transparent"
                            placeholder="Sarana"
                            style={{borderColor: 'black', borderWidth : 1, borderRadius : 5, height: 40, width : 185, borderColor: 'black', borderWidth : 1, textAlign:"center", marginTop:0, marginLeft:0}}
                            onChangeText={(sarana) => this.setState({sarana})}
                            value={this.state.sarana}
                          />
                        </View>

                        <View style={{flexDirection:'row', marginTop:10}}>
                          <Text style={{marginTop:10, marginLeft : 10, color : 'black'}}>Detail Sarana       : </Text>
                          <TextInput
                            underlineColorAndroid="transparent"
                            placeholder="Detail penggunaan Sarana"
                            style={{borderColor: 'black', borderWidth : 1, borderRadius : 5, height: 40, width : 185, borderColor: 'black', borderWidth : 1, textAlign:"center", marginTop:0, marginLeft:0}}
                            onChangeText={(desa) => this.setState({desa})}
                            value={this.state.detail}
                          />
                        </View>


                        <TouchableOpacity onPress={()=>this.imagesarana()}>
                          <View style={{height:30, width:140, backgroundColor:"#ecf0f1", marginLeft:90, marginTop:20, borderRadius:5, flexDirection:'row'}}>
                            <Icon name='camera' style={{marginLeft:8, marginTop:0, color:'#95a5a6'}}/>
                            <Text style={{color:"black", textAlign:"center", marginLeft:10, marginTop:6}}>Pilih Gambar</Text>
                          </View>
                        </TouchableOpacity>

                        <Text style={{color : 'gray', fontSize : 15, marginTop:20}}>   *) Tekan simpan untuk memperbaharui data </Text>
                        
                        <View style={{flexDirection:'row', marginTop:-5}}>
                          <TouchableOpacity onPress={()=>this.setState({ edit : false })}>
                            <View style={{height:40, width:70, backgroundColor:"red", marginLeft:145, marginTop:20, borderRadius:5}}>
                              <Text style={{color:"white", textAlign:"center", marginTop:10}}>Keluar</Text>
                            </View>
                          </TouchableOpacity>

                          <TouchableOpacity onPress={()=>this.editsar()}>
                            <View style={{height:40, width:70, backgroundColor:"#2980b9", marginLeft:5, marginTop:20, borderRadius:5}}>
                              <Text style={{color:"white", textAlign:"center", marginTop:10}}>Simpan</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                        

                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                </TouchableWithoutFeedback>
                </Content>
              </Modal>


          {/*Modal Peringatan Data tidak lengkap*/}
            <Modal animationType = {"fade"} transparent   = {true} visible  = {this.state.alert} onRequestClose ={()=>this.setState({alert : false})}>
              <TouchableWithoutFeedback onPress={()=>this.setState({alert : false})}>
                <View style={{height : height, width : width, backgroundColor : 'rgba(51,44,43,0.5)'}}>
                  <TouchableWithoutFeedback>
                    <View style={{backgroundColor : 'white', height : height/5, width : width-100, borderRadius : 5, alignSelf : 'center', marginTop : height/2.5}}>
                      <View style={{height : 35, width : width-100, backgroundColor : '#2980b9', borderTopLeftRadius : 5, borderTopRightRadius : 5 }}>
                        <Text style={{color : 'white', fontSize : 18, textAlign : 'center', marginTop : 5}}>Culture Event Says</Text>
                      </View>
                      <Text style={{color : 'black', fontSize : 15, textAlign : 'center', marginTop:20}}>Pastikan semua data telah terisi dengan benar !</Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </TouchableWithoutFeedback>
            </Modal>

            <Modal animationType = {"fade"} transparent   = {true} visible  = {this.state.animation} onRequestClose ={()=>this.setState({animation : false})}>
              <SkypeIndicator color='black' />
            </Modal>

            <Modal animationType = {"fade"} transparent   = {true} visible  = {this.state.pilih} onRequestClose ={()=>this.setState({pilih : false})}>
              <TouchableWithoutFeedback onPress={()=>this.setState({pilih : false})}>
                <View style={{height : height, width : width, backgroundColor : 'rgba(51,44,43,0.5)'}}>
                  <TouchableWithoutFeedback>
                    <View style={{backgroundColor : 'white', height : height/5, width : width-100, borderRadius : 5, alignSelf : 'center', marginTop : height/2.5}}>
                      <View style={{height : 35, width : width-100, backgroundColor : '#2980b9', borderTopLeftRadius : 5, borderTopRightRadius : 5 }}>
                        <Text style={{color : 'white', fontSize : 18, textAlign : 'center', marginTop : 5}}>Pilih Satu</Text>
                      </View>

                      <TouchableOpacity onPress={()=>this.delitem()}>
                        <View style={{height:40, marginTop:10, width:width-100, alignItems:'center'}}>
                          <Text style={{color:'black'}}>Hapus Data Upacara</Text>
                        </View>
                      </TouchableOpacity>
                        
                      <TouchableOpacity onPress={()=>this.setState({ edit : true })}>
                        <View style={{height:40, width:width-100, alignItems:'center'}}>
                          <Text style={{color:'black'}}>Edit Data Upacara</Text>
                        </View>
                      </TouchableOpacity>

                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </TouchableWithoutFeedback>
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
                  value={this.state.carisar}
                />
                <Button transparent onPress= {() =>this.search(this.state.carisar)}>
                  <Icon name='search' style={{marginLeft:10, marginTop:-3}}/>
                </Button>
              </View>
            </View>

      {/* Data */}
            <Content>
              <ListView dataSource = {this.state.dataSource} renderRow={(rowData) => 
                <TouchableOpacity onPress={()=>
                  this.setState({ 
                    pilih : true,
                    deleteId : rowData.id,
                    foto : rowData.foto,
                    namup : rowData.nama,
                    dayup : rowData.hari,
                    wuku : rowData.wuku,
                    sasih : rowData.sasih,
                    sarana : rowData.sarana,
                    detail : rowData.detail,
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
                    </View>
                  </View>
                </TouchableOpacity>
              }
              />
            </Content>

          {/*Batas data */}



              <Fab
                active={this.state.active}
                direction="up"
                containerStyle={{ }}
                style={{ backgroundColor: '#3498db'}}
                position="bottomRight"
                onPress={() => this.setState({input : true})}>
                <Icon name="add" />
              </Fab>
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
    marginTop:10,
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
    marginTop:20,
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
