import {backPath} from 'utils/Common'

export default class ServerComms {
  // anton dev
  // aTUejAIYVKl6uOU6203JDtlxOa0rtE3k8vYw_0TG8uc.eyJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImlzc3VlZF9hdCI6MTUwODUyNTg1MywicGFnZV9pZCI6MTQyMDc0MTU0MTMwODE0NCwicHNpZCI6IjE3ODMxNDY2NzUwMzMxODMiLCJ0aHJlYWRfdHlwZSI6IlVTRVJfVE9fUEFHRSIsInRpZCI6IjE3ODMxNDY2NzUwMzMxODMifQ
  // andrey dev
  // r4JLrrEYvKn-1S_fEFmjqcTwr99YbrAYKYN92frktZw.eyJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImlzc3VlZF9hdCI6MTUwODc3NTY1NSwicGFnZV9pZCI6MTQyMDc0MTU0MTMwODE0NCwicHNpZCI6IjEzMTQwNjcwNjIwNTQ0OTIiLCJ0aHJlYWRfdHlwZSI6IlVTRVJfVE9fVVNFUiIsInRpZCI6IjE0ODI4MDU5MTg0Njc0MDQifQ

  static signedRequest = Promise.resolve(
    // "r4JLrrEYvKn-1S_fEFmjqcTwr99YbrAYKYN92frktZw.eyJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImlzc3VlZF9hdCI6MTUwODc3NTY1NSwicGFnZV9pZCI6MTQyMDc0MTU0MTMwODE0NCwicHNpZCI6IjEzMTQwNjcwNjIwNTQ0OTIiLCJ0aHJlYWRfdHlwZSI6IlVTRVJfVE9fVVNFUiIsInRpZCI6IjE0ODI4MDU5MTg0Njc0MDQifQ"
    'aTUejAIYVKl6uOU6203JDtlxOa0rtE3k8vYw_0TG8uc.eyJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImlzc3VlZF9hdCI6MTUwODUyNTg1MywicGFnZV9pZCI6MTQyMDc0MTU0MTMwODE0NCwicHNpZCI6IjE3ODMxNDY2NzUwMzMxODMiLCJ0aHJlYWRfdHlwZSI6IlVTRVJfVE9fUEFHRSIsInRpZCI6IjE3ODMxNDY2NzUwMzMxODMifQ'
  );
  static sRequestResolve;
  static sRequestReject;
  static _signedRequest = new Promise(function (res, rej) {
    ServerComms.sRequestReject = rej;
    ServerComms.sRequestResolve = res
  });

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