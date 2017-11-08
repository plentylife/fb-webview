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
    let title = '';
    tokens.forEach(t => {
      if (t.isTagged) {
        title += " #" + t.token
      }
    });
    return title.trim()
  }


  static globalViewPathWithRef(path, ref) {
    return globalViewPath(path) + "?ref=" + ref
  }

  static share(donationId, tokens, onFinish) {
    let ref = FbUtils.userId;

    console.log("sharing");

    let messageToShare = {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "generic",
          "elements": [{
            "title": FbUtils.tokensToTitle(tokens),
            "image_url": globalViewPath("/resources/plenty_fb_header.0811.png"),
            'image_aspect_ratio': 'horizontal',
            // "subtitle": "plenty will ",
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
        onFinish(true)

      }, function error(errorCode, errorMessage) {
        // An error occurred in the process
        console.log("error sharing", errorCode, errorMessage);
        onFinish(false)
      },
      messageToShare, "broadcast");
  }
}