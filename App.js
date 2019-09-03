/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
// import ChooseImage from './choose.js';
import Download from './download.js';
// import Snap from './camera.js';
import PickUp from './pickup';
import loading from './loading';



class HomeScreen extends React.Component {

  render() {
    //let { image } = this.state;

    return (
      <View style={styles.container}>

        {/* <Button
          title="Camera"
          onPress={() => this.props.navigation.navigate('cam')}
        />    */}
        <Button
          title="Pick from camera roll"
          onPress={() => this.props.navigation.navigate('PickVid')}
        />
        {/* <Button
          title="Download"
          onPress={() => this.props.navigation.navigate('Load')}
        />    */}
      </View>

    );
  }
  
}

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    PickVid: {
      screen: PickUp,
      navigationOptions: {
        header: null,
      }
    },
    Load: {
      screen: Download,
      navigationOptions: {
        header: null,
      }
    },
    Wait: loading,

  },
  {
    initialRouteName: 'PickVid',
  }
);

export default createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});