import React, { Component } from 'react';
import {  View,Text, Button,TouchableOpacity ,
          TextInput, AsyncStorage, FlatList,
          StyleSheet, ScrollView,ActivityIndicator,
          ListView, Image, Dimensions, Animated} from 'react-native';
import {StackNavigator} from 'react-navigation';
import { List, ListItem, Rating } from 'react-native-elements';
import Home from './App';
import Carousel from 'react-native-snap-carousel';
import LottieView from 'lottie-react-native';

const sliderWidth = Dimensions.get('window');

class subOptions extends Component {
static navigationOptions = {
  title : 'Notifications'
}
  constructor(props) {
    super(props)
      this.state = {
        value : "Indore",
        isLoading: true
      }
  }

    render() {
          return (
        <View style={styles.container}>

                <LottieView
                  style={{width:500, height:500, alignSelf: 'center',backgroundColor: 'transparent'}}
                  loop={true}
                  speed={1}
                  ref={(animation) => {
                    if (animation) animation.play();
                  }}
                  source={require('../anim/no_notifications!.json')}
                />
                <Text style={{textAlign:'center'}}>You have no notifications.</Text>
              </View>
      );
    }
  }
  const styles = StyleSheet.create({
      container: {
       flex: 1,
       paddingTop: 22,
      },
      slide: {
        flex: 1,
        backgroundColor: "grey"
      },
      text:{
        backgroundColor: "#00000050",

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
      imageSlide:{
        height : 300,
        width: 250,
        position :'absolute',
        borderRadius : 15
      },
      boxtitle: {
        margin : 15,
        overflow:'hidden',
        padding : 5
     },
      title:{
        color:"#FFF",
        alignSelf: "center",
        fontSize : 42,
        fontWeight: 'bold'
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
      itemContainer: {
        justifyContent: 'flex-start',
        borderRadius: 15,
        marginTop: 5,
        height: 300,
        width : 250,
        backgroundColor : "#064",
        padding: 10,
        shadowOffset: {width : 0, height: 0},
        shadowRadius: 90,
        shadowOpacity: 1,
        shadowColor: "black",
        elevation: 5
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
      lottivw:{
        height:100,
        width: 100
      }
    });
export default subOptions;
