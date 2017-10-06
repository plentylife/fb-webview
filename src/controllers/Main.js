import React, {Component} from 'react';
import {View} from 'react-native';
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom'
import {MuiThemeProvider} from 'material-ui/styles';
import FallbackPage from '../pages/FallbackPage'
import {path} from '../utils/Common'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import reducer from "../redux/reducers"
import DonationRouter from './DonationRouter'
import theme from '../assets/theme'
import FbUtils from 'utils/FbUtils'

const store = createStore(reducer, {newOffer: {description: "doordash food delivery backpack in good condition. Two compartments, lined with foil on the inside, surprisingly light, side pockets. Size 1x2x3 feet."}});

class App extends Component {

  constructor() {
    super();
    this.state = {
      failedToGetUserId: false
    };
    this.onGetUserIdSuccess = this.onGetUserIdSuccess.bind(this);
    this.onGetUserIdFailure = this.onGetUserIdFailure.bind(this)
  }

  onGetUserIdSuccess(id) {
    console.log("user id", id)
  }

  onGetUserIdFailure(e, m) {
    console.log("failed to get user id", e, m)
  }

  componentWillMount() {
    console.log("injectig fb lib");
    window.extAsyncInit = () => {
      console.log("lib is inj");
      FbUtils.getUserId(this.onGetUserIdSuccess, this.onGetUserIdFailure)
    };
    FbUtils.injectFbLibrary()
  }

  render() {
    console.log("app");
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <Router>
            <View id="app-container">
              {this.state.failedToGetUserId && <Redirect to={path("/fallback")}/>}
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
