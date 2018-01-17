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
  Animated,
  Image,
  TouchableOpacity
} from 'react-native';
import LottieView from 'lottie-react-native';
import Carousel from 'react-native-snap-carousel';

import { Icon } from 'react-native-elements';
import {StackNavigator, NavigationActions} from 'react-navigation';
import MapView from 'react-native-maps';
import Geocoder from 'react-native-geocoder';
import ActionButton from 'react-native-action-button';
import Options from './options';
import locate from './locat.json';
const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 22.78825;
const LONGITUDE = 75.4324;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const screenw = Dimensions.get('window').width;
const screenh = Dimensions.get('window').height;
const sliderWidth = Dimensions.get('window');


class Home extends React.Component {
  static navigationOptions = {
    title: "Home",
  };
  constructor(props) {
    super(props);
    this.state = {
      progress: new Animated.Value(0),
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
    this._getvalue = this._getvalue.bind(this);

  }

  _renderItem ({item, index}) {


      return (
          <View style={styles.itemContainer}>
              <Image style={styles.imageSlide} source={require('./car.png')} />
              <View style={styles.boxtitle} >
              <Text style={styles.title}>{ item.name }</Text>


            </View>
          </View>
      );
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
        btColor: "#4286f4"
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
        btColor: "grey"
      });

    })
      .catch(err => alert(JSON.stringify(err)))
      },
      (Error) => alert(JSON.stringify(Error)),
      { enableHighAccuracy: true, timeout: 2000, maximumAge: 1000 }
    );
}
  _getvalue() {
    return this.state.value;
  }
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }
  _checkone(id){
    return fetch('https://still-taiga-32576.herokuapp.com/api/locate')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          userval: responseJson[id],
        });
      })
      .catch((error) => {
        console.error(error);
      });

  }

  render() {
    const navigate = this.props.navigation;

    const items = [
      { name: 'General Service', code: '#1abc9c' }, { name: 'Repair', code: '#2ecc71' },
      { name: 'Car Wash', code: '#3498db' }, { name: 'Paint & Dent', code: '#9b59b6' },
      { name: 'Road Support', code: '#16a085' }

    ];
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
          <ActionButton icon={(<Icon color={this.state.btColor} name="location-arrow" type="font-awesome" />)} style={{marginBottom: 90,zIndex: 990}} buttonColor="#fff"  onPress={this._getCoords} />
          <ActionButton icon={(<Icon color="red" name="local-offer" type="material-icons" />)} style={styles.actbt} buttonColor="#fff"  onPress={()=> this.props.navigation.navigate("Three")} />

        <View style={styles.caring} >
          <Carousel
                  enableMomentum={true}
                  style={styles.slide}
                  ref={(c) => { this._carousel = c; }}
                  data={items}
                  renderItem={this._renderItem}
                  sliderWidth={sliderWidth.width}
                  itemWidth={150}
                  containerCustomStyle={{ flex: 1 }}
                  slideStyle={{ flex: 1 }}
                  scrollEndDragDebounceValue={5}
                  onScroll={() => this._checkone(this._carousel.currentIndex)}
                />
                <Button
                  color="#064"
                title="Start Caring"
                onPress={()=> this.props.navigation.navigate("Two",{ user: this.state.userval})} />
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
  lottivw:{
    height:100,
    width: 50
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
    zIndex: 999
  },
  iconmap: {
    marginBottom: 30
  },
  imageSlide:{
    height : 64,
    width: 64,
    alignSelf:'center',
    position: 'absolute',
    bottom: 5
  },
boxtitle: {
    marginBottom : 10,
    overflow:'hidden',
    backgroundColor : "#0007",
    padding: 5
 },
itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 15,
    marginTop: 5,
    height: 75,
    width : 150,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 90,
    elevation: 5,
    backgroundColor: "#27ae60"

  },
  title:{
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "flex-end"
  }
});

export default Home;
