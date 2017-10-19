import * as act from '../redux/actions'

function mapNewOfferToProps(state, ownProps) {
  return Object.assign({}, state.newOffer, ownProps)
}

function mapViewOfferToProps(state, ownProps) {
  console.log("view offer to props", ownProps);
  return Object.assign({}, ownProps)
}

const alphanumeric = "abcdefghijklmnopqrstuvwxyz0123456789";

function mapNewOfferDispatchToProps(dispatch) {
  return {
    onDescriptionChange: descr => {
      // in format {token: str, isSelectable: bool}
      let tokens = [];
      let lastAlpha = alphanumeric.includes(descr[0]);
      let lastNonAlpha = !lastAlpha;
      let runningToken = "";
      descr.split('').forEach(char => {
        let isAlpha = alphanumeric.includes(char.toLowerCase());
        let selectable = lastAlpha;
        let push = false;
        if (isAlpha) {
          push = !lastAlpha;
          lastAlpha = true;
          lastNonAlpha = false
        } else {
          push = !lastNonAlpha;
          lastNonAlpha = true;
          lastAlpha = false
        }

        if (push) {
          tokens.push({token: runningToken, isSelectable: selectable, isTagged: false});
          runningToken = ""
        }
        runningToken += char;
      });
      tokens.push({token: runningToken, isSelectable: lastAlpha, isTagged: false});

      dispatch(act.setNewOfferDescription(descr));
      dispatch(act.setNewOfferDescriptionTokens(tokens))
    },
    onTokenSelect: index => {
      dispatch({
        type: act.SELECT_NEW_OFFER_DESCRIPTION_TOKEN,
        index: index
      })
    }
  }
}

export {mapNewOfferToProps, mapNewOfferDispatchToProps, mapViewOfferToProps}