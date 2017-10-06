import React, {Component} from 'react';
import {View} from 'react-native';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {MuiThemeProvider} from 'material-ui/styles';
import FallbackPage from '../pages/FallbackPage'
import {path} from '../utils/Common'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import reducer from "../redux/reducers"
import DonationRouter from './DonationRouter'
import theme from '../assets/theme'

const store = createStore(reducer, {newOffer: {description: "doordash food delivery backpack in good condition. Two compartments, lined with foil on the inside, surprisingly light, side pockets. Size 1x2x3 feet."}});

class App extends Component {

  componentWillMount() {
    window.extAsyncInit = () => {
    }
  }

  render() {
    console.log("app");
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <Router>
            <View id="app-container">
              {/*<Redirect to="/" />*/}
              <Route exact path={path("/fallback")} component={FallbackPage}/>
              <Route path={path("/donation")} component={DonationRouter}/>
            </View>
          </Router>
        </MuiThemeProvider>
      </Provider>
    );
  }
}


export default App;
