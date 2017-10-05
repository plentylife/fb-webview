const SET_NEW_OFFER_DESCRIPTION = "SET_NEW_OFFER_DESCRIPTION"
const SET_NEW_OFFER_DESCRIPTION_TOKENS = "SET_NEW_OFFER_DESCRIPTION_TOKENS"
const SELECT_NEW_OFFER_DESCRIPTION_TOKEN = "SET_NEW_OFFER_DESCRIPTION_TOKENS"

function setNewOfferDescription(descr) {
  return {
    type: SET_NEW_OFFER_DESCRIPTION,
    description: descr
  }
}

/** converts the plain description into a format that the tag selector can use */
function setNewOfferDescriptionTokens(tokens) {
  return {
    type: SET_NEW_OFFER_DESCRIPTION_TOKENS,
    tokens: tokens
  }
}

export {setNewOfferDescription, SET_NEW_OFFER_DESCRIPTION,
setNewOfferDescriptionTokens, SET_NEW_OFFER_DESCRIPTION_TOKENS,
SELECT_NEW_OFFER_DESCRIPTION_TOKEN}