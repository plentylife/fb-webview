/* global MessengerExtensions */

import React, {Component} from 'react';

class App extends Component {

  constructor() {
    super();
    this.state = {userId: "no user id",
      loaded: false,
      context: false, contextError: "",
      permissions: false, permissionError: "",
      features: [],
      getUserId: false, getUserIdError: "",
      v: 1600
    }

    this.share = this.share.bind(this)
  }

  componentWillMount() {
    let _this = this;


    console.log(this.state.v);
    console.log('app id -- ' + window.appId);

    window.extAsyncInit = () => {
      console.log("attempting to get context");
      _this.setState({loaded: true})

      MessengerExtensions.getSupportedFeatures(function success(result) {
        _this.setState({features: result.supported_features});
        console.log("features", result.supported_features)
      }, function error(err) {

      });

      MessengerExtensions.getGrantedPermissions(function(response) {
        // response.permissions is the list of permissions granted
        // e.g.: response.permissions = ['user-messaging']
        console.log("permissions", response)
      }, function(e, m) {
        console.log("get permissions error", e, m)
        // An error occurred
      });

      MessengerExtensions.getContext(window.appId, (context) => {
      // MessengerExtensions.getContext("aoset eoaist aoriest weik", (context) => {
        console.log("got context", context);
        _this.setState({context: true})

        _this.setState({userId: context.psid})

      }, (error, errorMsg) => {
        console.log("error context", error, errorMsg)
        _this.setState({contextError: error + " -- " + errorMsg})

        MessengerExtensions.askPermission(
          function(response) {
            // Success
            // This is called if user grants or rejects the asked permission.
            // response.permissions contains the list of all currently granted permissions
            var permissions = response.permissions;
            var isGranted = response.isGranted;

            _this.setState({permissions: isGranted})
            console.log("granted " + isGranted, permissions)

            // permissions is list of all permissions granted
          }, function(errorCode, errorMessage) {
            console.log("error perm", errorCode, errorMessage)
            _this.setState({permissionError: errorCode + " -- " + errorMessage})
          },
          "user_profile"
        );


      })

      MessengerExtensions.getUserID(function success(uids) {
        _this.setState({getUserId: true})
        console.log("getUserId success")
      }, function error(e, m) {
        console.log("error getUserId", e, m)
        _this.setState({getUserIdError: e + " -- " + m})
      });

    };

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "//connect.facebook.com/en_US/messenger.Extensions.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'Messenger'));
  }

  share() {
    var messageToShare = {
      "attachment":{
        "type":"template",
        "payload":{
          "template_type":"generic",
          "elements": [{
            "title":"Testing webview",
            "subtitle": "v " + this.state.v + " uid " + this.state.userId,
            "default_action":{
              "type":"web_url",
              "webview_height_ratio": "full",
              "messenger_extensions": true,
              "url":"https://plenty.life/webview"
            },
            "buttons":[{
              "type":"web_url",
              "webview_height_ratio": "full",
              "messenger_extensions": true,
              "url":"https://plenty.life/webview",
              "title":"Test"
            }]
          }]
        }
      }
    };

    MessengerExtensions.beginShareFlow(function success(response) {
        // User dismissed without error, but did they
        // share the message?

      console.log("sharing", response)

      }, function error(errorCode, errorMessage) {
        // An error occurred in the process
        console.log("error sharing", errorCode, errorMessage)
      },
      messageToShare,"broadcast");
  }

  render() {
    return (
      <div className="App">
        <p>
          Next you will see some messages. Please copy and paste and send them to anton.
          {this.state.v}
        </p>
        <p>
          fb loaded: {this.state.loaded ? "yes" : "no"}

          User id:
          {this.state.userId}
        </p>
        <p>
          context<br/>
          {this.state.context}<br/>
          error<br/>
          {this.state.contextError}
        </p>
        <p>
          permissions<br/>
          {this.state.permissions}<br/>
          error<br/>
          {this.state.permissionError}
        </p>
        <p>
          supported features<br/>
          {this.state.features.map((f) => {
            return (<span>{f}<br/></span>)
          })}
        </p>
        <p>
          getId: {this.state.getUserId ? "yes" : "no"}<br/>
          error: {this.state.getUserIdError}
        </p>
        <p>
          <button onClick={this.share}>Share</button>
        </p>
      </div>
    );
  }
}

export default App;
