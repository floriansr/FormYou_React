import React from "react";

import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import Cookies from 'js-cookie'

import { Menu, Button } from 'antd';
import {  UserOutlined, MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';

import { removeConnexion, removeProfile } from "../../redux";

const { SubMenu } = Menu;



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

	return (
		<>
			<div>

				<Menu mode="horizontal">
			        <Menu.Item icon={<AppstoreOutlined />}>
			          <Link to="/">Home</Link>
			        </Menu.Item>
			        <Menu.Item disabled icon={<AppstoreOutlined />}>
			          About
			        </Menu.Item>
			        <Menu.Item disabled icon={<MailOutlined />}>
			          Contact
			        </Menu.Item>


					{logStatus ? 

							<Menu.Item disabled icon={<SettingOutlined />}>
				         		 Profile
				       		</Menu.Item>
						:

					        <Menu.Item icon={<UserOutlined />}>
					          <Link to="/register">Register</Link>
					        </Menu.Item>
						}

					{logStatus ? 

							<Menu.Item disabled icon={<SettingOutlined />}>
				         		 <Button type="button" onClick={deconnexion}>Deconnexion</Button>
				       		</Menu.Item>
						:

					        <SubMenu icon={<UserOutlined />} title="Login">
					            <Menu.Item icon={<AppstoreOutlined />}><Link to="/login/students">Student Space</Link></Menu.Item>
					            <Menu.Item icon={<AppstoreOutlined />}><Link to="/login/instructors">Instructor Space</Link></Menu.Item>
					            <Menu.Item icon={<AppstoreOutlined />}><Link to="/login/administrators">Admin Space</Link></Menu.Item>
					        </SubMenu>
					}	

			        <Menu.Item>
			          <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
			            AntDesign (get quick antdesign access ;) )
			          </a>
			        </Menu.Item>
		      	</Menu>
			</div>
		</>
	);
};

export default Navbar;
