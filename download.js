import React from 'react';
//import React, {Component} from 'react';
// import * as FileSystem from 'expo-file-system';
import {
  StyleSheet,
  Text,
  View,
  CameraRoll,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import Video from 'react-native-video';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
// import RNFetchBlob from "rn-fetch-blob";
// import Video from 'react-native-af-video-player'
// import { Permissions } from 'expo-permissions';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

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

      <View style={styles.container}>      
        {/* //<Image source={{ uri: image }} style={{ width: 250, height: 250 }} />}  */}
        <Video
          source={{ uri:'http://140.115.87.141:9888/static/'+global.textname }} //http://techslides.com/demos/sample-videos/small.mp4
          // source={{ uri:'http://techslides.com/demos/sample-videos/small.mp4' }}
          // url = {'http://140.115.87.141:9888/static/'+global.textname}
          // source={require('./Image/V_20190810_233541_vHDR_Auto.mp4')}
          // source={require('./Image/small.mp4')}
          autoplay
          repeat={true}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="contain"
          // shouldPlay
          // isLooping//width: 400, height: 270 ,
          style={{
            width: width,
            height: height,
            position: 'absolute',
            // resizeMode:'contain',
          }}
        />  {/* end of Video*/}
        
        <TouchableOpacity onPress={() => this.ShareToIG()}
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          {/* <TouchableOpacity onPress={this.selectVideoTapped.bind(this)}> */}
          <View style={[styles.buttonstyle]}>
            <Image style={{ height: width * 0.05, width: width * 0.05, margin: 10 }} source={require('./Image/instagram.png')} />
            {/* <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#fff' }}>Share</Text> */}
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.ShareToFB()}
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          {/* <TouchableOpacity onPress={this.selectVideoTapped.bind(this)}> */}
          <View style={[styles.buttonstyle]}>
            <Image style={{ height: width * 0.05, width: width * 0.05, margin: 10 }} source={require('./Image/facebook.png')} />
            {/* <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#fff' }}>Download Video</Text> */}
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.downloadFile()}
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          {/* <TouchableOpacity onPress={this.selectVideoTapped.bind(this)}> */}
          <View style={[styles.buttonstyle]}>
            <Image style={{ height: width * 0.05, width: width * 0.05, margin: 10 }} source={require('./Image/download_white.png')} />
            {/* <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#fff' }}>Download Video</Text> */}
          </View>
        </TouchableOpacity>

      </View>

    );
  }


  downloadFile() {
    // const downloadDest = RNFS.DocumentDirectoryPath+'/'+global.textname;
    // RNFS.mkdir( RNFS.DocumentDirectoryPath + '/favorite/')
    // const downloadDest ='file://'+RNFS.DocumentDirectoryPath+'/'+global.textname;
    const downloadDest = 'file://' + RNFS.TemporaryDirectoryPath + '/' + global.textname;
    const formUrl = 'http://140.115.87.141:9888/static/' + global.textname;
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
    }; 

    try {
      RNFS.downloadFile(options).promise
        .then(res => {
          // this.saveVideo(res.uri);
          alert('success');
          // alert(downloadDest);
          CameraRoll.saveToCameraRoll(downloadDest)
          .then(() => {
            alert('圖片已保存到圖片庫')
          }).catch(() => {
            alert('圖片保存失敗')
          })

        })
        .catch(err => {
          console.log('err', err);
        });
    } catch (e) {
      console.log(e);
    }
  }

  ShareToIG() {
    const shareOptions = {
      title: 'Share via',
      // message: 'some message',
      url: 'file://' + RNFS.TemporaryDirectoryPath + '/' + global.textname,
      social: Share.Social.INSTAGRAM,
    };
    // Share.open(shareOptions)
    // .then((res) => { console.log(res) })
    // .catch((err) => { err && alert(err); });
    Share.shareSingle(shareOptions);
  };

  ShareToFB() {
    // if(RNFS.exists(filepath))
    //     s=" exists.";
    // else
    //     s=" doesn't exist.";
    // alert(filepath + s);

    const shareOptions = {
      title: 'Share via',
      // message: 'some message',
      url: 'file://' + RNFS.TemporaryDirectoryPath + '/' + global.textname,
      social: Share.Social.FACEBOOK,
    };
    // Share.open(shareOptions)
    // .then((res) => { console.log(res) })
    // .catch((err) => { err && alert(err); });
    Share.shareSingle(shareOptions);
  };
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: '#000',
  },
  logo: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  buttonstyle: {
    // flexDirection: 'row',
    flexDirection: 'row',
    justifyContent: 'center',
    // borderColor: '#5c82cf',
    borderColor:'#fff',
    alignItems: 'center',
    // backgroundColor: '#F5FCFF',
    backgroundColor: 'rgba(0,0,0,0.3)',
    // borderWidth: 1,
    borderRadius: 999,
    padding: 10,
    // paddingHorizontal: 20,
    marginBottom: 10,
    // width: '60%',
    // margin: 30,
    // height: 80,
    // width: 150

  }
});