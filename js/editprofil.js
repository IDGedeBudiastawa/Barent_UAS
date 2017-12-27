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
  TextInput,
  MainView,
  Modal,
  Dimensions,
  Picker,
  BackHandler,
  ControlPanel,
  Main,
  ImageBackground,
  TouchableOpacity
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
import DatePicker from 'react-native-datepicker';
import Swiper from 'react-native-swiper';
import RNFetchBlob from 'react-native-fetch-blob';
import ImagePicker from 'react-native-image-crop-picker';
import { Container, Header, Content, Button, Icon, Left, Right, Body, Title} from 'native-base';


const polyfill = RNFetchBlob.polyfill;

window.XMLHttpRequest = polyfill.XMLHttpRequest;
window.Blob = polyfill.Blob; 


export default class epro extends Component {  
  static navigationOptions = {
    header : null
  };

  constructor(props) {
    super(props);
    this.state = {
      user1: 'Useless placeholder' ,
      password : '',
      fullName : '',
      kelamin : '',
      birthday : '',
      Uid : '',
      username : '',
      date : '02-03-1997',
      userId : '',
      email : '',
      profileUri : '',
      PhotoProfile : '',
      PhotoTemp : '',
      animation : false
    };
    AsyncStorage.multiGet(['userId','username', 'fullName', 'email', 'kelamin', 'birthday']).then((data) => {
      //alert(JSON.stringify(data));
      this.setState({
        Uid : data[0][1],
        username : data[1][1],
        fullName : data[2][1],
        email : data[3][1],
        kelamin : data[4][1],
        birthday : data[5][1],
      });

          let storage = firebase.storage().ref("admin/"+data[0][1]+"/PhotoProfile/").child(data[0][1]);
          storage.getDownloadURL().then((url)=>{
            this.setState({profileUri:url, PhotoTemp:url});
          }).catch((error)=>{
            this.setState({
              profileUri:"https://firebasestorage.googleapis.com/v0/b/barent-aa8ea.appspot.com/o/usermale.png?alt=media&token=8faafb1a-4d21-439a-84ea-2f1be05b2e6f",
              PhotoTemp:"https://firebasestorage.googleapis.com/v0/b/barent-aa8ea.appspot.com/o/usermale.png?alt=media&token=8faafb1a-4d21-439a-84ea-2f1be05b2e6f"
          });
            //alert('halo')
          });
     });
  }


  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backPressed);
    //alert(this.state.email+','+this.state.kelamin);
    

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


  closeControlPanel = () => {
    this._drawer.close();
  };
  openControlPanel = () => {
    this._drawer.open();
  };

  chooseImage = () => {
    //this.setState({imagesUri : []});
    ImagePicker.openPicker({
    width: 300,
    height: 400,
    cropping: true
    }).then(image => {
      //alert(JSON.stringify(image))
      this.setState({
        profileUri: image.path
      });
    });
  }

  eprof = () => {
    AsyncStorage.multiGet(["userId"]).then((data)=>{
      //blob
      //alert('halo')
      this.setState({ animation : true });

      if(this.state.profileUri == this.state.PhotoTemp){
        var database = firebase.database().ref("admin/"+data[0][1]+"");
        database.update({
          username : this.state.username,
          fullName : this.state.fullName,
          email : this.state.email,
          kelamin : this.state.kelamin,
          birthday : this.state.date,
        });
        this.setState({ animation : false });
        alert("Sukses");
      }
      else{
        Blob.build(RNFetchBlob.wrap(this.state.profileUri), { type : 'image/jpeg' })
            .then((blob) => firebase.storage().ref("admin/"+data[0][1]+"/PhotoProfile/").child(data[0][1])         
            .put(blob, { contentType : 'image/png', }).then(()=>{
              var storage = firebase.storage().ref("admin/"+data[0][1]+"/PhotoProfile/").child(data[0][1]);    
              storage.getDownloadURL().then((url)=>{
                  var database = firebase.database().ref("admin/"+data[0][1]+"");
                  //alert(database);
                  database.update({
                    PhotoProfile : url,
                    username : this.state.username,
                    fullName : this.state.fullName,
                    email : this.state.email,
                    kelamin : this.state.kelamin,
                    birthday : this.state.date,
                  });
              });
            
            })//blob endclosing
        );
        //blob end
        this.setState({ animation : false });
        alert("Sukses");
      }
    });

    AsyncStorage.multiSet([
      ["username", this.state.username],
      ["fullName", this.state.fullName],
      ["kelamin", this.state.kelamin],
      ["birthday", this.state.birthday],
    ]);
    //alert("Edit Profile Sukses")
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
                  <View style={styles.posisi}>
                  <Icon name='person' style={{marginLeft:20, marginTop:6, color:'#16a085'}}/>
                    <Text style={{textAlign:'center', marginTop:12, fontWeight:'bold', marginLeft:35, color:'black'}}>Profile</Text>
                  </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>navigate('Kelola')}>
                  <View style={{height:40, width:300, marginTop:18, flexDirection:'row'}}>
                    <Icon name='paper' style={{marginLeft:20, marginTop:5, color:'#2980b9'}}/>
                    <Text style={{textAlign:'center', marginTop:10, marginLeft:35, color:'black'}}>Kelola Upacara</Text>
                  </View>
              </TouchableOpacity>
               <TouchableOpacity onPress={()=>navigate('Sarana')}>
                  <View style={{height:40, width:300, marginTop:18, flexDirection:'row'}}>
                    <Icon name='flame' style={{marginLeft:20, marginTop:5, color:'#2980b9'}}/>
                    <Text style={{textAlign:'center', marginTop:10, marginLeft:39, color:'black'}}>Sarana Upacara</Text>
                  </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>navigate('Daftar')}>
                  <View style={{height:40, width:300, marginTop:18, flexDirection:'row'}}>
                    <Icon name='bookmarks' style={{marginLeft:20, marginTop:10, color:'#2980b9'}}/>
                    <Text style={{textAlign:'center', marginTop:15, marginLeft:35, color:'black'}}>Daftar Peserta</Text>
                  </View>
              </TouchableOpacity>

              <View style={{height:1, width:width*0.75, backgroundColor:'gray', marginTop:20}}>
              </View>

              <TouchableOpacity onPress={()=>this.logout()}>
                  <View style={{height:60, width:width/2, marginTop:18, flexDirection:'row'}}>
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

            <Modal animationType = {"fade"} transparent   = {true} visible  = {this.state.animation} onRequestClose ={()=>this.setState({animation : false})}>
              <SkypeIndicator color='black' />
            </Modal>

            <View style={{flexDirection:'row', height:60, backgroundColor:'#3498db'}}>
              <Button transparent onPress= {() =>this.openControlPanel()}>
                <Icon name='menu' style={{marginTop:10, color:'white'}}/>
              </Button>
              <Text style={{marginTop:15, marginLeft:86, fontWeight:'bold', fontSize:20, color:'white'}}>Profile</Text>
              <Button transparent onPress= {() =>navigate('Homelogin')}>
                <Icon name='home' style={{marginTop:10, color:'white', marginLeft:130}}/>
              </Button>
            </View>



            <Content style={{alignSelf:'center'}}>
            <ImageBackground style={{height:150, width:150, borderRadius:150, marginLeft:100, marginTop:20}}
              source={{uri : this.state.profileUri}}>
              <TouchableOpacity onPress={()=>this.chooseImage()}>
                  <View style={{height:40, width:40, marginTop:110, marginLeft:110, borderRadius:40, backgroundColor:'white'}}>
                    <Icon name='camera' style={{marginLeft:8, marginTop:6, color:'#95a5a6'}}/>
                  </View>
              </TouchableOpacity>

            </ImageBackground>


            <View style={{flexDirection:'row', marginTop:30}}>
              <Text style={{marginTop:30, color:'black'}}>Username   </Text>
              <TextInput
                underlineColorAndroid="transparent"
                style={{height: 40, width:250, borderWidth: 1, textAlign:"center", marginTop:20, backgroundColor:'#ecf0f1', borderRadius:10}}
                onChangeText={(text) => this.setState({username : text})}
                value={this.state.username}
              />
            </View>

            <View style={{flexDirection:'row'}}>
              <Text style={{marginTop:30, color:'black'}}>Fullname    </Text>
              <TextInput
                onChangeText={(text) => this.setState({fullName: text})}
                underlineColorAndroid="transparent"
                style={{height: 40, width:250, borderWidth: 1, textAlign:"center", marginTop:20, backgroundColor:'#ecf0f1', borderRadius:10}}
                value={this.state.fullName}
              />
            </View>

            <View style={{flexDirection:'row'}}>
              <Text style={{marginTop:30, color:'black'}}>E-mail         </Text>
              <TextInput
                onChangeText={(text) => this.setState({email: text})}
                underlineColorAndroid="transparent"
                style={{height: 40, width:250, borderWidth: 1, textAlign:"center", marginTop:20, backgroundColor:'#ecf0f1', borderRadius:10}}
                value={this.state.email}
              />
            </View>

            <View style={{flexDirection:'row'}}>
              <Text style={{marginTop:30, color:'black'}}>Gender       </Text>
              <View style={{height:40, width:250, borderWidth:1, textAlign:"center", marginTop:20, backgroundColor:'#ecf0f1', borderRadius:10}}>
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
            </View>

            <View style={{flexDirection:'row'}}>
              <Text style={{marginTop:30, color:'black'}}>Birthday     </Text>
              <View style={{borderWidth:1, height:40, width:250, marginTop:20, backgroundColor:'#ecf0f1', borderRadius:10}}>
                <DatePicker
                  style={{width: 200}}
                  date={this.state.birthday}
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

            <Button onPress={()=>this.eprof()} style={{alignSelf : 'center', width:250, height:40, marginTop:20, borderRadius:5, backgroundColor:'#e74c3c'}}>
              <Text style={{textAlign:'center', marginTop:-2, marginLeft:76, color:'black'}}>Save Change</Text>
            </Button>

          </Content>

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
    marginTop:10,
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
