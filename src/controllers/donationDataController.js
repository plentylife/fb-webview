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
    if (tokens[i].token.trim().includes("__")) {
      selectorIndexes.push(i)
    }
  }
  for (let i = 0; i < selectorIndexes.length - 1; i++) {
    if (selectorIndexes[i + 1] - selectorIndexes[i] === 2) {
      let frontSelector = st[selectorIndexes[i]].token;
      let backSelector = st[selectorIndexes[i + 1]].token;
      if (frontSelector.slice(frontSelector.length - 2, frontSelector.length) === "__" &&
        backSelector.slice(0, 2) === "__") {
        st[selectorIndexes[i] + 1] = Object.assign({}, st[selectorIndexes[i] + 1], {isTagged: true});
        st[selectorIndexes[i]] = Object.assign({}, st[selectorIndexes[i]], {token: frontSelector.slice(0, frontSelector.length - 2)});
        st[selectorIndexes[i + 1]] = Object.assign({}, st[selectorIndexes[i + 1]], {token: backSelector.slice(2, backSelector.length)});
        // console.log(st[selectorIndexes[i]], st[selectorIndexes[i + 1]])
      }
    }
  }
  return st.filter(e => (e !== null || e.length > 0))
}

function stripNonBodyFromPost(postBody) {
  let i = postBody.indexOf("===");
  return postBody.slice(0, i)
}

export {
  mapNewOfferToProps, mapNewOfferDispatchToProps, mapViewOfferToProps, splitStrIntoTokens, selectTokensBasedOnContext,
  stripNonBodyFromPost
}