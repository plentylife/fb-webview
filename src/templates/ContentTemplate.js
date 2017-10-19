import React from 'react'
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import {ScrollView, View} from 'react-native';
import SearchBar from 'pages/SearchBar'

export default function ContentTemplate(props) {
  return (
    <View>
      <AppBar position="static">
        <Toolbar style={{display: 'flex', justifyContent: 'space-around'}}>
          <Typography type="title" color="inherit">
            {props.title}
          </Typography>
          <SearchBar/>
        </Toolbar>
      </AppBar>

      <ScrollView id="content">
        {props.children}
      </ScrollView>
    </View>
  )
}