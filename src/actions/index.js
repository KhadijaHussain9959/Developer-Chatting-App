import * as actionTypes from "./types";

export const setUser = users => {
  return {
    type: actionTypes.SET_USER,
    payload: {
      currentUser: user
    }
  };
};
