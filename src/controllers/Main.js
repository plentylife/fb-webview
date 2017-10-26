import React, {Component} from 'react';
import {View} from 'react-native';
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom'
import {MuiThemeProvider} from 'material-ui/styles';
import FallbackPage from '../pages/FallbackPage'
import {viewPath} from 'utils/Common'
import DonationRouter from './DonationRouter'
import theme from '../assets/theme'
import FbUtils from 'utils/FbUtils'
import {loadedLibrary} from "../redux/actions";
import {connect} from 'react-redux'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      failedToGetUserId: false,
      extLoaded: false,
      sdkLoaded: false
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
    window.viewPath = viewPath;
    let props = this.props;
    console.log("injecting fb libs", this.props);

    window.extAsyncInit = () => {
      console.log("extensions injected");
      props.loadedLibrary("ext");
      FbUtils.setContextVariables(this.onGetUserIdSuccess, this.onGetUserIdFailure);

      MessengerExtensions.getSupportedFeatures(function success(result) {
        let features = result.supported_features;
        console.log("fb supported", features, result)
      }, function error(err) {
        console.log("fb supported error", err)
        // error retrieving supported features
      });

    };

    FbUtils.injectFbLibraries()
  }

  render() {
    return (
        <MuiThemeProvider theme={theme}>
          <Router>
            <MainView shouldFallback={this.state.failedToGetUserId}/>
          </Router>
        </MuiThemeProvider>
    );
  }
}

function MainView(props) {
  return (
    <View id="app-container">
      {props.shouldFallback && <Redirect to={viewPath("/fallback")}/>}
      <Route exact path={viewPath("/fallback")} component={FallbackPage}/>
      <Route path={viewPath("/donation")} component={DonationRouter}/>
    </View>
  )
}


export default connect((state, ownProps) => (ownProps), (d) => {
  return {
    loadedLibrary: which => {
      d(loadedLibrary(which))
    }
  }
})(App);
