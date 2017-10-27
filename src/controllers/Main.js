import React, {Component} from 'react';
import {View} from 'react-native';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'
import {MuiThemeProvider} from 'material-ui/styles';
import FallbackPage from '../pages/FallbackPage'
import {viewPath} from 'utils/Common'
import DonationRouter from './DonationRouter'
import theme from '../assets/theme'
import FbUtils from 'utils/FbUtils'
import {loadedLibrary} from "../redux/actions";
import {connect} from 'react-redux'
import SearchPage from 'pages/SearchPage'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fbFail: false,
      extLoaded: false,
      sdkLoaded: false
    };
    this.onFbFail = this.onFbFail.bind(this)
  }

  onFbFail() {
    console.log("FB ext failed");
    if (window.IS_IN_TEST_MODE === true) {
      this.setState({fbFail: true})
    }
  }

  componentWillMount() {
    window.viewPath = viewPath;
    let props = this.props;
    console.log("injecting fb libs", this.props);

    window.extAsyncInit = () => {
      console.log("extensions injected");
      props.loadedLibrary("ext");
      FbUtils.setContextVariables(this.onFbFail);

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
            <MainView shouldFallback={this.state.fbFail}/>
          </Router>
        </MuiThemeProvider>
    );
  }
}

function MainView(props) {
  // fixme add not found
  return (
    <View id="app-container">
      {props.shouldFallback && <Redirect to={viewPath("/fallback")}/>}
      <Switch>
        <Route exact path={viewPath("/fallback")} component={FallbackPage}/>
        <Route path={viewPath("/donation")} component={DonationRouter}/>
        <Route path={viewPath("/search")} component={SearchPage}/>
      </Switch>
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
