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
      dataId : '',
      foto : '',
      upacara : '',
      hari : '',
      lokasi : '',
      tempat : '',
      biaya : '',
      pengguna : '',
      userId : '',
      detail : '',
      nama : '',
      alamat : '',
      kontak : '',
      namapeserta : '',
      alamatpeserta : '',
      kontakpeserta : '',
      konta : '',
      postId : '',
      cariup : '',
      alert : false,
      view : false,
      peringatan : false,
      tanya : false,
      form : false,
      animation : false,
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

  pendaftaran = () => {
    if(this.state.namapeserta == '' || this.state.alamatpeserta == '' || this.state.kontakpeserta == ''){
      this.setState({
        peringatan : true,
      });
    }
    else{
      this.setState({
        animation : true,
        form : false,
      });
      var database = firebase.database().ref("upacara/"+this.state.userId+"/"+this.state.postId+"/peserta");
      database.push({
        nama : this.state.namapeserta,
        alamat : this.state.alamatpeserta,
        kontak : this.state.kontakpeserta,
      });
      this.setState({
        animation : false,
      });
      alert("Anda Sukses Terdaftar");
    }
  }

  search = (cariup) =>{
    if(this.state.cariup == ''){
      this.data=[];
      alert("Pastikan anda memasukan kata kunci dengan benar ! ");
      this.setState({
        dataSource : this.state.dataSource.cloneWithRows(this.data),
      });
    }
    else{
      this.data=[];
      //alert(userId);
      var database = firebase.database().ref().child("viewup").orderByChild("upacara").startAt(cariup).endAt(cariup+"\uf8ff");
      //alert(JSON.stringify(database));
      database.on("child_added", (dataSnapshot)=>{
        this.data.push({
          id : dataSnapshot.key,
          foto : dataSnapshot.val().urlpost,
          upacara : dataSnapshot.val().upacara,
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
        if(this.data == ''){
          alert("Data tidak tersedia");
        }
        this.setState({
          dataSource : this.state.dataSource.cloneWithRows(this.data),
        });
      });
    }

  }

  componentWillMount() {
      var database = firebase.database().ref("viewup");
      database.on("child_added", (dataSnapshot)=>{
        this.data.push({
          id : dataSnapshot.key, 
          foto : dataSnapshot.val().urlpost, 
          upacara : dataSnapshot.val().upacara, 
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
                  <View style={styles.posisi}>
                    <Icon name='paper' style={{marginLeft:20, marginTop:5, color:'#3498db'}}/>
                    <Text style={{textAlign:'center', marginTop:10, fontWeight:'bold', marginLeft:35, color:'black'}}>Kelola Upacara</Text>
                  </View>
              </TouchableOpacity>
               <TouchableOpacity onPress={()=>navigate('Viewsar')}>
                  <View style={styles.drawvi2}>
                    <Icon name='flame' style={{marginLeft:20, marginTop:10, color:'#3498db'}}/>
                    <Text style={{textAlign:'center', marginTop:15, marginLeft:39, color:'black'}}>Sarana Upacara</Text>
                  </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>this.setState({alert : true})}>
                  <View style={styles.drawvi}>
                    <Icon name='bookmarks' style={{marginLeft:20, marginTop:10, color:'#3498db'}}/>
                    <Text style={{textAlign:'center', marginTop:15, marginLeft:35, color:'black'}}>Daftar Peserta</Text>
                  </View>
              </TouchableOpacity>

              <View style={{height:2, width:width*0.75, backgroundColor:'#f1c40f', marginTop:5}}>
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

    {/*Modal Peringatan Data tidak lengkap*/}
            <Modal animationType = {"fade"} transparent   = {true} visible  = {this.state.peringatan} onRequestClose ={()=>this.setState({peringatan : false})}>
              <TouchableWithoutFeedback onPress={()=>this.setState({peringatan : false})}>
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

    {/* Modal Input Formulir Pendaftaran */}
            <Modal animationType = {"fade"} transparent   = {true} visible  = {this.state.form} onRequestClose ={()=>this.setState({form : false})}>
              <TouchableWithoutFeedback onPress={()=>this.setState({form : false})}>
                <View style={{height : height, width : width, backgroundColor : 'rgba(51,44,43,0.5)'}}>
                  <TouchableWithoutFeedback>
                    <View style={{backgroundColor : 'white', height : 400, width : width-100, borderRadius : 5, alignSelf : 'center', marginTop : 80}}>
                      <View style={{height : 35, width : width-100, backgroundColor : '#2980b9', borderTopLeftRadius : 5, borderTopRightRadius : 5 }}>
                        <Text style={{color : 'white', fontSize : 18, textAlign : 'center', marginTop : 5}}>Formulir Pendaftaran</Text>
                      </View>

                      <Text style={{color : 'black', fontSize : 15, fontStyle:'italic', marginTop:20, marginLeft : 10}}>Nama : </Text>
                      <TextInput
                          underlineColorAndroid="transparent"
                          placeholder="Masukan Nama Disini"
                          onChangeText={(text) => this.setState({namapeserta : text})}
                          style={{borderColor: 'black', borderWidth : 1, fontStyle:'italic', borderRadius : 5, height: 40, width:185, textAlign:"center", marginTop:3, marginLeft : 30}}
                          value={this.state.namapeserta}
                        />

                      <Text style={{color : 'black', fontSize : 15, fontStyle:'italic', marginTop:20, marginLeft : 10}}>Alamat : </Text>
                      <TextInput
                          underlineColorAndroid="transparent"
                          placeholder="Masukan Alamat Disini"
                          onChangeText={(text) => this.setState({alamatpeserta : text})}
                          style={{borderColor: 'black', borderWidth : 1, fontStyle:'italic', borderRadius : 5, height: 40, width:185, textAlign:"center", marginTop:3, marginLeft : 30}}
                          value={this.state.alamatpeserta}
                        />

                      <Text style={{color : 'black', fontSize : 15, fontStyle:'italic', marginTop:20, marginLeft : 10}}>Kontak : </Text>
                      <TextInput
                          underlineColorAndroid="transparent"
                          placeholder="Masukan Kontak Yang Dapat Dihubungi"
                          onChangeText={(text) => this.setState({kontakpeserta : text})}
                          style={{borderColor: 'black', borderWidth : 1, fontStyle:'italic', borderRadius : 5, height: 40, width:185, textAlign:"center", marginTop:3, marginLeft : 30}}
                          value={this.state.kontakpeserta}
                        />

                      <Text style={{marginTop : 20, fontStyle:'italic'}}> *) Pastikan data yang diisi benar </Text>

                      <View style={{flexDirection:'row', alignSelf:'center', marginTop:20}}>
                        <TouchableOpacity onPress={()=>this.setState({ view : false, tanya : false, form : false, kontak : this.state.kontak, dataId : this.state.dataId, userId : this.state.userId})}>
                          <View style={{height:30, width:100, backgroundColor:"red", borderRadius:5}}>
                            <Text style={{color:"white", fontStyle:'italic', textAlign:"center", marginTop:3}}>Batal</Text>
                          </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>this.pendaftaran()}>
                          <View style={{height:30, width:100, backgroundColor:"blue", borderRadius:5}}>
                            <Text style={{color:"white", fontStyle:'italic', textAlign:"center", marginTop:3}}>Pendaftaran</Text>
                          </View>
                        </TouchableOpacity>
                      </View>

                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </TouchableWithoutFeedback>
            </Modal>

    {/* Modal Meyakinkan Mendaftar */}
            <Modal animationType = {"fade"} transparent   = {true} visible  = {this.state.tanya} onRequestClose ={()=>this.setState({tanya : false})}>
              <TouchableWithoutFeedback onPress={()=>this.setState({tanya : false})}>
                <View style={{height : height, width : width, backgroundColor : 'rgba(51,44,43,0.5)'}}>
                  <TouchableWithoutFeedback>
                    <View style={{backgroundColor : 'white', height : 200, width : width-100, borderRadius : 5, alignSelf : 'center', marginTop : height/2.5}}>
                      <View style={{height : 35, width : width-100, backgroundColor : '#2980b9', borderTopLeftRadius : 5, borderTopRightRadius : 5 }}>
                        <Text style={{color : 'white', fontSize : 18, textAlign : 'center', marginTop : 5}}>Culture Event Says</Text>
                      </View>
                      <Text style={{fontSize : 15, fontStyle:'italic', textAlign : 'center', marginTop:20}}>Dengan mengisi formulir dan menekan daftar anda anda akan terdaftar sebagai peserta dan lakukan pembayaran dengan menghubungi cp di : {this.state.kontak}</Text>
                      
                      <View style={{flexDirection:'row', alignSelf:'center', marginTop:10}}>
                        <TouchableOpacity onPress={()=>this.setState({ view : false, tanya : false})}>
                          <View style={{height:30, width:100, backgroundColor:"red", borderRadius:5}}>
                            <Text style={{color:"white", fontStyle:'italic', textAlign:"center", marginTop:3}}>Batal</Text>
                          </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>this.setState({ form : true, tanya : false, kontak : this.state.kontak, dataId : this.state.dataId, userId : this.state.userId})}>
                          <View style={{height:30, width:100, backgroundColor:"blue", borderRadius:5}}>
                            <Text style={{color:"white", fontStyle:'italic', textAlign:"center", marginTop:3}}>Pendaftaran</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </TouchableWithoutFeedback>
            </Modal>

            <Modal animationType = {"fade"} transparent   = {true} visible  = {this.state.animation} onRequestClose ={()=>this.setState({animation : false})}>
              <SkypeIndicator color='black' />
            </Modal>


    {/* Modal Tampil Data */}
          <Modal animationType = {"slide"} transparent   = {true} visible  = {this.state.view} onRequestClose ={()=>this.setState({view : false})}>
              <Content>
              <TouchableWithoutFeedback>
                <View style={{height : height, width : width, backgroundColor : 'rgba(51,44,43,0.5)'}}>
                  <TouchableWithoutFeedback>
                    <View style={{backgroundColor : 'white', height : 580, width : width-50, alignSelf : 'center', marginTop : 20}}>
                      <View style={{height : 35, width : width-50, backgroundColor : '#2980b9'}}>
                        <Text style={{color : 'white', fontSize : 18, textAlign : 'center', marginTop : 5}}>Event Detail</Text>
                      </View>

                      <ListView dataSource = {this.state.dataSource} renderRow={(rowData) =>
                          <View style={{marginTop:10, height:500}}>
                            <Image source={{uri : this.state.foto}} style={{width:180, height:140, alignSelf:'center'}} />
                            <View style={{width:width-55, height:300, position:'absolute', marginTop:150}}>
                              <Text style={{fontSize:15, fontWeight:'bold', color:'black', alignSelf:'center'}}>{this.state.upacara}</Text>
                              <View style={{marginLeft:20}}>
                                <Text style={{fontSize:12, fontWeight:'bold', color:'black', marginTop:10}}>Rahina : </Text>
                                <Text style={{fontSize:12, color:'black'}}>   {this.state.hari}, </Text>

                                <View style={{height:0.5, width:width-40, marginTop:7, marginLeft:-20, backgroundColor:'black'}}></View>

                                <Text style={{fontSize:12, fontWeight:'bold', color:'black', marginTop:7}}>tempat : </Text>
                                <Text style={{fontSize:12, color:'black', marginTop:3}}>   {this.state.tempat}</Text>

                                <View style={{height:1, width:width-40, marginTop:7, marginLeft:-20, backgroundColor:'black'}}></View>

                                <Text style={{fontSize:12, fontWeight:'bold', color:'black', marginTop:7}}>Lokasi : </Text>
                                <Text style={{fontSize:12, color:'black', marginTop:3}}>   {this.state.lokasi}</Text>

                                <View style={{height:1, width:width-40, marginTop:7, marginLeft:-20, backgroundColor:'black'}}></View>

                                <Text style={{fontSize:12, fontWeight:'bold', color:'black', marginTop:7}}>Biaya : </Text>
                                <Text style={{fontSize:12, color:'black', marginTop:3}}>   {this.state.biaya} per peserta</Text>

                                <View style={{height:1, width:width-40, marginTop:7, marginLeft:-20, backgroundColor:'black'}}></View>

                                <Text style={{fontSize:12, fontWeight:'bold', color:'black', marginTop:7}}>Detail Upacara : </Text>
                                <Text style={{fontSize:12, color:'black', marginTop:3}}>   {this.state.detail}</Text>

                                <Text style={{fontSize:10, marginTop:10}}> *) Klik pendaftaran jika ingin menjadi peserta </Text>
                              </View>
                            </View>
                          </View>
                      }
                      />
                      <View style={{flexDirection:'row', alignSelf:'center'}}>
                        <TouchableOpacity onPress={()=>this.setState({ view : false })}>
                          <View style={{height:30, width:100, backgroundColor:"red", borderRadius:5}}>
                            <Text style={{color:"white", fontStyle:'italic', textAlign:"center", marginTop:3}}>Keluar</Text>
                          </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>this.setState({ tanya : true, view : false, kontak : this.state.kontak, dataId : this.state.dataId, userId : this.state.userId})}>
                          <View style={{height:30, width:100, backgroundColor:"blue", borderRadius:5}}>
                            <Text style={{color:"white", fontStyle:'italic', textAlign:"center", marginTop:3}}>Pendaftaran</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
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
                <TouchableOpacity onPress = {() => 
                  this.setState({
                    view : true,
                    dataId : rowData.id,
                    foto : rowData.foto,
                    upacara : rowData.upacara,
                    hari : rowData.hari,
                    tempat : rowData.tempat,
                    lokasi : rowData.lokasi,
                    biaya : rowData.biaya,
                    pengguna : rowData.pengguna,
                    userId : rowData.userId,
                    detail : rowData.detail,
                    kontak : rowData.kontak,
                    postId : rowData.postId,
                  })}>
                  <View style={{marginTop:15, height:140}}>
                    <View style={{width:50, height:100}}>
                      <Image source={{uri : rowData.foto}} style={{width:120, height:120, marginLeft:20}} />
                    </View>
                    <View style={{width:width-55, height:50, position:'absolute', left:150}}>
                      <Text style={{fontSize:15, fontWeight:'bold', color:'black'}}>{rowData.upacara}</Text>
                      <Text style={{fontSize:12, color:'black', marginTop:3}}>{rowData.hari}</Text>
                      <Text style={{fontSize:12, color:'black', marginTop:3}}>{rowData.lokasi}</Text>
                      <Text style={{fontSize:12, color:'black', marginTop:3}}>{rowData.tempat}</Text>
                      <Text style={{fontSize:12, color:'black', marginTop:3}}>Rp. {rowData.biaya}</Text>
                      <Text style={{fontSize:10, marginTop:3}}>Post by : {rowData.pengguna}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              }
              />
            </Content>

      {/*Batas data */}



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
    marginTop:10,
    flexDirection:'row'
    // marginLeft:10,
  },
  drawvi1:{
    height:30, 
    width:width/2, 
    marginTop:20,
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
