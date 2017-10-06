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
      t.isSelected = !t.isSelected;
      return Object.assign({}, state, {tokens: tokens})
  }
  return state ? state : {}
}

const reducer = combineReducers({newOffer});

export default reducer
