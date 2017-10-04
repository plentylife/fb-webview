import React from 'react'
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { AppRegistry, ScrollView, View, Image, Text } from 'react-native';

export default function ContentTemplate(props) {
  return (
    <View>
      <AppBar position="static">
        <Toolbar>
          <Typography type="title" color="inherit">
            {props.title}
          </Typography>
        </Toolbar>
      </AppBar>

      <ScrollView id="content">
        {props.children}
      </ScrollView>
    </View>
  )
}