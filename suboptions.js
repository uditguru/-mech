import React, { Component } from 'react';
import { View,Text, Button,TouchableOpacity ,TextInput, AsyncStorage, FlatList, StyleSheet, ScrollView,ActivityIndicator, ListView, Image, Dimensions} from 'react-native';
import {StackNavigator} from 'react-navigation';
import { List, ListItem, Rating } from 'react-native-elements';
import GridView from 'react-native-super-grid';
import Home from './App';
import Carousel from 'react-native-snap-carousel';
const sliderWidth = Dimensions.get('window');


class subOptions extends React.Component {
static navigationOptions = {
  title : 'Select'
}
  constructor(props) {
    super(props)
      this.state = {
        value : "Indore",
        isLoading: true
      }
  }

  componentDidMount() {
      return fetch('https://still-taiga-32576.herokuapp.com/api/locate')
        .then((response) => response.json())
        .then((responseJson) => {
          let ds = responseJson;
          this.setState({
            isLoading: false,
            dataSource: responseJson
          }, function() {
            // do something with new state
          });
        })
        .catch((error) => {
          console.error(error);
        });

    }
    _renderItem ({item, index}) {
        return (
            <View style={styles.itemContainer}>
                <Image style={styles.imageSlide} source={require('./Bajaj-Allianz.jpg')} />
                <View style={styles.text} >
                <Text style={styles.title}>{ item.name }</Text>
                <Text style={styles.title}>{ item.code }</Text>
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
      if (this.state.isLoading) {
        return (
          <View style={{flex: 1, padding: 50}}>
            <ActivityIndicator />
          </View>
        );
      }

      return (
        <View style={styles.container}>
          <ScrollView>
          <Carousel

                  style={styles.slide}
                  ref={(c) => { this._carousel = c; }}
                  data={items}
                  renderItem={this._renderItem}
                  sliderWidth={sliderWidth.width}
                  itemWidth={250}
                  containerCustomStyle={{ flex: 1 }}
                  slideStyle={{ flex: 1 }}
                />
                </ScrollView>
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
      title: {
        color: "white",
        margin : 15,
        overflow:'hidden',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15
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
        justifyContent: 'flex-end',
        borderRadius: 15,
        marginTop: 10,
        height: 300,
        width : 250,
        backgroundColor : "#064",
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
export default subOptions;
