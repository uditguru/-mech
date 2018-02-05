import React, {Component} from 'react';
import {AppRegistry, View, AsyncStorage} from 'react-native';
import {StackNavigator, TabNavigator} from 'react-navigation';
import Home from './App';
import Options from './options';
import subOptions from  './suboptions';
import OTPverify from './otpverify';

 const Routes = StackNavigator({
  One: {screen: Options , initialRouteName: Options},
  Two: {screen: Home,  },
  Three: {screen: subOptions },
  Four: {screen: OTPverify}
});

export default Routes;
AppRegistry.registerComponent('mech', () => Routes);
