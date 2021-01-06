import { SET_USER } from "../actions/user";

const intialstate = {
  user: null,
};

const userReducer = (state = intialstate, action) => {
  switch (action.type) {
    case SET_USER:
      console.log(action.payload);
      return {
        ...state,
        user: action.payload,
      };

    default:
      return intialstate;
  }
};

export default userReducer;
