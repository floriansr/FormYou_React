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
import NotFound from "pages/NotFound";


const App = () => {

	return (
		<>
				<Router>
					<div>
						<Provider store={store}>

							<Navbar />

							<Switch>
								<Route exact path="/register" component={Register} />
                				<Route exact path="/login/:statusSlug" component={LogIn} />
								<Route exact path="/about" component={About} />
								
								<Authroute exact path="/profile" component={Profile} />
								<Home exact path="/" component={Home} />
								<Route path="*" component={NotFound} status={404} />
							</Switch>
			            </Provider>
					</div>
				</Router>
		</>
	);
};

export default App;
