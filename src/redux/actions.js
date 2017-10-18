const SET_NEW_OFFER_DESCRIPTION = "SET_NEW_OFFER_DESCRIPTION";
const SET_NEW_OFFER_DESCRIPTION_TOKENS = "SET_NEW_OFFER_DESCRIPTION_TOKENS";
const SELECT_NEW_OFFER_DESCRIPTION_TOKEN = "SELECT_NEW_OFFER_DESCRIPTION_TOKEN";
const LIBRARY_LOADED = "LIBRARY_LOADED";

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

function loadedLibrary(which) {
  return {
    type: LIBRARY_LOADED, library: which
  }
}

export {setNewOfferDescription, SET_NEW_OFFER_DESCRIPTION,
setNewOfferDescriptionTokens, SET_NEW_OFFER_DESCRIPTION_TOKENS,
  SELECT_NEW_OFFER_DESCRIPTION_TOKEN,
  loadedLibrary, LIBRARY_LOADED
}