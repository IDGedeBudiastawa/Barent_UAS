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
  ListView,
  Text,
  View,
  Image,
  TextInput,
  MainView,
  Dimensions,
  ControlPanel,
  Main,
  Modal,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';

var{width, height}=Dimensions.get('window');

import * as firebase from 'firebase';

import { StackNavigator } from 'react-navigation';
import Drawer from 'react-native-drawer';
import Swiper from 'react-native-swiper';
import { Container, Header, Content, Button, Icon, Left, Right, Body, Title} from 'native-base';

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
      profileUri : '',
      dataId : '',
      userId : '',
      tampil : false,
      yakin : false,
      tanya : false,
      dataSource: new ListView.DataSource({rowHasChanged : (row1, row2)=> row1 !== row2}),

    };
    this.data=[];
    this.peserta=[];
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
    navigate('Home');
    return false;
  }

  pesertaevent = (userId, dataId) =>{
    var database = firebase.database().ref("upacara/"+this.state.userId+"/"+this.state.dataId+"/peserta/");
    //alert(JSON.stringify(database));
    database.on("child_added", (Snapshot)=>{
      this.peserta.push({
        nama : Snapshot.val().nama,
        alamat : Snapshot.val().alamat,
        kontak : Snapshot.val().kontak,
      });
      
      //alert(JSON.stringify(Snapshot));
      this.setState({
        dataSource : this.state.dataSource.cloneWithRows(this.peserta),
      });
    });
    this.setState({
      tampil : true,
    });
  }

  componentWillMount() {
    AsyncStorage.getItem("userId").then((userId)=>{
      var database = firebase.database().ref("upacara/"+userId+"");
      database.on("child_added", (dataSnapshot)=>{
        this.data.push({
          id : dataSnapshot.key,
          foto : dataSnapshot.val().urlpost,
          userId : dataSnapshot.val().userId,
          upacara : dataSnapshot.val().upacara,
          hari : dataSnapshot.val().date,
          lokasi : dataSnapshot.val().loc,
          tempat : dataSnapshot.val().place,
          biaya : dataSnapshot.val().biaya,
        });
        this.setState({
          dataSource : this.state.dataSource.cloneWithRows(this.data),
        });
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
                  <View style={{height:40, width:300, marginTop:20, flexDirection:'row'}}>
                    <Icon name='paper' style={{marginLeft:20, marginTop:5, color:'#2980b9'}}/>
                    <Text style={{textAlign:'center', marginTop:10, marginLeft:35, color:'black'}}>Kelola Upacara</Text>
                  </View>
              </TouchableOpacity>
               <TouchableOpacity onPress={()=>navigate('Sarana')}>
                  <View style={{height:40, width:300, marginTop:20, flexDirection:'row'}}>
                    <Icon name='flame' style={{marginLeft:20, marginTop:5, color:'#2980b9'}}/>
                    <Text style={{textAlign:'center', marginTop:10, marginLeft:39, color:'black'}}>Sarana Upacara</Text>
                  </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>navigate('Daftar')}>
                  <View style={styles.posisi}>
                    <Icon name='bookmarks' style={{marginLeft:20, marginTop:5, color:'#16a085'}}/>
                    <Text style={{textAlign:'center', marginTop:10, fontWeight:'bold', marginLeft:35, color:'black'}}>Daftar Peserta</Text>
                  </View>
              </TouchableOpacity>

              <View style={{height:1, width:width*0.75, backgroundColor:'gray', marginTop:20}}>
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

          <View style={{width:width}}>
            <View style={{flexDirection:'row', height:47, backgroundColor:'#3498db'}}>
                <Button transparent onPress= {() =>this.openControlPanel()}>
                  <Icon name='menu' style={{marginTop:-4, color:'white'}}/>
                </Button>
                <Text style={{marginLeft:50, marginTop:8, color:'white', fontWeight:'bold', fontSize:20}}>Daftar Peserta</Text>
                <Button transparent onPress= {() =>navigate('Homelogin')}>
                  <Icon name='home' style={{marginTop:1, color:'white', marginLeft:65}}/>
                </Button>
            </View>
          </View>

          <Modal animationType = {"fade"} transparent   = {true} visible  = {this.state.tampil} onRequestClose ={()=>this.setState({tampil : false})}>
              <TouchableWithoutFeedback onPress={()=>this.setState({tampil : false})}>
                <View style={{height : height, width : width, backgroundColor : 'rgba(51,44,43,0.5)'}}>
                  <TouchableWithoutFeedback>
                    <View style={{backgroundColor : 'white', height : height/4, width : width-100, borderRadius : 5, alignSelf : 'center', marginTop : height/2.5}}>
                      <View style={{height : 35, width : width-100, backgroundColor : '#2980b9', borderTopLeftRadius : 5, borderTopRightRadius : 5 }}>
                        <Text style={{color : 'white', fontSize : 18, textAlign : 'center', marginTop : 5}}>Daftar Peserta</Text>
                      </View>
                

                {/* Belum Mau Masuk Sini */}  
                  
                      <ListView dataSource = {this.state.dataSource} renderRow={(rowData) =>
                          <View style={{marginTop:10}}>
                            
                            <View style={{width:width-55, height:300, position:'absolute', marginTop:150}}>
                              
                              <View style={{marginLeft:20}}>
                                <View style={{flexDirection:'row'}}>
                                  <text>{rowData.nama}</text>
                                  <text>{rowData.alamat}</text>
                                  <text>{rowData.kontak}</text>
                                </View>
                                <Text style={{fontSize:10, marginTop:10}}> *) Klik pendaftaran jika ingin menjadi peserta </Text>
                              </View>
                            </View>
                          </View>
                      }
                      />

                    


                      

                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </TouchableWithoutFeedback>
            </Modal>

            <Modal animationType = {"fade"} transparent   = {true} visible  = {this.state.tanya} onRequestClose ={()=>this.setState({tanya : false})}>
              <TouchableWithoutFeedback onPress={()=>this.setState({tanya : false})}>
                <View style={{height : height, width : width, backgroundColor : 'rgba(51,44,43,0.5)'}}>
                  <TouchableWithoutFeedback>
                    <View style={{backgroundColor : 'white', height : 150, width : width-100, borderRadius : 5, alignSelf : 'center', marginTop : height/2.5}}>
                      <View style={{height : 35, width : width-100, backgroundColor : '#2980b9', borderTopLeftRadius : 5, borderTopRightRadius : 5 }}>
                        <Text style={{color : 'white', fontSize : 18, textAlign : 'center', marginTop : 5}}>Culture Event Says</Text>
                      </View>
                      <Text style={{fontSize : 15, fontStyle:'italic', textAlign : 'center', marginTop:20}}>Tekan Lanjut untuk melanjutkan atau Batal untuk kembali</Text>
                      
                      <View style={{flexDirection:'row', alignSelf:'center', marginTop:10}}>
                        <TouchableOpacity onPress={()=>this.setState({ view : false, tanya : false})}>
                          <View style={{height:30, width:100, backgroundColor:"red", borderRadius:5}}>
                            <Text style={{color:"white", fontStyle:'italic', textAlign:"center", marginTop:3}}>Batal</Text>
                          </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>this.setState({ tanya : false, yakin : true, dataId : this.state.dataId, userId : this.state.userId})}>
                          <View style={{height:30, width:100, backgroundColor:"blue", borderRadius:5}}>
                            <Text style={{color:"white", fontStyle:'italic', textAlign:"center", marginTop:3}}>Lanjutkan</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </TouchableWithoutFeedback>
            </Modal>

            <Modal animationType = {"fade"} transparent   = {true} visible  = {this.state.yakin} onRequestClose ={()=>this.setState({yakin : false})}>
              <TouchableWithoutFeedback onPress={()=>this.setState({yakin : false})}>
                <View style={{height : height, width : width, backgroundColor : 'rgba(51,44,43,0.5)'}}>
                  <TouchableWithoutFeedback>
                    <View style={{backgroundColor : 'white', height : 100, width : width-100, borderRadius : 5, alignSelf : 'center', marginTop : height/2.5}}>
                      <View style={{height : 35, width : width-100, backgroundColor : '#2980b9', borderTopLeftRadius : 5, borderTopRightRadius : 5 }}>
                        <Text style={{color : 'white', fontSize : 18, textAlign : 'center', marginTop : 5}}>Culture Event Says</Text>
                      </View>
                      
                      <View style={{flexDirection:'row', alignSelf:'center', marginTop:10}}>
                        <TouchableOpacity onPress={()=>this.setState({ yakin : false })}>
                          <View style={{height:30, width:100, backgroundColor:"red", borderRadius:5}}>
                            <Text style={{color:"white", fontStyle:'italic', textAlign:"center", marginTop:3}}>Batal</Text>
                          </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>this.pesertaevent(this.state.userId, this.state.dataId)}>
                          <View style={{height:30, width:100, backgroundColor:"blue", borderRadius:5}}>
                            <Text style={{color:"white", fontStyle:'italic', textAlign:"center", marginTop:3}}>Lanjutkan</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </TouchableWithoutFeedback>
            </Modal>

          <Content>
            <ListView dataSource = {this.state.dataSource} renderRow={(rowData) =>
              <TouchableOpacity onPress={()=>
                  this.setState({
                    tanya : true,
                    dataId : rowData.id,
                    userId : rowData.userId,
                  })}>
                <View style={{marginTop:15}}>
                  <View style={{width:50, height:100}}>
                    <Image source={{uri : rowData.foto}} style={{width:120, height:100, marginLeft:20}} />
                  </View>
                  <View style={{width:width-55, height:50, position:'absolute', left:150}}>
                    <Text style={{fontSize:15, fontWeight:'bold', color:'black'}}>{rowData.upacara}</Text>
                    <Text style={{fontSize:12, color:'black', marginTop:3}}>{rowData.hari}</Text>
                    <Text style={{fontSize:12, color:'black', marginTop:3}}>{rowData.lokasi}</Text>
                    <Text style={{fontSize:12, color:'black', marginTop:3}}>Rp. {rowData.biaya}</Text>
                    <TouchableOpacity>
                      <Text style={{color:'blue'}}>Lihat</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            }
            />
          </Content>
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
    marginTop:-5,
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
