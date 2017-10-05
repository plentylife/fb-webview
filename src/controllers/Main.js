import React, {Component} from 'react';
import { AppRegistry, ScrollView, Image, Text, View } from 'react-native';
import {Redirect, Route, BrowserRouter as Router} from 'react-router-dom'
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';
import FallbackPage from '../pages/FallbackPage'
import NewDonationPage from '../pages/CreateDonationPages'
import U from '../utils/FbUtils'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from "./reducers"
import DonationRouter from './DonationRouter'

const store = createStore(reducer, {newOffer: {description: "blah blah om my"}})

class App extends Component {

  componentWillMount() {
    window.extAsyncInit = () => {
    }
  }

  render() {
    console.log("app")
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
        <Router>
          <View id="app-container">
            {/*<Redirect to="/" />*/}
            <Route exact path={U.path("/fallback")} component={FallbackPage}/>
            <Route path={U.path("/donation")} component={DonationRouter}/>
          </View>
        </Router>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

const theme = createMuiTheme();

export default App;
