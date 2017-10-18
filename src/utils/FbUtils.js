/* global MessengerExtensions */

import ServerComms from './ServerComms'

export default class FbUtils {
  static injectFbLibraries() {
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

    (function (d, s, id) {
      let js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  /**
   *
   * @param onFail, function that is executed if getting user id failed. Should happen only on outdated or web clients.
   */
  // fixme rename
  static getUserId(onSuccess, onFail) {
    MessengerExtensions.getContext(window.APP_ID, (context) => {
      console.log("setting signdned request", context, context.signed_request);
      ServerComms.signedRequest = context.signed_request
    }, (e, m) => {
      onFail(e, m)
    });
  }

  static getPostContents(id) {
    return new Promise(function (resolve, reject) {
      try {
        console.log("FB", id, FB);
        FB.api(id, 'get', {
          access_token: window.AT
        }, function (resp) {
          console.log("getPostContents response", resp);

          if (!resp || resp.error) {
            let error = resp.error ? resp.error.message : "unknown error";
            reject(error)
          } else {
            resolve(resp.message)
          }

        })
      } catch (e) {
        console.log("js error", e);
        reject("javascript error")
      }
    })
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