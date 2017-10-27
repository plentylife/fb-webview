import React from 'react'
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import {ScrollView, View} from 'react-native';
import SearchBar from 'pages/SearchBar'

export default function ContentTemplate(props) {
  return (
    <View>
      <AppBar position="static" color="default">
        <Toolbar style={{display: 'flex', justifyContent: 'space-around'}}>
          {/*<Typography type="title" color="inherit">*/}
          {/*{props.title}*/}
          {/*</Typography>*/}
          <SearchBar search={props.search} history={props.history}/>
        </Toolbar>
      </AppBar>

      <ScrollView id="content">
        {props.children}
      </ScrollView>
    </View>
  )
}