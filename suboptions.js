import React, { Component } from 'react';
import { View,Text, Button,TouchableOpacity ,TextInput, AsyncStorage, FlatList, StyleSheet, ScrollView,ActivityIndicator, ListView} from 'react-native';
import {StackNavigator} from 'react-navigation';
import { List, ListItem, Rating } from 'react-native-elements';
import GridView from 'react-native-super-grid';
import Home from './App';


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

    render() {
      if (this.state.isLoading) {
        return (
          <View style={{flex: 1, paddingTop: 20}}>
            <ActivityIndicator />
          </View>
        );
      }

      return (
        <GridView

         itemDimension={100}
         items={this.state.dataSource}
         style={styles.gridView}
         renderItem={item => (
           <TouchableOpacity  onPress={() => this.props.navigation.navigate("Three")} style={styles.itemContainer}>
             <Text style={styles.itemName}>{item.id}</Text>
             <Text style={styles.itemCode}>{item.email}</Text>
           </TouchableOpacity>
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
        backgroundColor : "#064"
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
