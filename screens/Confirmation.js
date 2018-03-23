import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Animated
} from 'react-native';
import {StackNavigator, NavigationActions} from 'react-navigation';
import { defaultStyles } from './styles';
import LottieView from 'lottie-react-native';
import { Icon, Avatar } from 'react-native-elements';

class Confirmation extends Component {
  static navigationOptions ={
    header: null
  };
  static PropTypes = {
    loadrt : PropTypes.string,
    trpCancel : PropTypes.func,
  };

  constructor(props){
    super(props);
    console.log(this.props);
  }

  render() {
    const {trpCancel} = this.props;
    return (
      <View style={styles.container}>
        <View>
          <Image
            style={{width: 40, height: 40, alignItems: 'flex-start', alignSelf: 'flex-start', position: 'absolute', marginHorizontal: 10}}
            source={require('../images/pool.png')}
          />
          </View>
        <View style={{alignSelf: 'flex-end', alignItems: 'flex-end'}}>
          <Text>Udit Guru</Text>
          <Text>Hyundai I20</Text>
          <Text>MP09CX0161</Text>
        </View>
        <View style={{flexDirection:'row'}} >

          <TouchableOpacity
             style={styles.opt}
           >
             <Animated.View>
               <Icon
                 name="call"
                 type="material-icons"
                 color="grey"
               />
           <Text style={{ color : "#064"}}> Call </Text>
         </Animated.View>
         </TouchableOpacity>
         <TouchableOpacity
           style={styles.opt}
           onPress={trpCancel}
          >
            <Animated.View>
              <Icon
                name="cancel"
                type="material-icons"
                color="grey"
              />
          <Text style={{ color : "#064"}} > Cancel </Text>
        </Animated.View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.opt}
         >
           <Animated.View>
             <Icon
               name="more-horiz"
               type="material-icons"
               color="grey"
             />
         <Text style={{ color : "#064"}} > More </Text>
       </Animated.View>
       </TouchableOpacity>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    width: '95%',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,

  },
  header: {
    ...defaultStyles.text,
    color: '#333',
    fontSize: 20,
  },
  code: {
    ...defaultStyles.text,
    color: '#333',
    fontSize: 36,
  },
  buttonContainer: {
    alignItems: 'center',
    backgroundColor: '#064',
    borderRadius: 100,
    margin: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  button: {
    ...defaultStyles.text,
    color: '#FFFFFF',
    fontSize: 18,
  },
  opt: {
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
    width: "33.3%",
    padding: 10,
  },
});

export default Confirmation;
