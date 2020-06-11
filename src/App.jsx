import React, { useEffect } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";

import Navbar from "components/Navbar";
import Authroute from "components/AuthRoute"

import Register from "pages/Register";
import LogIn from "pages/Login";
import Home from "pages/Home";
import About from "pages/About";
import Profile from "pages/Profile";
import NotFound from "pages/NotFound";

import Cookies from 'js-cookie'
import { setConnexion, setProfile } from "./redux";



const App = () => {

	const dispatch = useDispatch()

		useEffect(() => { 

				if (Cookies.get('token')) {

				const token = JSON.parse(Cookies.get('token')).jwt
				const userStatus = JSON.parse(Cookies.get('token')).status

			    fetch(`https://form-you-back.herokuapp.com/${userStatus}s/sign_in.json`, {
			      method: 'post',
			      headers: {
			        'Authorization': token, 
			        'Content-Type': 'application/json'
			      },
			    })
			      .then(response => response.json())
			      .then(response => {

			        if (!response.error) {
				        dispatch(setProfile(response))
				        dispatch(setConnexion())
			        }
			      })
			      .catch(error => console.log(error));
				}

		}, [dispatch]);

	return (
		<>
				<Router>
					<div>
							<Navbar />

							<Switch>
								<Route exact path="/register" component={Register} />
                				<Route exact path="/login/:statusSlug" component={LogIn} />
								<Route exact path="/about" component={About} />
								
								<Authroute exact path="/profile" component={Profile} />
								<Home exact path="/" component={Home} />
								<Route path="*" component={NotFound} status={404} />
							</Switch>
					</div>
				</Router>
		</>
	);
};

export default App;
