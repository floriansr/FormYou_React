import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux"

import { Form, Input, Button, message, Select } from 'antd';
import Cookies from 'js-cookie'

import { setProfile, setConnexion } from "../../redux";

const { Option } = Select;



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



    const getProfile = (token, status) => {

    fetch(`https://form-you-back.herokuapp.com/${status}s/sign_in.json`, {
      method: 'post',
      headers: {
        'Authorization': `${token}`, 
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(response => {
        console.log(response)
        dispatch(setConnexion())
      	history.push("/");
      })
      .catch(error => console.log(error));
  }



	const Inscription = ({ firstname, lastname, email, password, status}) => {

    const data = {}

      data[status] = {
          first_name : firstname,
          last_name : lastname,
          email,
          password
      }

    console.log(data)

    
    fetch(`https://form-you-back.herokuapp.com/${status}s.json`, {
	          method: 'post',
	          headers: {
	            'Content-Type': 'application/json'
	          },
	         body: JSON.stringify(data)
	        })
	      .then(response => response.json()
          .then(user => (
            {
            jwt: response.headers.get('Authorization'),
            user
          })))
	      .then(result => {
            console.log(result.jwt)

              if (result.jwt) {
                Cookies.set('token',{"jwt":result.jwt, "status":status}, { expires: 7 })
                dispatch(setProfile(result))
                message.success("Profile well registered", 3);
	              getProfile(result.jwt, status)
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

    const [form] = Form.useForm();

    const onStatusChange = value => {
      switch (value) {
        case "professor":
          return form.setFieldsValue({ note: "Hi, professor!" });
        case "admin":
          return form.setFieldsValue({ note: "Hi admin!" });
        case "student":
          return form.setFieldsValue({ note: "Hi, student!" });
        default:
          return null
      }
    }


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
              label="First name"
              name="firstname"
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
            label="Last name"
            name="lastname"
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

          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <Select
              placeholder="Select a option and change input text above"
              onChange={onStatusChange}
              allowClear
            >
              <Option value="student">student</Option>
              <Option value="instructor">instructor</Option>
              <Option value="administrator">admin</Option>
            </Select>
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
