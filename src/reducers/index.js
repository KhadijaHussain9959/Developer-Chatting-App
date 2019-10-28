import * as actionTypes from "../actions/types";
import { combineReducers } from "redux";

const initializeState = {
  currentUser: null,
  isLoading: true
};

const user_reducer = (state = initializeState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        currentUser: action.payload.currentUser,
        isLoading: false
      };
    case actionTypes.CLEAR_USER:
      return {
        ...initializeState,
        isLoading: false
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  user: user_reducer
});
export default rootReducer;
