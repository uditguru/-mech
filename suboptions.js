import React, { Component } from 'react';
import {  View,Text, Button,TouchableOpacity ,
          TextInput, AsyncStorage, FlatList,
          StyleSheet, ScrollView,ActivityIndicator,
          ListView, Image, Dimensions, Animated} from 'react-native';
import {StackNavigator} from 'react-navigation';
import { List, ListItem, Rating } from 'react-native-elements';
import GridView from 'react-native-super-grid';
import Home from './App';
import Carousel from 'react-native-snap-carousel';
import LottieView from 'lottie-react-native';

const sliderWidth = Dimensions.get('window');

const washPlans = [
  {
    name: 'Silver',
    subCat: [{
        name: 'Exterior Wash'
    },
    {
      name: 'Exterior Polish'
    }
    ]
  },
  {
    name: 'Gold',
    subCat: [{
        name: 'Exterior Wash'
    },
  {
    name : 'Interior Cleaning/Vaccum '
  },
  {
   name: 'Car Polish'
 },
  {
    name : 'DashBoard Polish'
  }]
  },
  {
    name : 'Platinum',
    subCat : [{
      name : 'Car Wash'
    },
  {
    name: 'Exterior & Interior Cleaning',
  },{
    name : 'Interior Vaccum'
  },{
    name : 'Car Polish : Wax',
  },{
    name : 'Teflon',
  },{
    name : 'Interior Dashboard Polish'
  },{
    name : 'Paint Protection: Scratch Removal'
  }]
  }

];


class subOptions extends Component {
static navigationOptions = {
  title : 'Packages'
}
  constructor(props) {
    super(props)
      this.state = {
        value : "Indore",
        isLoading: true
      }
      this._book = this._book.bind(this);
  }

    _book(){
    
      return fetch('https://still-taiga-32576.herokuapp.com/api/book',{
        method: 'POST',
        header:{
          Accept: 'application/json',
          'Content-Type': 'application-json'
        },
        body:JSON.stringify({
          name : "Udit",
          mobile: '9009005929',
          email : 'guru@udit.com'
        })
      }).then(response => response)
      .then(dta => {
        console.log(dta);
      }).catch(err => console.log(err))
    }
    _renderItem ({item, index}) {
      const clone = item.subCat
        return (
            <View style={styles.itemContainer}>
                <View style={styles.boxtitle} >
                <Text style={styles.title}>{ item.name }</Text>
                <View style={{padding: 5}}>
                <FlatList
                    data={clone}
                    keyExtractor={(item, index) => index}
                    renderItem={({item}) => <Text style={{color: "white",paddingTop: 5, textAlign: 'center'}}>- {item.name}</Text>}
                  />
                  </View>
              </View>
            </View>
        );


        }
    render() {
      const items = [
        { name: 'General Service', code: '#1abc9c' }, { name: 'Repair', code: '#2ecc71' },
        { name: 'Car Wash', code: '#3498db' }, { name: 'Painting', code: '#9b59b6' },
        { name: 'Road Support', code: '#16a085' },{ name: 'Offers', code: '#27ae60' }

      ];
      const washPlans = [
        {
          name: 'Silver',
          subCat: [{
              name: 'Exterior Wash'
          },
          {
            name: 'Exterior Polish'
          }
          ]
        },
        {
          name: 'Gold',
          subCat: [{
              name: 'Exterior Wash'
          },
        {
          name : 'Interior Cleaning/Vaccum '
        },
        {
         name: 'Car Polish'
       },
        {
          name : 'DashBoard Polish'
        }]
        },
        {
          name : 'Platinum',
          subCat : [{
            name : 'Car Wash'
          },
        {
          name: 'Exterior & Interior Cleaning',
        },{
          name : 'Interior Vaccum'
        },{
          name : 'Car Polish : Wax',
        },{
          name : 'Teflon',
        },{
          name : 'Interior Dashboard Polish'
        },{
          name : 'Paint Protection: Scratch Removal'
        }]
        }

      ];
      console.log(washPlans);


      return (
        <View style={styles.container}>
          <Carousel

                  style={styles.slide}
                  ref={(c) => { this._carousel = c; }}
                  data={washPlans}
                  renderItem={this._renderItem}
                  sliderWidth={sliderWidth.width}
                  itemWidth={250}
                  containerCustomStyle={{ flex: 1 }}
                  slideStyle={{ flex: 1 }}
                />
                <LottieView
                  style={{width:150, height:150, alignSelf: 'center',backgroundColor: 'transparent'}}
                  speed={1}
                  ref={(animation) => {
                    if (animation) animation.play();
                  }}
                  source={require('./locat.json')}
                />
              <View style={{margin : 10}}>
                <Button
                  color="#064"
                  title="Book"
                  onPress={()=> this._book()}
                 />
                 </View>
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
