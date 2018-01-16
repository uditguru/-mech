import React, {Component} from 'react';
import {AppRegistry, View, AsyncStorage} from 'react-native';
import {StackNavigator} from 'react-navigation';
import Home from './App';
import Options from './options';
import subOptions from  './suboptions';

 const Routes = StackNavigator({
  One: {screen: Home , initialRouteName: Home},
  Two: {screen: Options, },
  Three: {screen: subOptions }
});

export default Routes;
AppRegistry.registerComponent('mech', () => Routes);
