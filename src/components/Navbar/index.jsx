import React from "react";

import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"

import { removeConnexion } from "../../redux";


const Navbar = () => {
	const dispatch=useDispatch()
	const history=useHistory()
	const token = useSelector(state => state.user.data.jwt);


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
				<button type="button" onClick={deconnexion}>Deconnexion</button>

				<Link to="/">Home</Link>
				<Link to="/about">About</Link>
				<Link to="/profile">Profile</Link>
				<Link to="/register">Register</Link>
			</div>
		</>
	);
};

export default Navbar;
