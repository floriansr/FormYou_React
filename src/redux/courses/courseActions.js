import { SET_COURSES } from "redux/courses/courseType";


export const setCourse = (data) => {

	return {
		type: SET_COURSES,
		details: data,
	};
};