import React, {Component} from 'react';
import { AppRegistry, ScrollView, Image, Text, View } from 'react-native';
import {Redirect, Route, BrowserRouter as Router} from 'react-router-dom'
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';
import FallbackPage from '../pages/FallbackPage'
import NewDonationPage from '../pages/NewDonationPage'
import U from '../utils/FbUtils'

class App extends Component {

  componentWillMount() {
    window.extAsyncInit = () => {
    }
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
      <Router>
        <View id="app-container">
          {/*<Redirect to="/" />*/}
          <Route exact path={U.path("/fallback")} component={FallbackPage}/>
          <Route exact path={U.path("/donation")} component={NewDonationPage}/>
        </View>
      </Router>
      </MuiThemeProvider>
    );
  }
}

const theme = createMuiTheme();

export default App;
