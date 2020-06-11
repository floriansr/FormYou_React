import { SET_COURSES, FILTER_COURSES } from "redux/courses/courseType";


export const setCourse = (data) => {

	return {
		type: SET_COURSES,
		details: data,
	};
};

export const filterCourses = (courseId) => {

	return {
		type: FILTER_COURSES,
		courseId,
	};
};