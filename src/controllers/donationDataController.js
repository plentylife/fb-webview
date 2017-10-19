import * as act from '../redux/actions'

function mapNewOfferToProps(state, ownProps) {
  return Object.assign({}, state.newOffer, ownProps)
}

function mapViewOfferToProps(state, ownProps) {
  console.log("view offer to props", ownProps);
  return Object.assign({}, ownProps)
}

const alphanumeric = "abcdefghijklmnopqrstuvwxyz0123456789";

// function viewDispatch(dispatch) {
//   return {
//     onPostData: post => {
//
//       return postWithTags
//     }
//   }
// }

function mapNewOfferDispatchToProps(dispatch) {
  return {
    onDescriptionChange: descr => {
      // in format {token: str, isSelectable: bool}
      let tokens = splitStrIntoTokens(descr);
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

function splitStrIntoTokens(str) {
  let tokens = [];
  let lastAlpha = alphanumeric.includes(str[0]);
  let lastNonAlpha = !lastAlpha;
  let runningToken = "";
  str.split('').forEach(char => {
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
  return tokens
}

function selectTokensBasedOnContext(tokens) {
  let selectorIndexes = [];
  let st = [...tokens];
  for (let i = 0; i < tokens.length; i++) {
    console.log("`" + tokens[i].token.trim() + "`", tokens[i].token == "__");
    if (tokens[i].token.trim() === "__") {
      selectorIndexes.push(i)
    }
  }
  console.log("selectors", selectorIndexes);
  for (let i = 0; i < selectorIndexes.length - 1; i++) {
    if (selectorIndexes[i + 1] - selectorIndexes[i] === 2) {
      st[selectorIndexes[i] + 1] = Object.assign({}, st[selectorIndexes[i] + 1], {isTagged: true});
      st[selectorIndexes[i]] = null;
      st[selectorIndexes[i + 1]] = null
    }
  }
  return st.filter(e => (e !== null))
}

function stripNonBodyFromPost(postBody) {
  let i = postBody.indexOf("===");
  return postBody.slice(0, i)
}

export {
  mapNewOfferToProps, mapNewOfferDispatchToProps, mapViewOfferToProps, splitStrIntoTokens, selectTokensBasedOnContext,
  stripNonBodyFromPost
}