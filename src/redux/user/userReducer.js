import { SET_PROFILE, REMOVE_PROFILE } from "redux/user/userType";

// , MODIFICATE_MY_PROFILE

const initialState = {
  data: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROFILE:
      return {
        ...state,
        data: action.details
      };
    case REMOVE_PROFILE:
      return {
        ...state,
        data: {}
      };

    // case MODIFICATE_MY_PROFILE:
    //   return {
    //     data : {
    //     ...state.data,
    //     description: action.description,
    //     username: action.username,
    //     }
    //   };
    default:
      return state;
  }
};

export default userReducer;