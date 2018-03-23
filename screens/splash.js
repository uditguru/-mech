import React, { Component } from 'react';
import { View,Text, Button, TextInput, AsyncStorage, FlatList, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {StackNavigator} from 'react-navigation';
import Home from './App';
import Options  from './options';
import { List, ListItem, Rating } from 'react-native-elements';
import LottieView from 'lottie-react-native';

class Splash extends Component {
static navigationOptions = {
  header: null
}
  constructor(props) {
    super(props)
    this.state ={
      name: null,
      tapped: false,
      loadStart: false,
      mobile: ''
    }
  }

componentDidMount(){
  if(this.animation)
  this.animation.play();
  AsyncStorage.getItem("@mysuperstore:user").then((value) => {
    if(value !== null){
        this.props.navigation.navigate("Two");
    }
    else{
        this.props.navigation.navigate("One");
    }
});
}

componentWillUnmount(){
  this.setState({
    tapped: false
  });
}
  render() {
    const navigate = this.props.navigation;
    return (
     <View style={styles.container}>
       <LottieView
         style={{width: '100%',height:'100%',alignSelf:'center'}}
         loop={true}
         speed={1}
         ref={(animation)=> this.animation = animation}
         source={require('../anim/splashload.json')}
        />
      </View>
   );
 }
}
const styles = StyleSheet.create({
    container: {
     flex: 1,
     backgroundColor: "white"
    },

  });
export default Splash;
