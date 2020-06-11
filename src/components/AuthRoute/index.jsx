import React from 'react'
import { Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import Cookies from 'js-cookie'

import { setConnexion, removeConnexion } from "../../redux";


const AuthRoute = ({ component: Component, ...rest } : AuthRoute) => {

	const logStatus = useSelector(state => state.log.log);
	const dispatch = useDispatch();

	const checkLog = () => (
		Cookies.get('token') ? dispatch(setConnexion()) : dispatch(removeConnexion())
	);

	return (
		<>
			<Route {...rest} render={props => (checkLog() && logStatus) ? ( <Component {...props} />) : ( <p>This is a private page, go log in please.</p>)} />
		</>
	);
}

export default AuthRoute