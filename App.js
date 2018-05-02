import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
// import ProgressCircle from 'react-native-progress-circle'
import ProgressCircle from './PercentageCircle'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  render() {
    return (
      <View style={{alignSelf : 'center', alignItems : 'center' , justifyContent :'center',flex: 1}}>
      <ProgressCircle
        percent={30}
        radius={50}
        borderWidth={8}
        color="#3399FF"
        shadowColor="#999"
        bgColor="#fff"
      >
        <Text style={{ fontSize: 18 }}>{'30%'}</Text>
      </ProgressCircle>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
