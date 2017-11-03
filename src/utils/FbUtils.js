/* global MessengerExtensions */

import ServerComms from './ServerComms'
import {globalViewPath} from "./Common";

export default class FbUtils {
  static userId;

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
  static setContextVariables(onFail) {
    MessengerExtensions.getContext(window.APP_ID, (context) => {
      console.log("context", context);
      ServerComms.sRequestResolve(context.signed_request);
      FbUtils.userId = context.psid;
      if (!context.psid) {
        onFail()
      }
    }, (e) => {
      ServerComms.sRequestReject(e);
      onFail()
    });
  }

  static tokensToTitle(tokens) {
    console.log("to tilte", tokens);
    let title = 'Tagged with:';
    tokens.forEach(t => {
      if (t.isTagged) {
        title += " " + t.token
      }
    });
    return title
  }


  static globalViewPathWithRef(path, ref) {
    return globalViewPath(path) + "?ref=" + ref
  }

  static share(donationId, tokens, onFinish) {
    let ref = FbUtils.userId;

    let messageToShare = {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "generic",
          "elements": [{
            "title": FbUtils.tokensToTitle(tokens),
            "image_url": globalViewPath("/resources/plenty_fb_header.png"),
            // "subtitle": "",
            "default_action": {
              "type": "web_url",
              "webview_height_ratio": "full",
              "messenger_extensions": true,
              "url": FbUtils.globalViewPathWithRef("/donation/" + donationId, ref)
            },
            "buttons": [{
              "type": "web_url",
              "webview_height_ratio": "full",
              "messenger_extensions": true,
              "url": FbUtils.globalViewPathWithRef("/donation/" + donationId, ref),
              "title": "View"
            }]
          }]
        }
      }
    };

    MessengerExtensions.beginShareFlow(function success(response) {
        // User dismissed without error, but did they
        // share the message?

        console.log("sharing", response);
        onFinish()

      }, function error(errorCode, errorMessage) {
        // An error occurred in the process
        console.log("error sharing", errorCode, errorMessage)
      },
      messageToShare, "broadcast");
  }
}