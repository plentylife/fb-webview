import {backPath} from 'utils/Common'

export default class ServerComms {
  static signedRequest;

  static generateBody(payload) {
    return (JSON.stringify({
      signedRequest: ServerComms.signedRequest,
      payload: payload
    }))
  }

  static postNewDonation(description, onSuccess, onFailure) {
    let b = ServerComms.generateBody(description);
    console.log("sending body", b);
    // Json.stringify(b)
    fetch(backPath("/donation"), {method: 'POST', body: b}).then(resp => {
        // should get back the new donation id
      console.log("got response");
      onSuccess(resp)
      }
    ).catch(e => {
      onFailure(e)
    })
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
}