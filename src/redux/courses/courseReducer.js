import { SET_COURSES } from "redux/courses/courseType";

const initialState = {
  data: [],
};

const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COURSES:
      return {
        ...state,
        data: action.details
      };
    default:
      return state;
  }
};

export default courseReducer;