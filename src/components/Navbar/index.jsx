import React from "react";

import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"

import { removeConnexion } from "../../redux";


const Navbar = () => {
	const dispatch=useDispatch()
	const history=useHistory()
	const token = useSelector(state => state.user.data.jwt);
	const logStatus = useSelector(state => state.log.log);


	const deconnexion = () => {

		    fetch('https://form-you-back.herokuapp.com/users/sign_out.json', {
		      method: 'delete',
		      headers: {
		        'Authorization': token, 
		        'Content-Type': 'application/json'
		      },
		    })
		      .then(response =>{ 
		      	if (response.statusText === "No Content") {
		      		dispatch(removeConnexion())
		      		history.push("/login")
		     	}
		      else
		      	response.json()})
		      .then(response => {
		      	console.log(response)
		      })
		      .catch(error => console.log(error));
	};


	return (
		<>
			<div>

				<Link to="/">Home</Link>
				<Link to="/about">About</Link>

				{logStatus ? 
					<div>
						<button type="button" onClick={deconnexion}>Deconnexion</button>
						<Link to="/profile">Profile</Link>
					</div>
					:
					<div>
						<Link to="/register">Register</Link>
						<Link to="/login">Login</Link>
					</div>
					}
			</div>
		</>
	);
};

export default Navbar;
