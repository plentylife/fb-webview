import {combineReducers} from 'redux'
import * as act from "./actions"

function newOffer(state, action) {
  switch (action.type) {
    case act.SET_NEW_OFFER_DESCRIPTION:
      return Object.assign({}, state, {description: action.description});
    case act.SET_NEW_OFFER_DESCRIPTION_TOKENS:
      return Object.assign({}, state, {tokens: action.tokens});
    case act.SELECT_NEW_OFFER_DESCRIPTION_TOKEN:
      let tokens = [...state.tokens].map(t => (Object.assign({}, t)));
      let t = tokens[action.index];
      t.isTagged = !t.isTagged;
      return Object.assign({}, state, {tokens: tokens})
  }
  return state ? state : {}
}

function loadState(state, action) {
  switch (action.type) {
    case act.LIBRARY_LOADED:
      return [...state, action.library]
  }
  return state ? state : []
}

const reducer = combineReducers({newOffer, loadState});

export default reducer
