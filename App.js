/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  Button,
  
} from 'react-native';
import LottieView from 'lottie-react-native';

import { Icon } from 'react-native-elements';
import {StackNavigator, NavigationActions} from 'react-navigation';
import MapView from 'react-native-maps';
import Geocoder from 'react-native-geocoder';
import ActionButton from 'react-native-action-button';
import Options from './options';
const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 22.78825;
const LONGITUDE = 75.4324;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class Home extends React.Component {
  static navigationOptions = {
    title: "Home",
  };
  constructor(props) {
    super(props);
    this.state = {
      registered: false,
      value: '',
      region: {
        longitude: LONGITUDE,
        latitude: LATITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }
    }
    this.onRegionChange = this.onRegionChange.bind(this);
    this._getCoords = this._getCoords.bind(this);
  }
  _findMe(){
    navigator.geolocation.getCurrentPosition(
      ({coords}) => {
        const {latitude, longitude} = coords
        this.setState({
          position: {
            latitude,
            longitude,
          },
          region: {
            latitude,
            longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.001,
          }
        })
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    )
  }
  onPress() {
    alert(this.state.value);
  }
  componentDidMount() {
    this._getCoords();
    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = JSON.stringify(position);
      this.setState({
        coordinate: {
          latitude: lastPosition.latitude,
          longitude: lastPosition.longitude,
        }
      });
    });


  }
  onRegionChange(position) {
    this.setState({
      region: {
        latitude: position.latitude,
        longitude: position.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      coordinate: {
        latitude: position.latitude,
        longitude: position.longitude,
      }
    })
    var geoloc = {
      lat : position.latitude,
      lng : position.longitude
    }
    //Geocoder.fallbackToGoogle(AIzaSyCKbwmwJ1pgIexNSrf9Ryak8tZJtHa0yeU);

    Geocoder.geocodePosition(geoloc).then(res => {
      let addressgeo = res[0].formattedAddress;
      
      this.setState({
        value: addressgeo,
      });
      console.log(this.state.value);
    })
      .catch(err => alert(err))
  }
  _getCoords = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position.coords);
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          },
          coordinate: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }
        });
        let tempCoords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        }
        let coords = {
          lat : position.coords.latitude,
          lng : position.coords.longitude
        }

        this._map.animateToCoordinate(tempCoords, 2);
        Geocoder.geocodePosition(coords).then(res => {
        let addressgeo1 = res[0].formattedAddress;
        
      this.setState({
        value: addressgeo1,
      });
      console.log(this.state.value);
    })
      .catch(err => alert(err))
      },
      (Error) => alert(Error),
      { enableHighAccuracy: true, timeout: 2000, maximumAge: 1000 }
    );
  }
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    const navigate = this.props.navigation;
    return (
      <View style={styles.container}>
      
         <MapView
         ref={component => this._map = component}
         style ={styles.map}
         showsUserLocation= {true}
         initialRegion={this.state.region}
         onRegionChangeComplete={this.onRegionChange}
       >
       </MapView>
       <TextInput 
       ref ="textInput"
        style={styles.searchbar}
        value={this.state.value}
        editable = {false}
        clearTextOnFocus= {true}
        clearButtonMode="while-editing"
        >
        </TextInput>
        <View style={styles.iconmap}>
        <Icon size={32}
              color="#000"
              name="map-pin"
              type="font-awesome"
              onPress={() => console.log('hello')}
            />
                  </View>
          <ActionButton icon={(<Icon color="grey" name="location-arrow" type="font-awesome" />)} style={styles.actbt} buttonColor="#fff"  onPress={this._getCoords} />
          
        <View style={styles.caring} >
        
        <Button color="#064"
        title="Start Caring"
        onPress={() => this.props.navigation.navigate("Two")}        />
         </View>
      </View>
 
        
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  searchbar:{
    position :'absolute',
    margin : 10,
    padding: 5,
    top : 1,
    width : '95%',
    backgroundColor : '#FFF',
    fontSize : 12,
    borderRadius : 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 3,
    shadowRadius: 4,
    elevation: 5,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    paddingBottom: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex:1
  },
  caring: {
    padding : 5,
    position: 'absolute',
    bottom: 1,
    width: '100%',
    borderRadius: 100
  },
  actbt: {
    marginBottom: 15,
    padding: 50
  },
  iconmap: {
    marginBottom: 30
  }
});

export default Home;