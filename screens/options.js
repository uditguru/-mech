import React, { Component } from 'react';
import { View,Text, Button, TextInput, AsyncStorage, FlatList, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {StackNavigator} from 'react-navigation';
import Home from './App';
import { List, ListItem, Rating } from 'react-native-elements';
import LottieView from 'lottie-react-native';

class Options extends Component {
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
    this._details =this._details.bind(this);
  }

componentDidMount(){
  if(this.animation)
  this.animation.play();

}

_details(){
  var num = Math.floor(1000 + Math.random() * 9000);

  this.setState({
    tapped: true,
  })
  return fetch('https://control.msg91.com/api/sendhttp.php?authkey=91629AOW6QjOHJRP560a033b&mobiles=91' + this.state.text + '&message=OTP is ' + num + '&sender=Mchcar&route=4&country=91')
  .then((response) => response)
  .then((responseJson) => {
    let ds = responseJson;
    console.log(responseJson);
    this.setState({
      isLoading: false,
    }, function() {
      return fetch('https://still-taiga-32576.herokuapp.com/api/authenticate/'+ this.state.text)
      .then((infod)=> infod.json())
      .then((detailuser)=> {
        console.log(detailuser);
        this.props.navigation.navigate("Four",{user: num, userinfo: detailuser })
      })

    });

      this.setState({
        tapped: false
      })
    })
    .catch((error) => {
      console.error(error);
    });
}
componentWillUnmount(){
  this.setState({
    tapped: false
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
         source={require('../anim/iphone_x_loading.json')}
        />
        <Text style={styles.title}>Enter Your Mobile Number</Text>
        <TextInput
          style={{fontSize: 20,fontWeight: 'bold', textAlign:'center'}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
          keyboardType="numeric"
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
            style={{width: 200,height:200,alignSelf:'center'}}
            loop={false}
            speed={1}
            ref={(animation)=>{if(animation) animation.play()}}
            source={require('../anim/checked_done_.json')}
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
export default Options;
