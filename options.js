import React, { Component } from 'react';
import { View,Text, Button, TextInput, AsyncStorage, FlatList, StyleSheet, ScrollView} from 'react-native';
import {StackNavigator} from 'react-navigation';
import Home from './App';
import { List, ListItem, Rating } from 'react-native-elements';
import GridView from 'react-native-super-grid';



class Options extends Component {
static navigationOptions = {
  title : 'Options'
}
  constructor(props) {
    super(props)
    this.state ={
      name: null,
    }
    this.setItem = this.setItem.bind(this);
  }

setItem(): async{
    let key = this.state.name;
    let user = {
      name: key,
    };
    try {
      AsyncStorage.setItem('user', JSON.stringify(user));
      console.log(user);
    } catch (e) {
      alert(e);
    }
}
  render() {
    const items = [
      { name: 'TURQUOISE', code: '#1abc9c' }, { name: 'EMERALD', code: '#2ecc71' },
      { name: 'PETER RIVER', code: '#3498db' }, { name: 'AMETHYST', code: '#9b59b6' },
      { name: 'WET ASPHALT', code: '#34495e' }, { name: 'GREEN SEA', code: '#16a085' },
      { name: 'NEPHRITIS', code: '#27ae60' }, { name: 'BELIZE HOLE', code: '#2980b9' },
      { name: 'WISTERIA', code: '#8e44ad' }, { name: 'MIDNIGHT BLUE', code: '#2c3e50' },
      { name: 'SUN FLOWER', code: '#f1c40f' }, { name: 'CARROT', code: '#e67e22' }
      
    ];

   return (
       <GridView
        itemDimension={100}
        items={items}
        style={styles.gridView}
        renderItem={item => (
          <View style={[styles.itemContainer, { backgroundColor: item.code }]}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemCode}>{item.code}</Text>
          </View>
        )}
      />
   );
 }
}
const styles = StyleSheet.create({
    container: {
     flex: 1,
     paddingTop: 22
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