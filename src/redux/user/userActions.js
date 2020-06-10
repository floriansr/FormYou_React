import { SET_PROFILE, REMOVE_PROFILE } from "redux/user/userType";

// , MODIFICATE_MY_PROFILE

export const setProfile = (data) => {

	return {
		type: SET_PROFILE,
		details: data,
	};
};

export const removeProfile = () => {

	return {
		type: REMOVE_PROFILE,
	};
};


// export const modificateProfile = (username, description) => {

// 	return {
// 		type: MODIFICATE_MY_PROFILE,
// 		username,
// 		description,
// 	};
// };