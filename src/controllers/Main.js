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
import IntroPages from "pages/IntroPages";
import ServerComms from "../utils/ServerComms";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fbFail: false,
      extLoaded: false,
      sdkLoaded: false,
      heartbeat: null,
      hadIntro: false
    };
    this.onFbFail = this.onFbFail.bind(this);
    this.onIntro = this.onIntro.bind(this)
  }

  onIntro() {
    this.setState({hadIntro: true})
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

    ServerComms.heartbeat().then(info => {
      this.setState({heartbeat: info})
    });

    window.extAsyncInit = () => {
      console.log("extensions injected");
      props.loadedLibrary("ext");
      FbUtils.setContextVariables(this.onFbFail);

      // MessengerExtensions.getSupportedFeatures(function success(result) {
      //   let features = result.supported_features;
      //   console.log("fb supported", features, result)
      // }, function error(err) {
      //   console.log("fb supported error", err)
      //   // error retrieving supported features
      // });

    };

    FbUtils.injectFbLibraries()
  }

  render() {
    return (
        <MuiThemeProvider theme={theme}>
          <Router>
            <MainView shouldFallback={this.state.fbFail} heartbeat={this.state.heartbeat}
                      onIntro={this.onIntro} hadIntro={this.state.hadIntro}/>
          </Router>
        </MuiThemeProvider>
    );
  }
}

function MainView(props) {
  // fixme add not found
  console.log("main view", props, props.heartbeat);
  return (
    <View id="app-container" style={{height: "100%"}}>
      {props.shouldFallback && <Redirect to={viewPath("/fallback")}/>}
      {props.heartbeat && props.heartbeat.isNew && !props.hadIntro && <Redirect to={viewPath("/intro")} push/>}
      <Switch>
        <Route exact path={viewPath("/fallback")} component={FallbackPage}/>
        <Route path={viewPath("/donation")} component={DonationRouter}/>
        <Route path={viewPath("/search")} component={SearchPage}/>
        <Route path={viewPath("/intro")} render={rp => {
          console.log("intro render route");
          return <IntroPages {...rp} info={props.heartbeat} onIntro={props.onIntro}/>
        }}/>
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
