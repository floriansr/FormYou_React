import { SET_COURSES, FILTER_COURSES } from "redux/courses/courseType";

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
    case FILTER_COURSES:
      return {
        ...state,
        filter: state.data.filter((course) => course.id === action.courseId)
      };
    default:
      return state;
  }
};

export default courseReducer;