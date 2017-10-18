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
      FbUtils.getUserId(this.onGetUserIdSuccess, this.onGetUserIdFailure)
    };
    window.fbAsyncInit = function () {
      console.log("app id", window.APP_ID);

      FB.Event.subscribe("auth.statusChange", (response) => {
        console.log("LOGIN RESP", response);
      });

      FB.init({
        appId: window.APP_ID,
        status: true,
        autoLogAppEvents: true,
        xfbml: false,
        version: 'v2.10'
      });
      console.log("sdk injected");

      // console.log("LOGIN TEST")
      // FB.getLoginStatus(function(response) {
      //   console.log("LOGIN RESP", response);
      // window.AT = response.authResponse.accessToken

      // if (response.status == "connected") {
      //   FB.logout((r) => console.log("logged out", r))
      // }
      // props.loadedLibrary("sdk")
      // });


      console.log("right before login");
      FB.login((r) => console.log("logged in", r))


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
