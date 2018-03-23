/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
  TouchableOpacity,
  BackHandler,
  ScrollView,
  TouchableHighlight,
  NetInfo
} from 'react-native';
import RNGooglePlaces from 'react-native-google-places';
import MapViewDirections from 'react-native-maps-directions';

import LottieView from 'lottie-react-native';
import Carousel from 'react-native-snap-carousel';
import Places from './places';
import { Icon, Avatar } from 'react-native-elements';
import {StackNavigator, NavigationActions} from 'react-navigation';
import MapView,{ Marker} from 'react-native-maps';
import Geocoder from 'react-native-geocoder';
import ActionButton from 'react-native-action-button';
import Options from './options';
import locate from '../anim/locat.json';
import MoviePopup from './prompts';
import Confirmation from './Confirmation';
const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 22.78825;
const LONGITUDE = 75.4324;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const screenw = Dimensions.get('window').width;
const screenh = Dimensions.get('window').height;
const sliderWidth = Dimensions.get('window');
const colorDefault = '#FFF',  // white
  colorSelected = '#064';

class Home extends Component {
  static navigationOptions = {
    header: null,
  };


  constructor(props) {
    super(props);
    this.state = {
      booked: false,
      background: new Animated.Value(0),
      registered: false,
      value: '',
      region: {
        longitude: LONGITUDE,
        latitude: LATITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      popupIsOpen: false,
      // Day chosen by user
      chosenDay: 0,       // choose first day by default
      // Time chosen by user
      chosenTime: 0,
      toggle : 1,
      toggletext : "Ride with Pool",
      destination : {
        name : 'Enter Destination'
      }
    }
    this.onRegionChange = this.onRegionChange.bind(this);
    this._getCoords = this._getCoords.bind(this);
    this._getvalue = this._getvalue.bind(this);

  }
  componentWillMount() {
   if (this.props.isChosen) {
     this.animateSelect();
     console.log(chosenTime);
   }
 }
  componentWillReceiveProps(nextProps) {
    if (!this.props.isChosen && nextProps.isChosen) {
      this.animateSelect();
    } else if (this.props.isChosen && !nextProps.isChosen) {
      this.animateDeselect();
    }
  }
  openMovie = (movie) => {
    this.setState({
      isLoading: true,
    })
    this.setState({
      popupIsOpen: true,
      movie,
      isLoading: false,

    });
  }

  closeMovie = () => {
    this.setState({
      popupIsOpen: false,
      // Reset values to default ones
      chosenDay: 0,
      chosenTime: 0,
    });
  }

  chooseDay = (day) => {
    this.setState({
      chosenDay: day,
    });
  }

  chooseTime = (time) => {
    this.setState({
      chosenTime: time,
    });
  }
  animateSelect() {
    Animated.timing(this.state.background, {
      toValue: 100,
      duration: 200,
    }).start();
  }

  animateDeselect() {
    Animated.timing(this.state.background, {
      toValue: 0,
      duration: 200,
    }).start();
  }
  bookTicket = () => {
    this.closeMovie()

    this.setState({
      booked: true,
    })
  }

  cancelBook = () => {
    this.setState({
      booked: false
    })
  }
  _renderItem ({item, index}) {


      return (
          <View style={styles.itemContainer}>
              <Image style={styles.imageSlide} source={require('../images/car.png')} />
              <View style={styles.boxtitle} >
              <Text style={styles.title}>{ item.name }</Text>


            </View>
          </View>
      );
    }

  openSearchModal() {
    RNGooglePlaces.openAutocompleteModal({
      useOverlay: true,
      radius: 0.001,
      country: "IN"
    })
    .then((place) => {
		console.log(place);
    this.setState({
      destination : place
    })
    //var da = {latitude: place.latitude, longitude: place.longitude};
    //const coo = [this.state.coordinate, da ];
    //this._map.fitToCoordinates(coo, {animated: true});
    // place represents user's selection from the
		// suggestions and it is a simplified Google Place object.
    })
    .catch(error => console.log(error.message));  // error is a Javascript Error object
  }

  onPress() {
    alert(this.state.value);
  }
  componentDidMount() {

    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressed);

    this._getCoords();
    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = JSON.stringify(position);
      this.setState({
        coordinate: {
          latitude: lastPosition.latitude,
          longitude: lastPosition.longitude,
        },
        gps: true
      });
    });

  }
  beforechange(position){
    this.setState({
      isLoading: true
    })
    this.onRegionChange(position);
  }
  onRegionChange(position) {
    this.setState({
      isLoading: true
    })
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
      },
      gps: false,
    })
    var geoloc = {
      lat : position.latitude,
      lng : position.longitude
    }
    //Geocoder.fallbackToGoogle(AIzaSyCKbwmwJ1pgIexNSrf9Ryak8tZJtHa0yeU);

    Geocoder.geocodePosition(geoloc).then(res => {

      let addressgeo = res[1].formattedAddress;

      this.setState({
        value: addressgeo.substring(0, 50)+"...",
        btColor: "#4286f4",
        isLoading: false
      });
      console.log(this.state.value);

    })
      .catch(err => {
        Geocoder.geocodePosition(geoloc).then(res => {

          let addressgeo = res[0].formattedAddress;

          this.setState({
            value: addressgeo.substring(0,50)+"...",
            btColor: "#4286f4",
            isLoading: false
          });
          console.log(this.state.value);

        })
        .catch((err)=>{
          return err;
        })
      })


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
          },
          gps: true,
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

        this._map.animateToCoordinate(this.state.coordinate, 4);
        Geocoder.geocodePosition(coords).then(res => {
        let addressgeo1 = res[1].formattedAddress;

      this.setState({
        value: addressgeo1.substring(0,50)+"...",
        btColor: "grey",
        gps: true
      });

    })
      .catch(err => this.setState({value: "Please turn-on location services"}))
      },
      (Error) => this.setState({value: "Please turn-on location services"}),
      { enableHighAccuracy: true, timeout: 2000, maximumAge: 1000 }
    );
}
  _getvalue() {
    return this.state.value;
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressed);
}

onBackButtonPressed() {
    return true;
}
_results(){
  return(
    <Places/>
  )
}
_toggle(index){
  this.setState({
    toggle: index
  })
  if (index == 1) {
    this.setState({
      toggletext : "Ride with Pool"
    })
  }
  else {
    this.setState({
      toggletext : "Accept Riders"
    })
  }
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
    const { value, isChosen, onChoose } = this.props;
    const backgroundColorAnimation = this.state.background.interpolate({
      inputRange: [0, 100],
      outputRange: [colorDefault, colorSelected],
    });
    const items = [
      { name: 'General Service', code: '#1abc9c' }, { name: 'Repair', code: '#2ecc71' },
      { name: 'Car Wash', code: '#3498db' }, { name: 'Paint & Dent', code: '#9b59b6' },
      { name: 'Road Support', code: '#16a085' }

    ];
    mapStyle = [
      {
        "featureType": "administrative.locality",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "visibility": "simplified"
          },
          {
            "weight": 1.5
          }
        ]
      },
      {
        "featureType": "administrative.locality",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "visibility": "on"
          }
        ]
      }
    ]

    return (

      <View style={styles.container}>
        <MapView
         ref={component => this._map = component}
         style ={styles.map}
         showsUserLocation= {true}
         initialRegion={this.state.region}
         onRegionChangeComplete={(position)=>this.beforechange(position)}
         onRegionChange={()=> this.setState({ value :'Checking location...'})}
         customMapStyle={mapStyle}
       >


           { this.state.destination.address &&
             <MapViewDirections
            origin={this.state.coordinate}
            destination={this.state.destination.address}
            apikey="AIzaSyCKbwmwJ1pgIexNSrf9Ryak8tZJtHa0yeU"
            strokeWidth={2.5}
            strokeColor="#338DFF"
            onReady={(result) => {
              console.log(result);
              this.setState({
                itinerary : result
              })
            }}
            onError={(errorMessage) => {
              console.log(errorMessage);

            }}
          />

          }
       </MapView>

       <View
         style={styles.searchbar}
         >

       <TouchableOpacity
         style={{flexDirection: 'row'}}
       ref ="textInput"
        >
          <Image
            style={{width: 10, height: 10,margin: 10}}
            source={require('../images/dest.png')} />
            {this.state.isLoading == true &&
              <LottieView
                style={{position : 'absolute' , flex: 1, height: 50,width: 100, alignSelf: 'center'}}
                loop={true}
                speed={1}
                ref={(animation)=>{if(animation) animation.play()}}
                source={require('../anim/simple_loader.json')}
               />
            }
          {this.state.isLoading== false && <Text style={{margin: 5, fontSize: 12}} >{this.state.value}</Text>}
        </TouchableOpacity>
        <TouchableOpacity
          style={{flexDirection: 'row'}}
        ref ="textInput"
        onPress={()=> this.openSearchModal()}
         >
           <Image
             style={{width: 10, height: 10,margin: 10}}
             source={require('../images/dest.png')} />
           <Text style={{margin: 5, fontSize: 12}}>{this.state.destination.name}</Text>

         </TouchableOpacity>
         {this.state.value !==  "Checking location..." &&
         <Animated.View style={{flexDirection: 'row', alignSelf: 'center'}}>
           <TouchableOpacity>
           <Icon title="Profile" paddingHorizontal={25} color={colorSelected} name="person" type="material-icons" />
         </TouchableOpacity>
         <TouchableOpacity>
           <Icon paddingHorizontal={25} color={colorSelected} name="history" type="material-icons" />
         </TouchableOpacity>
         <TouchableOpacity>
           <Icon paddingHorizontal={25} color={colorSelected} name="local-offer" type="material-icons" />
         </TouchableOpacity>
         <TouchableOpacity>
           <Icon paddingHorizontal={25} color={colorSelected} name="card-giftcard" type="material-icons" />
         </TouchableOpacity>
         <TouchableOpacity
           onPress={()=> this.props.navigation.navigate("Three")}
           >
           <Icon paddingHorizontal={25} color={colorSelected} name="notifications" type="material-icons" />
         </TouchableOpacity>
       </Animated.View>}
       </View>
        <View style={styles.iconmap}>
        <Image
          source={require('../images/pin1.png')}
          style={{width:40,height:40}}
            />
            </View>




        {this.state.value !==  "Checking location..." && this.state.booked == false && <View style={styles.caring}>
          <TouchableOpacity
             onPress={this._getCoords}
            style={{zIndex: 990,borderRadius:100,backgroundColor: "#FFF",width: 45,height: 45, margin: 10, alignSelf: 'flex-end'}}
            >
            <Icon margin={10}  color={this.state.btColor} name="near-me" type="material-icons" />
          </TouchableOpacity>
          {/*<Carousel
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
                />  */}
                <ScrollView>
                {this.state.itinerary  && <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                     style={styles.opt3}
                   >
                     <Image
                       source={require('../images/pool.png')}
                       style={{position : 'absolute' , flex: 1, width: 40, height: 40, marginLeft: 10}}
                     />
                     <Animated.View  style={{alignItems: 'flex-start', marginLeft: 50}}>
                       <Text style={{ color : "#064", fontSize: 10}}>Distance: {this.state.itinerary.distance.toFixed(2)} Kms </Text>
                       <Text style={{ color : "#064", fontSize: 10}}>Approx. Ride Time: {this.state.itinerary.duration.toFixed(1)} mins </Text>
                 </Animated.View>
                 </TouchableOpacity>
               </View>}
               {!this.state.itinerary && <View style={{flexDirection: 'row'}}>
                 <TouchableOpacity
                    style={styles.opt4}
                  >
                    <Image
                      source={require('../images/pool.png')}
                      style={{position : 'absolute' , flex: 1, width: 35, height: 35, marginLeft: 10}}
                    />
                    <Animated.View  style={{alignItems: 'flex-start', marginLeft: 50}}>
                 <Text style={{ color : "#064", fontSize: 12}}>Want to Service or Repair your car? Tap this Box</Text>
                </Animated.View>
                </TouchableOpacity>
              </View>}
               </ScrollView>
                <View style={{flexDirection:'row'}} >

                  <TouchableOpacity
                     style={[styles.opt, this.state.toggle==1 && styles.optAlt]}
                     onPress={() => this._toggle(1)}
                   >
                     <Animated.View>

                   <Text style={{ color : "#064"}, this.state.toggle==1 && {color: "#fff"}}> Ride </Text>
                 </Animated.View>
                 </TouchableOpacity>
                 <TouchableOpacity
                   style={[styles.opt, this.state.toggle==2 && styles.optAlt]}
                    onPress={() => this._toggle(2)}
                  >
                    <Animated.View>

                  <Text style={{ color : "#064"}, this.state.toggle==2 && {color: "#fff"}} > Drive </Text>
                </Animated.View>
                </TouchableOpacity>
              </View>
                {this.state.destination.address && <TouchableHighlight
                  underlayColor="#065"
                  style={styles.buttonContainer}
                  onPress={()=> this.openMovie()}
                >

                  <Text style={styles.button}>{this.state.toggletext}</Text>
                </TouchableHighlight>}

         </View>}
         <View style={styles.caring}>
         {this.state.booked == true &&
           <Confirmation
             trpCancel={this.cancelBook}
            />}
         </View>
         <MoviePopup
           movie={this.state.movie}
           isOpen={this.state.popupIsOpen}
           onClose={this.closeMovie}
           chosenDay={this.state.chosenDay}
           chosenTime={this.state.chosenTime}
           onChooseDay={this.chooseDay}
           onChooseTime={this.chooseTime}
           onBook={this.bookTicket}
           faredetails={this.state.itinerary}
         />
      </View>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
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
    flex:1,
    backgroundColor: "#FFF"
  },
  caring: {
    padding : 5,
    position: 'absolute',
    bottom: 1,
    width: '100%',
    borderRadius: 100
  },
  actbt: {
    marginBottom: 20,
    zIndex: 99
  },
  iconmap: {
    marginBottom: 40,
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
  },
  opt: {
    alignItems: 'center',
    backgroundColor: '#fff',
    width: "45%",
    padding: 10,
    borderRadius: 5,
    borderColor: colorSelected,
    margin: 10,
    borderWidth: 1
  },
  opt3: {
    backgroundColor: '#fff',
    width: "95%",
    padding: 5,
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10
  },
  opt4: {
    backgroundColor: '#fff',
    width: "95%",
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10
  },
  optAlt: {
    alignItems: 'center',
    backgroundColor: colorSelected,
    width: "45%",
    padding: 10,
    borderRadius: 5,
    borderColor: colorSelected,
    margin: 10,
    borderWidth: 1
  },
  buttonContainer: {
    backgroundColor: '#064',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  button: {
    color: '#FFFFFF',
    fontSize: 18,
  }
});

export default Home;
