import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "redux/store";

import Navbar from "components/Navbar";
import Authroute from "components/AuthRoute"

import Register from "pages/Register";
import LogIn from "pages/Login";
import Home from "pages/Home";
import About from "pages/About";
import Profile from "pages/Profile";


const App = () => {

	return (
		<>
				<Router>
					<div>
						<Provider store={store}>

							<Navbar />

							<Switch>
								<Route path="/register" component={Register} />
                				<Route path="/login/:statusSlug" component={LogIn} />
								<Route path="/about" component={About} />
								
								<Authroute path="/profile" component={Profile} />
								<Authroute path="/" component={Home} />
							</Switch>
			            </Provider>
					</div>
				</Router>
		</>
	);
};

export default App;
