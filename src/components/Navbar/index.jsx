import React from "react";

import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import Cookies from 'js-cookie'

import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';


import { removeConnexion, removeProfile } from "../../redux";


const Navbar = () => {
	const dispatch=useDispatch()
	const history=useHistory()
	const logStatus = useSelector(state => state.log.log);


	const deconnexion = () => {

		const token = JSON.parse(Cookies.get('token')).jwt
		const userStatus = JSON.parse(Cookies.get('token')).status

		fetch(`https://form-you-back.herokuapp.com/${userStatus}s/sign_out.json`, {
		    method: 'delete',
		    headers: {
		      'Authorization': token, 
		      'Content-Type': 'application/json'
		      },
		    })		    
		    .then(response =>{ 
		        if (response.statusText === "No Content") {
		      		dispatch(removeConnexion())
		      		dispatch(removeProfile())
		      		Cookies.remove('token')
		      		history.push("/")
		     	}
		        else
		      	response.json()
		    })
		    .then(response => {
		      	console.log(response)
		    })
		    .catch(error => console.error(error));
	};

	const menu = (
	  <Menu>
	    <Menu.Item key="1" icon={<UserOutlined />}>
	    	<Link to="/login/student">Student</Link>
	    </Menu.Item>
	    <Menu.Item key="2" icon={<UserOutlined />}>
	      <Link to="/login/instructor">Instructor</Link>
	    </Menu.Item>
	    <Menu.Item key="3" icon={<UserOutlined />}>
	      <Link to="/login/administrator">Administrator</Link>
	    </Menu.Item>
	  </Menu>
	 )


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
						    <Dropdown overlay={menu}>
						      <Button>
						        Login <DownOutlined />
						      </Button>
						    </Dropdown>
					</div>
					}
			</div>
		</>
	);
};

export default Navbar;
