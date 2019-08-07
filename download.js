import React from 'react';
//import React, {Component} from 'react';
// import * as FileSystem from 'expo-file-system';
import { StyleSheet, Text, View, Button, CameraRoll} from 'react-native';
import Video from 'react-native-video';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
// import RNFetchBlob from "rn-fetch-blob";
// import Video from 'react-native-af-video-player'
// import { Permissions } from 'expo-permissions';

export default class Download extends React.Component {
  state = {
    name: null,
  };

  // saveVideo = (source) => {
  //   CameraRoll.saveToCameraRoll(source, 'video');
  //   // this.setState({ videoUri: ""});
  // }

  render() {
    //let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' ,backgroundColor: 'skyblue'}}>
        
        {//image &&
          //<Image source={{ uri: image }} style={{ width: 250, height: 250 }} />} 
        <Video
					source={{ uri:'http://140.115.87.141:9888/static/'+global.textname }} //http://techslides.com/demos/sample-videos/small.mp4
					// url = {'http://140.115.87.141:9888/static/'+global.textname}
					autoplay
					repeat={true}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          // resizeMode="cover"
          // shouldPlay
          // isLooping//width: 400, height: 270 ,
          style={{ width: 300, height: 270 }}/>}
          
        <Button
          title="Download"
          onPress={this.downloadFile}
        />  
        <Button
          title="share to instagram"
          onPress={this.ShareToIG}
        />
      
      </View>
      
    );
  }
  

  downloadFile() {
    // alert('download!!!!!!!!!!!!!!');
    // const downloadDest = RNFS.DocumentDirectoryPath+'/'+global.textname;
    // RNFS.mkdir( RNFS.DocumentDirectoryPath + '/favorite/')
    // const downloadDest ='file://'+RNFS.DocumentDirectoryPath+'/'+global.textname;
    const downloadDest ='file://'+RNFS.TemporaryDirectoryPath+'/'+global.textname;
    // alert('file://'+RNFS.TemporaryDirectoryPath+'/'+global.textname);
    const formUrl = 'http://140.115.87.141:9888/static/'+global.textname;
    const options = {
      fromUrl: formUrl,
      toFile: downloadDest,
      background: true,
    // begin: (res) => {
    // console.log('begin', res);
    // // console.log('contentLength:', res.contentLength / 1024 / 1024, 'M');
    // },
    //   progress: (res) => {
    //   let pro = res.bytesWritten / res.contentLength;
    //     this.setState({
    //       progressNum: pro,
    //     });
    //   }
    }; // end options
      try {
        // alert('ddddddd');
      RNFS.downloadFile(options).promise
      .then(res => {
        // this.saveVideo(res.uri);
        alert('success');
        // alert(downloadDest);
      CameraRoll.saveToCameraRoll(downloadDest)
                          .then(()=>{
                              alert('圖片已保存到圖片庫')
                          }).catch(()=>{
                              alert('圖片保存失敗')
                          })
                          
      })
      .catch(err => {
        console.log('err', err);
        });
      }
      catch (e) {
      console.log(e);
      }
  }

  // downloadFile = async () => {
	// 	alert("download!!")
	// 	// this.state.videoUri = 'http://140.115.87.141:9888/static/'+global.textname;
	// 	// alert(this.state.videoUri);
  //   // if (this.state.videoUri) {
  //   //     this.saveVideo(this.state.videoUri);
  //   // }

  // } 
    ShareToIG() {

    const shareOptions = {
      title: 'Share via',
      // message: 'some message',
      url: 'file://'+RNFS.TemporaryDirectoryPath+'/'+global.textname,
      social: Share.Social.FACEBOOK
    };
    // Share.open(shareOptions)
    // .then((res) => { console.log(res) })
    // .catch((err) => { err && alert(err); });
    Share.shareSingle(shareOptions);
    
    };

};


//////////////////////////
//     // PickUp.sendname()
//     // DOWNLOAD VIDEO 
//     const videoPath = FileSystem.documentDirectory+global.textname;
//     console.log("1-"+videoPath);//http://techslides.com/demos/sample-videos/small.mp4
//     const resvideo = await FileSystem.downloadAsync('http://140.115.87.141:9888/static/'+global.textname, videoPath);
//     console.log("2-"+resvideo);
//     const status ='granted';
//     //console,log('video');
//     if (status === 'granted') {
//       try{
//         //console.log("prima "+resvideo.uri);
//         const resultvideo = await CameraRoll.saveToCameraRoll(resvideo.uri,'video');
        
//         console.log("CAMERAROLL = "+resultvideo)
//         //this.props.navigation.navigate('cam')
//       }
//       catch(e){
//         console.log("err");
//         console.warn(JSON.stringify(e))
//       }
//     }
//     console.log("done")
    
   


