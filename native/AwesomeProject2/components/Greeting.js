import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, AppRegistry } from 'react-native';
const Greeting = props => {
  
    return (
      <View style={{alignItems: 'center' }}>
        <Text style={{color: '#919191',fontSize: 10 }}>{props.name}</Text>
      </View>
    );
  
}

export default Greeting;

