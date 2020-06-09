import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux"

import { Form, Input, Button, message } from 'antd';
import Cookies from 'js-cookie'

import { setConnexion } from "../../redux";



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


const LogIn = () => {
	const history = useHistory();
  const dispatch = useDispatch();



  const Connexion = ({identifier, password}) => {

    const data = {
      identifier,
      password
    }

    fetch('https://form-you-back.herokuapp.com/users/sign_in.json', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
       body: JSON.stringify(data)
    })

    .then(response => response.json())
    .then(response => {
            const token = response.jwt

            if (response.statusCode === 400) {
              message.error("Check your logs", 3);
            }
            else {
              message.success("Profile well login", 3);
              Cookies.set('token', token, { expires: 7 })
              dispatch(setConnexion())
              history.push("/")
            }
          })
    .catch(error => console.log(error));
  }


  const onFinish = values => {
    console.log('Success:', values);
    Connexion(values)
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
        label="Identifier"
        name="identifier"
        rules={[
          {
            required: true,
            message: 'Please input your username or email!',
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

export default LogIn;