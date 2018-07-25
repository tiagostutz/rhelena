import React from 'react';
import { Switch, StyleSheet, View } from 'react-native';
import { Image, Text, TouchableOpacity } from 'react-native';

import Rhelena from 'rhelena';
import DogModel from './DogModel'

export default class DogView extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    Rhelena.attachModelToView(new DogModel(this.props), this);
  }

  render() {
    return (
      <View style={{flex:1, flexDirection:'column', alignItems:'center'}}>
        <Text style={{fontSize:30, marginTop:30}}>Dog Barker</Text>
        <TouchableOpacity style={{alignItems:'center', justifyContent:'center', margin:50}} onPress={()=>{this.viewModel.bark()}}>
          <Image style={{width:150, height:150, resizeMode:'contain'}} source={require('./dog.png')} />
        </TouchableOpacity>
        <Text>Dog barked<Text style={{fontWeight:'bold', fontSize:30}}> {this.state.barks} </Text>times</Text>
      </View>
    )
  }
}
