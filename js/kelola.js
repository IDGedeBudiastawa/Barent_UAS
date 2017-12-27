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
  AsyncStorage,
  ListView,
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

import DatePicker from 'react-native-datepicker';
import ImagePicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import { StackNavigator } from 'react-navigation';
import Drawer from 'react-native-drawer';
import Swiper from 'react-native-swiper';
import { Container, Header, Content, Button, Fab, Icon, Left, Right, Body, Title} from 'native-base';

const polyfill = RNFetchBlob.polyfill;

window.XMLHttpRequest = polyfill.XMLHttpRequest;
window.Blob = polyfill.Blob; 

export default class kelola extends Component {  
  static navigationOptions = {
    header : null
  };

  constructor(props) {
    super(props);
    this.state = {
      user1: 'Useless placeholder' ,
      password : '',
      email : '',
      upacara : '',
      place : '',
      loc : '',
      foto : '',
      username : '',
      biayaupacara : '',
      upacaranama : '',
      ulasanupacara : '',
      tempatupacara : '',
      lokasiupacara : '',
      biaya : '',
      hari : '',
      date : '16-02-1997',
      ulasan : '',
      deleteId : '',
      Imageup : '',
      kontak : '',
      dibuat : '',
      cariup : '',
      Uid : null, 
      userId : '',
      input : false,
      alert : false,
      pilih : false,
      edit : false,
      animation : false,
      profileUri : '',
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


  imageUpacara = () =>{
    ImagePicker.openPicker({
    width: 300,
    height: 400,
    cropping: false 
    }).then(image => {
      //alert(JSON.stringify(image))
      this.setState({
        Imageup : image.path
      });
    });
  }


  addup = () =>{
    if (this.state.upacara == '' || this.state.place == '' || this.state.loc == '' ||  this.state.biaya == '' ||  this.state.date == '') {
      this.setState({
        alert : true,
        pilih : false
      });
    }
    else{
        this.setState({
          animation : true,
          pilih : false
        });
        let today = new Date();
        let Times = today.getDate() + "/" + today.getMonth() + "/" + today.getFullYear() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let sortTime = -1*today.getTime();// mengambil waktu sekarang utuk sorting

        var userId = firebase.auth().currentUser.uid;
        //alert(userId);
        try{
              //alert(this.state.Imageup);
              if(this.state.Imageup == ''){
                this.setState({Imageup : 'https://firebasestorage.googleapis.com/v0/b/barent-aa8ea.appspot.com/o/bag6.jpg?alt=media&token=92b8b401-44b3-43b3-9103-362844e220a4'});
                var database = firebase.database().ref("upacara/"+userId+"");
                database.push({
                  sortTime : sortTime,
                  createdAt : Times,
                  urlpost : 'https://firebasestorage.googleapis.com/v0/b/barent-aa8ea.appspot.com/o/bag6.jpg?alt=media&token=92b8b401-44b3-43b3-9103-362844e220a4',
                  userId : userId,
                  username : this.state.username,
                  upacara : this.state.upacara,
                  place :this.state.place,
                  loc : this.state.loc,
                  biaya : this.state.biaya,
                  username : this.state.username,
                  date : this.state.date,
                  ulasan : this.state.ulasan,
                  kontak : this.state.kontak
                }).then(()=>{
                    this.setState({
                      animation : false,
                      input : false
                    });
                  })
                
              }
              else{
                Blob.build(RNFetchBlob.wrap(this.state.Imageup), { type : 'image/jpeg' }).then((blob)=>{
                  firebase.storage().ref("photoupacara").child(""+sortTime+"").put(blob, {contentType : 'image/png'}).then(()=>{
                      var storage = firebase.storage().ref("photoupacara/"+sortTime+"");
                      storage.getDownloadURL().then((url)=>{
                          var database = firebase.database().ref("upacara/"+userId+"");
                          database.push({
                            sortTime : sortTime,
                            createdAt : Times,
                            urlpost : url,
                            userId : userId,
                            upacara : this.state.upacara,
                            place :this.state.place,
                            loc : this.state.loc,
                            biaya : this.state.biaya,
                            username : this.state.username,
                            date : this.state.date,
                            ulasan : this.state.ulasan,
                            kontak : this.state.kontak
                          }).then(()=>{
                              this.setState({
                                animation : false,
                                input : false
                              });
                            });
                      });
                  });
                });
            }
        }catch(e){
          alert("error");
        }
      // let today = new Date();
      // let Times = today.getDate() + "/" + today.getMonth() + "/" + today.getFullYear() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      // let sortTime = -1*today.getTime();
      // var userId = firebase.auth().currentUser.uid;
      // var database = firebase.database().ref("upacara_massal/"+this.state.userId+"/"+this.state.upacara+"/"+sortTime+"").child(userId);

      // database.set({
      //   sortTime : sortTime,
      //   createdAt : Times,
      //   userId : userId,
      //   upacara : this.state.upacara,
      //   place :this.state.place,
      //   loc : this.state.loc,
      //   biaya : this.state.biaya,
      //   date : this.state.date,
      //   ulasan : this.state.ulasan
      // }).then((snapshot)=>{
      //     alert('sukses')
      // });
    }
  }

  bagikan = () =>{
    this.setState({
      animation : true,
      pilih : false,
    });
    var database = firebase.database().ref("viewup");
    //alert(this.state.userId)
    database.push({
      sortTime : this.state.sortTime,
      createdAt : this.state.dibuat,
      urlpost : this.state.foto,
      userId : this.state.userId,
      upacara : this.state.upacaranama,
      place :this.state.tempatupacara,
      loc : this.state.lokasiupacara,
      biaya : this.state.biayaupacara,
      username : this.state.username,
      date : this.state.hari,
      ulasan : this.state.ulasanupacara,
      kontak : this.state.kontak,
      postId : this.state.deleteId,
    })
    this.setState({
      animation : false,
    });
    alert("Data Berhasil Dipublikasi");
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

  delitem = () => {
    var userId = firebase.auth().currentUser.uid;
    var database = firebase.database().ref("upacara/"+userId+"/"+this.state.deleteId+"");
    //alert(JSON.stringify(database));
    database.remove();
    this.setState({pilih : false});
    //const { navigate } = this.props.navigation;
    //  navigate('Sarana');
  }

  updateitem = () => {
    this.setState({animation : true});
    var userId = firebase.auth().currentUser.uid;
    let today = new Date();
    let Times = today.getDate() + "/" + today.getMonth() + "/" + today.getFullYear() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let sortTime = -1*today.getTime();// mengambil waktu sekarang utuk sorting

    if(this.state.Imageup == ''){
      let url = this.state.foto;
      var database = firebase.database().ref("upacara/"+userId+"/"+this.state.deleteId+"");
      database.update({
        urlpost : url,
        userId : userId,
        upacara : this.state.upacaranama,
        place :this.state.tempatupacara,
        loc : this.state.lokasiupacara,
        biaya : this.state.biayaupacara,
        date : this.state.date,
        ulasan : this.state.ulasanupacara
      }).then(()=>{
        this.setState({
          pilih : false,
          edit : false,
          animation : false
        });
        const {navigate} = this.props.navigation;
        navigate('Kelola');
      })
    }
    else{
      Blob.build(RNFetchBlob.wrap(this.state.Imageup), { type : 'image/jpeg' }).then((blob)=>{
        firebase.storage().ref("photoupacara").child(""+sortTime+"").put(blob, {contentType : 'image/png'}).then(()=>{
          var storage = firebase.storage().ref("photoupacara/"+sortTime+"");
              storage.getDownloadURL().then((url)=>{
                var database = firebase.database().ref("upacara/"+userId+"/"+this.state.deleteId+"");
                database.update({
                    urlpost : url,
                    userId : userId,
                    upacara : this.state.upacaranama,
                    place :this.state.tempatupacara,
                    loc : this.state.lokasiupacara,
                    biaya : this.state.biayaupacara,
                    date : this.state.date,
                    ulasan : this.state.ulasanupacara
                }).then(()=>{
                    this.setState({
                      pilih : false,
                      edit : false,
                      animation : false
                    });
                    const {navigate} = this.props.navigation;
                    navigate('Kelola');
                });
              });
        });
      });
    }
  }

  search = (cariup) =>{
    if(this.state.cariup == ''){
      alert("Pastikan anda memasukan kata kunci dengan benar ! ");
      this.setState({
        dataSource : this.state.dataSource.cloneWithRows(this.data),
      });
    }
    else{
      this.data=[];
      var userId = firebase.auth().currentUser.uid;
      //alert(userId);
      var database = firebase.database().ref().child("upacara/"+userId+"").orderByChild("upacara").startAt(cariup).endAt(cariup+"\uf8ff");
      //alert(JSON.stringify(database));
      database.on("child_added", (dataSnapshot)=>{
        this.data.push({
          id : dataSnapshot.key,
          foto : dataSnapshot.val().urlpost,
          upacara : dataSnapshot.val().upacara,
          dibuat : dataSnapshot.val().createdAt,
          kontak : dataSnapshot.val().kontak,
          sortTime : dataSnapshot.val().sortTime,
          hari : dataSnapshot.val().date,
          lokasi : dataSnapshot.val().loc,
          tempat : dataSnapshot.val().place,
          biaya : dataSnapshot.val().biaya,
          ulasan : dataSnapshot.val().ulasan,
          userId : dataSnapshot.val().userId,
          username : dataSnapshot.val().username,
          kontak : dataSnapshot.val().kontak,
        });
        //alert(JSON.stringify(dataSnapshot));
        this.setState({
          dataSource : this.state.dataSource.cloneWithRows(this.data),
        });
      });
    }

  }


  
  closeControlPanel = () => {
    this._drawer.close();
  };
  openControlPanel = () => {
    this._drawer.open();
  };

  componentWillMount() {
    AsyncStorage.getItem("userId").then((userId)=>{
      var database = firebase.database().ref("upacara/"+userId+"");
      database.on("child_added", (dataSnapshot)=>{
        this.data.push({
          id : dataSnapshot.key,
          foto : dataSnapshot.val().urlpost,
          upacara : dataSnapshot.val().upacara,
          dibuat : dataSnapshot.val().createdAt,
          kontak : dataSnapshot.val().kontak,
          sortTime : dataSnapshot.val().sortTime,
          hari : dataSnapshot.val().date,
          lokasi : dataSnapshot.val().loc,
          tempat : dataSnapshot.val().place,
          biaya : dataSnapshot.val().biaya,
          ulasan : dataSnapshot.val().ulasan,
          userId : dataSnapshot.val().userId,
          username : dataSnapshot.val().username,
          kontak : dataSnapshot.val().kontak,
        });
        //alert(JSON.stringify(dataSnapshot));
        this.setState({
          dataSource : this.state.dataSource.cloneWithRows(this.data),
        });
      });
    });

    var userId = firebase.auth().currentUser.uid;
    var database = firebase.database().ref("upacara/"+userId+"");
      database.on("child_removed", (dataSnapshot)=>{
        this.data = this.data.filter((x)=>x.id !== dataSnapshot.key);
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
                  <View style={styles.posisi}>
                    <Icon name='paper' style={{marginLeft:20, marginTop:5, color:'#16a085'}}/>
                    <Text style={{textAlign:'center', marginTop:10, fontWeight:'bold', marginLeft:35, color:'black'}}>Kelola Upacara</Text>
                  </View>
              </TouchableOpacity>
               <TouchableOpacity onPress={()=>navigate('Sarana')}>
                  <View style={{height:40, width:300, marginTop:18, flexDirection:'row'}}>
                    <Icon name='flame' style={{marginLeft:20, marginTop:5, color:'#2980b9'}}/>
                    <Text style={{textAlign:'center', marginTop:10, marginLeft:39, color:'black'}}>Sarana Upacara</Text>
                  </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>navigate('Daftar')}>
                  <View style={{height:40, width:300, marginTop:15, flexDirection:'row'}}>
                    <Icon name='bookmarks' style={{marginLeft:20, marginTop:10, color:'#2980b9'}}/>
                    <Text style={{textAlign:'center', marginTop:15, marginLeft:35, color:'black'}}>Daftar Peserta</Text>
                  </View>
              </TouchableOpacity>

              <View style={{height:1, width:width*0.75, backgroundColor:'gray', marginTop:20}}>
              </View>

              <TouchableOpacity onPress={()=>this.logout()}>
                  <View style={{height:60, width:width/2, marginTop:15, flexDirection:'row'}}>
                    <Icon name='lock' style={{marginLeft:20, marginTop:10, color:'#2980b9'}}/>
                    <Text style={{textAlign:'center', marginTop:15, marginLeft:35, color:'black'}}>Log Out</Text>
                  </View>
              </TouchableOpacity>

              <View style={{height:70, marginTop:15, width:width*0.75, backgroundColor:'#bdc3c7'}}>
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

            {/*Modal Input Upacara*/}
            
            <Modal animationType = {"slide"} transparent   = {true} visible  = {this.state.input} onRequestClose ={()=>this.setState({input : false})}>
              <Content>
              <TouchableWithoutFeedback>
                <View style={{height : height, width : width, backgroundColor : 'rgba(51,44,43,0.5)'}}>
                  <TouchableWithoutFeedback>
                    <View style={{backgroundColor : 'white', height : 530, width : width-50, borderRadius : 5, alignSelf : 'center', marginTop : 40}}>
                      <View style={{height : 35, width : width-50, backgroundColor : '#2980b9', borderTopLeftRadius : 5, borderTopRightRadius : 5 }}>
                        <Text style={{color : 'white', fontSize : 18, textAlign : 'center', marginTop : 5}}>Tambah Event Upacara</Text>
                      </View>

                      <View style={{flexDirection:'row', marginTop:10}}>
                        <Text style={{marginTop:10, marginLeft : 10, color : 'black'}}>Upacara           : </Text>
                        <TextInput
                          underlineColorAndroid="transparent"
                          placeholder="Nama Upacara"
                          style={{borderColor: 'black', borderWidth : 1, borderRadius : 5, height: 40, width:185, textAlign:"center", marginTop:3, marginLeft:0}}
                          onChangeText={(text) => this.setState({upacara : text})}
                          value={this.state.upacara}
                        />
                      </View>

                      <View style={{flexDirection:'row', marginTop:10}}>
                        <Text style={{marginTop:10, marginLeft : 10, color : 'black'}}>Tempat            : </Text>
                        <TextInput
                          underlineColorAndroid="transparent"
                          placeholder="Tempat Dilaksanakan"
                          style={{borderColor: 'black', borderWidth : 1, borderRadius : 5, height: 40, width : 185, borderColor: 'black', borderWidth : 1, textAlign:"center", marginTop:0, marginLeft:0}}
                          onChangeText={(text) => this.setState({place : text})}
                          value={this.state.place}
                        />
                      </View>

                      <View style={{flexDirection:'row', marginTop:10}}>
                        <Text style={{marginTop:10, marginLeft : 10, color : 'black'}}>Detail lokasi    : </Text>
                        <TextInput
                          underlineColorAndroid="transparent"
                          placeholder="Alamat Lengkap"
                          style={{borderColor: 'black', borderWidth : 1, borderRadius : 5, height: 40, width : 185, borderColor: 'black', borderWidth : 1, textAlign:"center", marginTop:0, marginLeft:0}}
                          onChangeText={(text) => this.setState({loc : text})}
                          value={this.state.loc}
                        />
                      </View>

                      <View style={{flexDirection:'row', marginTop:10}}>
                        <Text style={{marginTop:10, marginLeft : 10, color : 'black'}}>Biaya                : </Text>
                        <TextInput
                          underlineColorAndroid="transparent"
                          placeholder="Tarif Pendaftar"
                          style={{borderColor: 'black', borderWidth : 1, borderRadius : 5, height: 40, width : 185, borderColor: 'black', borderWidth : 1, textAlign:"center", marginTop:0, marginLeft:0}}
                          onChangeText={(text) => this.setState({biaya : text})}
                          value={this.state.biaya}
                        />
                      </View>

                      
                      <View style={{flexDirection:'row', marginTop:10}}>
                        <Text style={{marginTop:10, marginLeft : 10, color : 'black'}}>Ulasan              : </Text>
                        <TextInput
                          underlineColorAndroid="transparent"
                          placeholder="Penjelasan Pelaksanaan Upacara"
                          style={{borderColor: 'black', borderWidth : 1, borderRadius : 5, height: 40, width : 185, borderColor: 'black', borderWidth : 1, textAlign:"center", marginTop:0, marginLeft:0}}
                          onChangeText={(text) => this.setState({ulasan : text})}
                          value={this.state.ulasan}
                        />
                      </View>

                      <View style={{flexDirection:'row', marginTop:10}}>
                        <Text style={{marginTop:10, marginLeft : 10, color : 'black'}}>Kontak              : </Text>
                        <TextInput
                          underlineColorAndroid="transparent"
                          placeholder="081XXXXXXXXX"
                          style={{borderColor: 'black', borderWidth : 1, borderRadius : 5, height: 40, width : 185, borderColor: 'black', borderWidth : 1, textAlign:"center", marginTop:0, marginLeft:0}}
                          onChangeText={(text) => this.setState({kontak : text})}
                          value={this.state.kontak}
                        />
                      </View>

                      <View style={{flexDirection:'row'}}>
                        <Text style={{marginTop:20, marginLeft : 10, color : 'black'}}>Waktu               : </Text>
                        <View style={{borderWidth:1, height:40, width:185, borderRadius:5, marginTop:10, borderColor:'black'}}>
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
                      </View>


                      <TouchableOpacity onPress={()=>this.imageUpacara()}>
                          <View style={{height:30, width:140, backgroundColor:"#ecf0f1", marginLeft:90, marginTop:20, borderRadius:5, flexDirection:'row'}}>
                            <Icon name='camera' style={{marginLeft:8, marginTop:0, color:'#95a5a6'}}/>
                            <Text style={{color:"black", textAlign:"center", marginLeft:10, marginTop:6}}>Pilih Gambar</Text>
                          </View>
                      </TouchableOpacity>

                      <Text style={{color : 'gray', fontSize : 15, marginTop:20}}>   *) Lengkapi lalu simpan</Text>
                      
                      <View style={{flexDirection:'row', marginTop:-5}}>
                        <TouchableOpacity onPress={()=>this.setState({ input : false })}>
                          <View style={{height:40, width:70, backgroundColor:"red", marginLeft:145, marginTop:10, borderRadius:5}}>
                            <Text style={{color:"white", textAlign:"center", marginTop:10}}>Keluar</Text>
                          </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>this.addup()}>
                          <View style={{height:40, width:70, backgroundColor:"#2980b9", marginLeft:5, marginTop:10, borderRadius:5}}>
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
                        <Text style={{color : 'white', fontSize : 18, textAlign : 'center', marginTop : 5}}>Edit Data Event</Text>
                      </View>

                      <View style={{flexDirection:'row', marginTop:20}}>
                        <Text style={{marginTop:10, marginLeft : 10, color : 'black'}}>Upacara           : </Text>
                        <TextInput
                          underlineColorAndroid="transparent"
                          placeholder="ex : metatah"
                          style={{borderColor: 'black', borderWidth : 1, borderRadius : 5, height: 40, width:185, textAlign:"center", marginTop:3, marginLeft:0}}
                          onChangeText={(text) => this.setState({upacaranama : Text})}
                          value={this.state.upacaranama}
                        />
                      </View>

                      <View style={{flexDirection:'row', marginTop:10}}>
                        <Text style={{marginTop:10, marginLeft : 10, color : 'black'}}>Tempat            : </Text>
                        <TextInput
                          underlineColorAndroid="transparent"
                          placeholder="ex : yadnya grosir"
                          style={{borderColor: 'black', borderWidth : 1, borderRadius : 5, height: 40, width : 185, borderColor: 'black', borderWidth : 1, textAlign:"center", marginTop:0, marginLeft:0}}
                          onChangeText={(text) => this.setState({tempatupacara : text})}
                          value={this.state.tempatupacara}
                        />
                      </View>

                      <View style={{flexDirection:'row', marginTop:10}}>
                        <Text style={{marginTop:10, marginLeft : 10, color : 'black'}}>Detail lokasi    : </Text>
                        <TextInput
                          underlineColorAndroid="transparent"
                          placeholder="ex : jalan kampus unud"
                          style={{borderColor: 'black', borderWidth : 1, borderRadius : 5, height: 40, width : 185, borderColor: 'black', borderWidth : 1, textAlign:"center", marginTop:0, marginLeft:0}}
                          onChangeText={(text) => this.setState({lokasiupacara : text})}
                          value={this.state.lokasiupacara}
                        />
                      </View>

                      <View style={{flexDirection:'row', marginTop:10}}>
                        <Text style={{marginTop:10, marginLeft : 10, color : 'black'}}>Biaya                : </Text>
                        <TextInput
                          underlineColorAndroid="transparent"
                          placeholder="ex : 1.000.000"
                          style={{borderColor: 'black', borderWidth : 1, borderRadius : 5, height: 40, width : 185, borderColor: 'black', borderWidth : 1, textAlign:"center", marginTop:0, marginLeft:0}}
                          onChangeText={(text) => this.setState({biayaupacara : text})}
                          value={this.state.biayaupacara}
                        />
                      </View>

                      <View style={{flexDirection:'row'}}>
                        <Text style={{marginTop:20, marginLeft : 10, color : 'black'}}>Waktu               : </Text>
                        <View style={{borderWidth:1, height:40, width:185, borderRadius:5, marginTop:10, borderColor:'black'}}>
                          <DatePicker
                            style={{width: 200}}
                            date={this.state.hari}
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
                      </View>
                      <View style={{flexDirection:'row', marginTop:10}}>
                        <Text style={{marginTop:10, marginLeft : 10, color : 'black'}}>Ulasan              : </Text>
                        <TextInput
                          underlineColorAndroid="transparent"
                          placeholder="ex : metatah merupakan ... "
                          style={{borderColor: 'black', borderWidth : 1, borderRadius : 5, height: 40, width : 185, borderColor: 'black', borderWidth : 1, textAlign:"center", marginTop:0, marginLeft:0}}
                          onChangeText={(text) => this.setState({ulasanupacara : text})}
                          value={this.state.ulasanupacara}
                        />
                      </View>

                      <TouchableOpacity onPress={()=>this.imageUpacara()}>
                          <View style={{height:30, width:140, backgroundColor:"#ecf0f1", marginLeft:90, marginTop:20, borderRadius:5, flexDirection:'row'}}>
                            <Icon name='camera' style={{marginLeft:8, marginTop:0, color:'#95a5a6'}}/>
                            <Text style={{color:"black", textAlign:"center", marginLeft:10, marginTop:6}}>Ganti Gambar</Text>
                          </View>
                      </TouchableOpacity>

                      <Text style={{color : 'gray', fontSize : 15, marginTop:20}}>   *) Tekan simpan untuk melakukan perubahan data </Text>
                      
                      <View style={{flexDirection:'row', marginTop:-5}}>
                        <TouchableOpacity onPress={()=>this.setState({ edit : false, pilih : false })}>
                          <View style={{height:40, width:70, backgroundColor:"red", marginLeft:145, marginTop:20, borderRadius:5}}>
                            <Text style={{color:"white", textAlign:"center", marginTop:10}}>Keluar</Text>
                          </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>this.updateitem()}>
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

          {/*Modal klik data*/}
            <Modal animationType = {"fade"} transparent   = {true} visible  = {this.state.pilih} onRequestClose ={()=>this.setState({pilih : false})}>
              <TouchableWithoutFeedback onPress={()=>this.setState({pilih : false})}>
                <View style={{height : height, width : width, backgroundColor : 'rgba(51,44,43,0.5)'}}>
                  <TouchableWithoutFeedback>
                    <View style={{backgroundColor : 'white', height : height/4, width : width-100, borderRadius : 5, alignSelf : 'center', marginTop : height/2.5}}>
                      <View style={{height : 35, width : width-100, backgroundColor : '#2980b9', borderTopLeftRadius : 5, borderTopRightRadius : 5 }}>
                        <Text style={{color : 'white', fontSize : 18, textAlign : 'center', marginTop : 5}}>Pilih Satu</Text>
                      </View>

                      <TouchableOpacity onPress={()=>this.delitem()}>
                        <View style={{height:40, width:width-100, marginTop:10, alignItems:'center'}}>
                          <Text style={{color:'black'}}>Hapus Data Upacara</Text>
                        </View>
                      </TouchableOpacity>
              
                      <TouchableOpacity onPress={()=>this.setState({edit : true})}>
                        <View style={{height:40, width:width-100, alignItems:'center'}}>
                          <Text style={{color:'black'}}>Edit Data Upacara</Text>
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity onPress={()=>this.bagikan()}>
                        <View style={{height:40, width:width-100, alignItems:'center'}}>
                          <Text style={{color:'black'}}>Publikasi</Text>
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
                  placeholder="UPACARA"
                  style={{height: 40, width:250, borderWidth: 0, textAlign:"center", marginTop:0, marginLeft:0}}
                  onChangeText={(text) => this.setState({cariup : text})}
                  value={this.state.cariup}
                />
                <Button transparent onPress= {() =>this.search(this.state.cariup)}>
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
                      upacaranama : rowData.upacara,
                      foto : rowData.foto,
                      deleteId : rowData.id,
                      ulasanupacara : rowData.ulasan,
                      hari : rowData.hari,
                      lokasiupacara : rowData.lokasi,
                      tempatupacara : rowData.tempat,
                      biayaupacara : rowData.biaya,
                      dibuat : rowData.dibuat,
                      userId : rowData.userId,
                      sortTime : rowData.sortTime,
                      username : rowData.username,
                      userId : rowData.userId,
                      kontak : rowData.kontak,
                    })}>
                  <View style={{marginTop:15}}>
                    <View style={{width:50, height:100}}>
                      <Image source={{uri : rowData.foto}} style={{width:120, height:120, marginLeft:20}} />
                    </View>
                    <View style={{width:width-55, height:50, position:'absolute', left:150}}>
                      <Text style={{fontSize:15, fontWeight:'bold', color:'black'}}>{rowData.upacara}</Text>
                      <Text style={{fontSize:12, color:'black', marginTop:3}}>{rowData.hari}</Text>
                      <Text style={{fontSize:12, color:'black', marginTop:3}}>{rowData.lokasi}</Text>
                      <Text style={{fontSize:12, color:'black', marginTop:3}}>{rowData.tempat}</Text>
                      <Text style={{fontSize:12, color:'black', marginTop:3}}>Rp. {rowData.biaya}</Text>
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
            onPress={() => this.setState({ input : true })}>
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
    marginTop: 25,
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
