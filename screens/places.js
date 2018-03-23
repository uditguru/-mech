import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import Option from './Option';

const { width } = Dimensions.get('window');
const optionWith = (width - 0) / 3 - 10;

export default class Places extends Component {


  render() {

    return (
      <View style={styles.container}>
        <Text>Results</Text>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 20,
  },
  options: {
    flexDirection: 'row',
    marginRight: -10,
  },
});
