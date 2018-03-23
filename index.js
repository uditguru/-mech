import React, {Component} from 'react';
import {AppRegistry, View, AsyncStorage} from 'react-native';
import {StackNavigator, TabNavigator} from 'react-navigation';
import Splash from './screens/splash';
import Home from './screens/App';
import Options from './screens/options';
import subOptions from  './screens/suboptions';
import OTPverify from './screens/otpverify';
import Confirmation from './screens/Confirmation';

 const Routes = StackNavigator({
  Splash : {screen: Splash, initialRouteName: Splash},
  One: {screen: Options },
  Two: {screen: Home,  },
  Three: {screen: subOptions },
  Four: {screen: OTPverify},
  Five: {screen: Confirmation }
});

export default Routes;
AppRegistry.registerComponent('mech', () => Routes);
