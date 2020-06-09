import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux"

import { Form, Input, Button, message } from 'antd';
import { setProfile, setConnexion } from "../../redux";




	const layout = {
	  labelCol: {
	    span: 4,
	  },
	  wrapperCol: {
	    span: 16,
	  },
	};
	const tailLayout = {
	  wrapperCol: {
	    offset: 4,
	    span: 16,
	  },
	};


const Register = () => {
	const history = useHistory();
  const dispatch = useDispatch();



    const getProfile = (token) => {

    fetch('https://form-you-back.herokuapp.com/users/sign_in.json', {
      method: 'post',
      headers: {
        'Authorization': `${token}`, 
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(response => {
        dispatch(setConnexion())
      	history.push("/");
      })
      .catch(error => console.log(error));
  }



	const Inscription = ({ username, first_name, last_name, email, password}) => {

		const data = { 
      "user": {
        username,
        first_name,
        last_name,
  			email,
  			password
      }
		}

	 fetch('https://form-you-back.herokuapp.com/users.json', {
	          method: 'post',
	          headers: {
	            'Content-Type': 'application/json'
	          },
	         body: JSON.stringify(data)
	        })
	      .then(response => response.json()
          .then(user => ({
            jwt: response.headers.get('Authorization'),
            user
          })))
	      .then(result => {
          console.log(result)

              if (result.jwt) {
                dispatch(setProfile(result))
                message.success("Profile well registered", 3);
	              getProfile(result.jwt)
              }
              else
                message.error("Email or username already here", 3);
	            })
	      .catch(error => console.log(error));
  }


    const onFinish = values => {
    console.log('Success:', values);
    Inscription(values)
  };


  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };


	return (
		<>
	<Form
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >

    <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
    </Form.Item>

        <Form.Item
        label="First name"
        name="first_name"
      >
        <Input />
    </Form.Item>

        <Form.Item
        label="Last name"
        name="last_name"
      >
        <Input />
    </Form.Item>


     <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>


      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
		</>
	);
};

export default Register;
