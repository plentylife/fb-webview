/* global MessengerExtensions */

import ServerComms from './ServerComms'

export default class FbUtils {
  static injectFbLibrary() {
    (function (d, s, id) {
      let js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.com/en_US/messenger.Extensions.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'Messenger'));
  }

  /**
   *
   * @param onFail, function that is executed if getting user id failed. Should happen only on outdated or web clients.
   */
  static getUserId(onSuccess, onFail) {
    MessengerExtensions.getContext(window.APP_ID, (context) => {
      console.log("setting signdned request", context, context.signed_request);
      ServerComms.signedRequest = context.signed_request
    }, (e, m) => {
      onFail(e, m)
    });
  }


  share() {
    let messageToShare = {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "generic",
          "elements": [{
            "title": "Testing webview",
            "default_action": {
              "type": "web_url",
              "webview_height_ratio": "full",
              "messenger_extensions": true,
              "url": "https://plenty.life/webview"
            },
            "buttons": [{
              "type": "web_url",
              "webview_height_ratio": "full",
              "messenger_extensions": true,
              "url": "https://plenty.life/webview",
              "title": "Test"
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
      messageToShare, "broadcast");
  }
}