import React, { Component } from 'react';
import { View,Text, Button, TextInput, AsyncStorage, FlatList, StyleSheet, ScrollView, TouchableOpacity, Dimensions} from 'react-native';
import {StackNavigator} from 'react-navigation';
import Home from './App';
import { List, ListItem, Rating } from 'react-native-elements';
import LottieView from 'lottie-react-native';

const dimen = Dimensions.get('window');

class OTPverify extends Component {
static navigationOptions = {
  header: null
}
  constructor(props) {
    super(props)
    this.state ={
      name: null,
      tapped: false,
      loadStart: false,
      otp: ''
    }
    this.setItem = this.setItem.bind(this);
    this._details =this._details.bind(this);
  }
  componentWillMount(){
    if (this.state.name !== null) {
      this.props.navigation.navigate("Two")
    }
    console.log(this.props.navigation.state.params.userinfo[0]);
  }
componentDidMount(){
  if(this.animation)
  this.animation.play();
}
setItem(): async{
    let key = this.state.name;
    let user = {
      key,
    };
    try {
      AsyncStorage.setItem('user', JSON.stringify(this.props.navigation.state.params.userinfo[0]));
      console.log(AsyncStorage.getItem('user'));
    } catch (e) {
      alert(e);
    }
}
_details(): async{
  let key = this.props.navigation.state.params.userinfo[0];
  let user = {
    key,
  };
  this.setState({
    tapped: true,
  })
    if (this.props.navigation.state.params.user == this.state.text) {

      try {
         AsyncStorage.setItem('@mysuperstore:user', JSON.stringify(user));
         console.log(JSON.stringify(user));
      } catch (e) {
        alert(e);
      }
      this.props.navigation.navigate("Two")
    } else {
      alert("Wrong");
    }
//      this.setState({
//        tapped: false
//      })

}
componentWillUnmount(){
  this.setState({
    tapped: false,
    loadStart: true
  });
}
  render() {
    const navigate = this.props.navigation;

    const items = [
      { name: 'General Service', code: '#1abc9c' }, { name: 'Repair', code: '#2ecc71' },
      { name: 'Car Wash', code: '#3498db' }, { name: 'Painting', code: '#9b59b6' },
      { name: 'Road Support', code: '#16a085' },{ name: 'Offers', code: '#27ae60' }

    ];

   return (
     <View style={styles.container}>
        <LottieView
         style={{width: 200,height:200,alignSelf:'center'}}
         loop={true}
         speed={2}
         ref={(animation)=> this.animation = animation}
         source={require('../anim/code_invite_success.json')}
        />
        <Text style={styles.title}>Enter OTP </Text>
        <TextInput
          style={{fontSize: 20,fontWeight: 'bold', textAlign:'center'}}
          keyboardType="numeric"
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
          ></TextInput>
        <View style={{margin: 15, bottom: 3}}>
          <Button
            color="#064"
            title="submit"
            onPress={this._details}
           />

        </View>
        {this.state.tapped &&
          <LottieView
            style={{width: dimen.width ,height:dimen.height,alignSelf:'center', flex: 2}}
            loop={true}
            speed={1}
            ref={(animation)=>{if(animation) animation.play()}}
            source={require('../anim/animation-w64-h64.json')}
           />
        }

        </View>
   );
 }
}
const styles = StyleSheet.create({
    container: {
     flex: 1,
     backgroundColor: "white"
    },
    sectionHeader: {
      paddingTop: 2,
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 2,
      fontSize: 14,
      fontWeight: 'bold',
      backgroundColor: 'rgba(247,247,247,1.0)',
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
    gridView: {
      paddingTop: 25,
      flex: 1,
    },
    title:{
      fontSize: 24,
      fontWeight : 'bold',
      textAlign: 'center'
    },
    itemContainer: {
      justifyContent: 'flex-end',
      borderRadius: 5,
      padding: 10,
      height: 100,
    },
    itemName: {
      fontSize: 16,
      color: '#fff',
      fontWeight: '600',
    },
    itemCode: {
      fontWeight: '600',
      fontSize: 12,
      color: '#fff',
    },
  });
export default OTPverify;
