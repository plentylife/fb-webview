import {backPath} from 'utils/Common'

export default class ServerComms {
  static sRequestResolve;
  static sRequestReject;
  static signedRequest = ServerComms.generateSignedRequest();

  static generateSignedRequest() {
    if (process.env.NODE_ENV === 'production') {
      console.log("ServerComms in production");
      return new Promise(function (res, rej) {
        ServerComms.sRequestReject = rej;
        ServerComms.sRequestResolve = res
      });
    } else {
      console.log("ServerComms in dev", dev.token);
      ServerComms.sRequestReject = (p) => {
      };
      ServerComms.sRequestResolve = (p) => {
      };
      return Promise.resolve(
        dev.token
      );
    }
  }


  static generateBody(payload) {
    return ServerComms.signedRequest.then(sreq => {
      return JSON.stringify({
        signedRequest: sreq,
        payload: payload
      })
    });
  }

  static postNewDonation(description) {
    return ServerComms.fetchSimple(description, "/donation", false)
  }

  static getPost(id) {
    return fetch(backPath("/donation/fb/" + id)).then(resp => {
        // should get back the new donation id
        // console.log("got response", resp.json())
        return resp.json().then(j => {
          console.log(j);
          if (j.isError) {
            return Promise.reject(j.payload)
          } else {
            return j.payload
          }
        });
      }
    )
  }

  static getDonationUser(donationId) {
    return ServerComms.fetchSimple({}, "/donation/" + donationId + "/user")
  }

  static getHighestBid(id) {
    return ServerComms.generateBody(null).then(b => {
      console.log("highest bid body", b, ServerComms.signedRequest);
      return fetch(backPath("/donation/" + id + "/highest_bid"), {method: 'POST', body: b}).then(resp => {
          return resp.json().then(j => {
            console.log(j);
            if (j.isError) {
              return Promise.reject(j.payload)
            } else {
              return j.payload
            }
          });
        }
      )
    })
  }

  static sendBidToServer(donationId, ref, amount) {
    return ServerComms.generateBody({amount: amount}).then(b => {
      console.log("bid body", b);
      return fetch(backPath("/donation/" + donationId + "?ref=" + ref), {method: "PUT", body: b}).then(resp => {
        return ServerComms.toJsonOrReject(resp)
      })
    })
  }

  static getAccountStatus() {
    return ServerComms.fetchSimple("", "/account", /* isPut */false)
  }

  static search(query) {
    return fetch(backPath("/search?q=" + encodeURI(query))).then(resp =>
      (ServerComms.toJsonOrReject(resp))
    )
  }

  static heartbeat() {
    return ServerComms.generateBody(null).then(b => {
      return fetch(backPath("/heartbeat"), {method: "POST", body: b}).then(resp => {
        if (resp.status === 404 || resp.status === 200) {
          return ServerComms.toJsonOrReject(resp).then(j => (Object.assign(j, {isNew: resp.status === 404})))
        } else {
          throw new Error()
        }
      })
    })
  }

  static fetchSimple(payload, path, isPut) {
    return ServerComms.generateBody(payload).then(b => {
      return fetch(backPath(path), {method: isPut ? "PUT" : "POST", body: b}).then(resp => {
        return ServerComms.toJsonOrReject(resp)
      })
    })
  }

  /** either returns a promise with json or rejected promise with the given error message */
  static toJsonOrReject(resp) {
    return resp.json().then(j => {
      if (j.isError) {
        return Promise.reject(j.payload)
      } else {
        return j.payload
      }
    });
  }
}