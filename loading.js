import Spinkiter from 'react-native-spinkit';
import {Modal,View,StyleSheet,Text} from 'react-native';
import React, {Component} from 'react';

// CircleFlip
// Bounce
// Wave
// WanderingCubes
// Pulse
// ChasingDots
// ThreeBounce
// Circle
// 9CubeGrid
// FadingCircle
// FadingCircleAlt


export default class Spinner extends Component {
    
	render() {
		return (
			// <Modal
			//    visible={true}
			//    animationType="slide"
			//    transparent={true}>
			<View style={styles.container}>
				<Text style={{fontSize: 20,fontWeight: 'bold'}} >Working</Text>
				<Spinkiter isVisible={true} size={80} type={'ThreeBounce'} color={"#000000"}/>
			</View>
			/* </Modal> */
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
    
});