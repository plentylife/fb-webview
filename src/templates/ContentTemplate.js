import React from 'react'
import AppBar from 'material-ui/AppBar';
import { AppRegistry, ScrollView, View, Image, Text } from 'react-native';

export default function ContentTemplate(props) {
  return (
    <View>
      <AppBar title={props.title}/>
      <ScrollView id="content">
        {props.children}
      </ScrollView>
    </View>
  )
}