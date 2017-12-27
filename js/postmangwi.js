import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  AsyncStorage,
  Image,
  StatusBar,
  TextInput,
  Dimensions,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  BackHandler,
  Modal,
  TouchableWithoutFeedback
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import GridView from 'react-native-super-grid';
import Gallery from 'react-native-image-gallery';
import RNFetchBlob from 'react-native-fetch-blob';
import { StackNavigator } from 'react-navigation';
import * as firebase from 'firebase';
import {
    Container, Content, Fab, Item,
    Card, CardItem,Body, Icon, Right
} from 'native-base';
import {
  SkypeIndicator,
  BarIndicator,
  DotIndicator
} from 'react-native-indicators';
var{width,height}=Dimensions.get('window');

const polyfill = RNFetchBlob.polyfill;

window.XMLHttpRequest = polyfill.XMLHttpRequest;
window.Blob = polyfill.Blob;

export default class Post extends Component {
  static navigationOptions = {
      header : null
  };
  
  constructor(props){
    super(props);
    this.state =({
      title : null,
      activityIndicatorColor : 'rgba(230,29,76,1)',
      modalShow : false,
      firebaseError : false,
      images : [],
      currentImage : [],
      imagesUri : [],
      modalVisible : false,
      alert : false,
      galleryStatusBar : 'transparent',
      loading : false,
      Uid : null
    });

    AsyncStorage.multiGet(['userId']).then((data) => {
     this.setState({Uid : data[0][1]});
    });
    
  }

componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backPressed);
}

componentWillUnmount() {
   BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
}

//select image from media
selectImage=()=>{
  this.setState({imagesUri : []});
  ImagePicker.openPicker({
  multiple: true
  }).then(images => {
     this.setState({
        images: images.map(i => {
          return {source : {uri: i.path}};
        }),
        imagesUri: images.map(i => {
          return {path : i.path};
        })
      });
  });
}

//hapus gambar yang tidak ingin diupload
deleteImage=(image)=>{
  this.setState({
     images : this.state.images.filter(function(item) { 
         return item.source.uri !== image.source.uri;
     })
  });
}

//tampilkan gambar dalam galerry mode
openImage=(image)=>{
 this.setState({
     currentImage : this.state.images.filter(i => { 
         return i.source.uri === image.source.uri;
     }),
     modalVisible : true,
     galleryStatusBar : 'black'
  });
}


upload=()=>{
  if (this.state.images.length == 0 || this.state.title == null) {
    this.setState({
      alert : true
    });
  }
  else{
        var path = this.state.imagesUri[0].path;
       
          for(var i =0, len = this.state.imagesUri.length;i<len;i++){
            this.setState({loading : true});
            let today = new Date();
            let Times = today.getDate() + "/" + today.getMonth() + "/" + today.getFullYear() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            let sortTime = -1*today.getTime();// mengambil waktu sekarang utuk sorting

            Blob.build(RNFetchBlob.wrap(""+this.state.imagesUri[i].path+""), { type : 'image/jpeg' })
                  .then((blob) => firebase.storage()
                  .ref("photos/albums/"+this.state.Uid+"/"+this.state.title+"/"+sortTime+"")
                  .put(blob, { contentType : 'image/png', }).then(()=>{
                    var storage = firebase.storage().ref("photos/albums/"+this.state.Uid+"/"+this.state.title+"/"+sortTime+"");    
                    storage.getDownloadURL().then((url)=>{
                        var database = firebase.database().ref("albums/"+this.state.Uid+"/"+this.state.title+"");
                        database.push({
                          sortTime : sortTime,
                          uri : url,
                          dateUploaded : Times
                        }).then(()=>{
                          this.setState({loading : false});
                        });
                    });
                   
                  })//blob endclosing
            );
          }
          this.setState({
            imagesUri : [],
            images : [],
          });
          this.backPressed();
       }
        
}

backPressed = () => {
  const { navigation } = this.props;
  navigation.goBack();
  navigation.state.params.onSelectScreen({ selected: true });
  return true;
}

  render() {
  const { navigate } = this.props.navigation;
    return (
     <Container backgroundColor="white">
        {/*bagian header*/}
        <StatusBar backgroundColor ={this.state.galleryStatusBar} translucent/>
        <View style={{width : width, height : 80, backgroundColor :  'rgba(230,29,76,1)'}}>
          <TouchableOpacity onPress={()=>this.backPressed()} style={{marginTop : 35, width : 30, marginLeft : 10, zIndex : 1}}>
            <Icon name='arrow-back' style={{color : "white", fontSize : 30}} />
          </TouchableOpacity>

          <View style={{width : width, height : 35, position : 'absolute', top : 35, marginLeft : 0}}>
            <Text style={{color : 'white', fontSize : 20, textAlign : 'center'}}>Create Album</Text>
          </View>
        </View>
        {/*modal untuk menampilkan image*/}
        <Modal animationType = {"fade"} transparent = {true} visible = {this.state.modalVisible} onRequestClose ={()=>this.setState({modalVisible : false, galleryStatusBar : 'transparent'})}>
          <View style={{width : width, height : height, backgroundColor : 'black'}}>
               <Gallery style={{ flex: 1, backgroundColor: 'black' }} images={this.state.currentImage}/>
          </View>
        </Modal>
        {/*modal untuk warning*/}
        <Modal animationType = {"fade"} transparent   = {true} visible  = {this.state.alert} onRequestClose ={()=>this.setState({alert : false})}>
          <TouchableWithoutFeedback onPress={()=>this.setState({alert : false})}>
            <View style={{height : height, width : width, backgroundColor : 'rgba(51,44,43,0.5)'}}>
              <TouchableWithoutFeedback>
                <View style={{backgroundColor : 'white', height : height/5, width : width-100, borderRadius : 5, alignSelf : 'center', marginTop : height/2.5}}>
                  <View style={{height : 35, width : width-100, backgroundColor : 'rgba(230,29,76,1)', borderTopLeftRadius : 5, borderTopRightRadius : 5 }}>
                    <Text style={{color : 'white', fontSize : 18, textAlign : 'center', marginTop : 5}}>mazi</Text>
                  </View>
                  <Text style={{color : 'black', fontSize : 15, textAlign : 'center', marginTop : height/20}}>Select Image and add Title!</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        {/*modal untuk loading upload image*/}
        <Modal animationType = {"fade"} transparent   = {true} visible  = {this.state.loading} onRequestClose ={()=>console.log("close")}>
          <TouchableWithoutFeedback >
            <View style={{height : height, width : width, backgroundColor : 'rgba(51,44,43,0.5)'}}>
              <TouchableWithoutFeedback>
                <View style={{backgroundColor : 'white', height : height/5, width : width-100, borderRadius : 5, alignSelf : 'center', marginTop : height/2.5}}>
                  <View style={{height : 35, width : width-100, backgroundColor : 'rgba(230,29,76,1)', borderTopLeftRadius : 5, borderTopRightRadius : 5 }}>
                    <Text style={{color : 'white', fontSize : 18, textAlign : 'center', marginTop : 5}}>Uploading</Text>
                  </View>
                  <View style={{marginTop : 35}}>
                    <DotIndicator color='rgba(230,29,76,1)' size={10} />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
       
        {/*bagian untuk menampilkan list gambar yang bisa di scroll*/}
        <Content>
          <TextInput onChangeText={(title)=>this.setState({title})}
             placeholder="Album Name"
             placeholderTextColor='black'
             underlineColorAndroid = 'transparent'
             value={this.state.title}
             style={{ alignSelf : 'center', borderWidth : 1, borderRadius : 8, height:40, width : width-10, color : 'black', fontSize : 16,borderColor : 'black',marginTop : 20}}/>

           <TouchableOpacity onPress={()=>this.selectImage()} style={{marginTop : 10, alignSelf : 'center'}}>
              <View style={{backgroundColor : 'rgba(230,29,76,1)', width : width-10, height : 40, borderRadius : 8, flexDirection : 'row', alignItems : 'center', alignContent : 'center'}}>
                 <Icon name='camera' style={{color : "white", fontSize : 30, marginTop : 6, marginLeft : (width-10)/3}} />
                 <Text style={{zIndex : 1,color : 'white', fontSize : 16, alignSelf : "center", marginTop : 6, marginLeft : 5}}>Choose Images</Text>
              </View>
            </TouchableOpacity>

            <View style={{marginTop : 10, width : width-10, height : 0.5, backgroundColor : 'grey', alignSelf : 'center'}}></View>
           
            <GridView
                enableEmptySections={true}
                itemWidth={130}
                items={this.state.images}
                renderItem={item => (

                  <View style={{backgroundColor :'rgba(230,29,76,1)'}}>
                  
                    <View style={{width : 30, height: 30, borderRadius : 60,backgroundColor : 'white', position : 'absolute', zIndex : 1,alignItems : 'center', right : 5, top : 5}}>
                      <TouchableOpacity onPress={()=>this.deleteImage(item)} style={{width : 30, height: 30}}>
                        <View style={{width : 30, height: 30, borderRadius : 60, backgroundColor : 'white', position : 'absolute', zIndex : 1, alignItems : 'center'}}>
                          <Icon name='close' style={{fontSize : 20, top : 5}} />
                        </View>
                      </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={()=>this.openImage(item)}>
                      <Image style={{width: (width/2)-15, height : 150}} source={{uri : item.source.uri}} /> 
                    </TouchableOpacity>
                  </View>

                )}
              />

            <View style={{marginTop : 10, width : width-10, height : 0.5, backgroundColor : 'grey', alignSelf : 'center'}}></View>

            <TouchableOpacity onPress={()=>this.upload()} style={{marginTop : 10, alignSelf : 'center'}}>
              <View style={{backgroundColor : 'rgb(116, 237, 237)', width : width-10, height : 40, borderRadius : 8}}>
                  <Text style={{zIndex : 1,color : 'white', fontSize : 16, alignSelf : "center", marginTop : 6}}>Let's Upload</Text>    
              </View>
            </TouchableOpacity>
            <View style={{width : width, height : 50}}></View>
        </Content>
      
     </Container>
    );
  }
}