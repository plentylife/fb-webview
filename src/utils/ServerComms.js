import {backPath} from 'utils/Common'

export default class ServerComms {
  static signedRequest;

  static generateBody(payload) {
    return (JSON.stringify({
      signedRequest: ServerComms.signedRequest,
      payload: payload
    }))
  }

  static postNewDonation(description, onSuccess) {
    let b = ServerComms.generateBody(description);
    console.log("sending body", b);
    // Json.stringify(b)
    fetch(backPath("/donation"), {method: 'POST', body: b}).then(resp => {
        // should get back the new donation id
        console.log("got response")
      }
    ).catch(e => {

    })
  }
}