import React, {Component} from 'react';
import ImagePicker from 'react-native-image-picker';
// import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
// var ImagePicker = require('react-native-image-picker');

import {
  Platform,
  StyleSheet,
  Text,
  View,
  PixelRatio,
  TouchableOpacity,
  Image,

} from 'react-native';
//import SplashScreen from 'rn-splash-screen';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class pick extends React.Component {
    
    //   componentDidMount() {
    //     setTimeout(() => {
    //       SplashScreen.hide();
    //     }, 2000);
    //   }

    //選擇影片
    selectVideoTapped() {

        var state = {
            avatarSource: null,
            video: null
        };

        const options = {
            
            title: '選擇影片',
            cancelButtonTitle: '取消',
            takePhotoButtonTitle: '錄製',
            chooseFromLibraryButtonTitle: '從圖庫',
            mediaType: 'video',
            videoQuality: 'medium',

            storageOptions:{
                skipBackup:true,
                path:'images'
            }
        };

        ImagePicker.showImagePicker(options, (response) => {

            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled video picker');
            }
            else if (response.error) {
                console.log('Error: ', response.error);
            }
            else {
                this.setState({
                    video: response
                });
                // this.props.actions.UploadVideo();
            
            let video = this.state.video;
            let target_url  = 'http://140.115.87.141:9888/';
            let localUri = video.uri;
            let filename = localUri.split('/').pop()+'.mp4';
            
            console.log('\n\n\n');
            console.log(video);
            console.log('\n\n\n');

            let formData = new FormData();

                formData.append('file', {
                    name: filename,
                    type: 'video/mp4',
                    uri: video.uri,
                    // .replace("file://", ""),     
                });

                fetch(target_url,{
                    method: 'POST',
                    // body: JSON.stringify(formData),
                    body: formData,
                    headers: {
                        // "Accept": "application/json",
                        // "Content-Type": 'application/json',      
                    'Content-Type': 'multipart/form-data'
                    }
                })
                .then(response => {
                console.log("upload success\n", response);
                alert("Upload success!");
                
                //console.log('888')
                return response.text()
                
                })
                .catch(error => {
                console.log("\n\n\nupload error\n\n\n", error);
                    alert("Upload failed!");
                }).then(textData => {
                    this.setState({ name: textData })
                    //download.setState({name: textData})
                    console.log(textData);
                    textname = textData;
                    //this.setState({ success:true})
                    //console.log(this.state.success);
                    //alert("okkkkk");
                    this.props.navigation.navigate('Load')
                })
            }
            
        });
        
    }


    render() {
        return (
            
            <View style={styles.container}>          
                <TouchableOpacity onPress={() => this.selectVideoTapped()}>
                {/* <TouchableOpacity onPress={this.selectVideoTapped.bind(this)}> */}
                    <View style={[styles.avatar, styles.avatarContainer]}>
                        <Text>選擇影片</Text> 
                    </View>
                </TouchableOpacity>

        
            </View>
        );
    }

}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    avatarContainer: {
        borderColor: '#9B9B9B',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        borderRadius: 50,
        width: 100,
        height: 100
    }
});