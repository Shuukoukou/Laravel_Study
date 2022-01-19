/**
 * @description 用户登录
 * @author Zhou
 * @date 2021-1-10
 */
import React, {Component,useState} from 'react';
import { Form, Input, Button, Checkbox, message} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from "axios";
import cookie from 'react-cookie';
import './Login.css';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';


useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts?_limit=10`
        );
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

export default function Login({ setToken }) {

    componentDidMount (() => {
        const username = cookie.load('username');
        const change = cookie.load('changeSuccess');
        if (username !== undefined) window.location.href = '/index';
        if(change !== undefined){
            message.success("密码修改成功，请重新登录", 2);
            cookie.remove('changeSuccess', {path:'/'})
        }
    });

    componentDidMount (() => {
        if (cookie.load('registerSuccess') !== undefined) {
            message.success('注册成功，请登陆', 2)
            cookie.remove('registerSuccess', {path:'/'})
        }
    });

    state = {
        username: '',
        password: ''
    }

    //保存用户输入的用户名
    handleUsername = e => {
        this.setState({username: e.target.value})
    }

    //保存用户输入的密码
    handlePassword = e => {
        this.setState({password: e.target.value})
    }

  const handleSubmit = async e => {
    let that = this
    if (that.state.username === '' && that.state.password === '') return
    axios.post('/login', {
        username: this.state.username,
        password: this.state.password
        })
        .then(function (response) {
            const data = response.data
            const result = data.status
            if (result === 'success'){
                cookie.save('username', that.state.username, { path: '/' });
                cookie.save('loginSuccess', true, { path: '/' });
                cookie.save('email', data.email, {path:'/'});
                window.location.href = '/index';
            }
            else{
                message.warning('账号或密码错误', 2)
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    
  }

  return (
    <div className='myForm'>
        {/* <img src={'./images/loginPicture.jpg'} alt={'loginPicture'} className='leftPicture'/> */}
        <div className='right'>
            <h6 className='title'>用户登录</h6>
            <hr className='line'/>
            <Form
                name="normal_login"
                className="trueForm"
                initialValues={{
                    remember: true,
                }}
            >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: '请输入您的用户名',
                            trigger: 'blur'
                        },
                        {
                            min: 6,
                            max: 18,
                            message: '用户名长度应为6-18个字符',
                            trigger: 'blur'
                        }
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" onChange={e => setUserName(e.target.value)}/>
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: '请输入您的密码！',
                        },
                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon"/>}
                        type="password"
                        placeholder="密码"
                        onChange={e => setPassword(e.target.value)}
                    />
                </Form.Item>
                <Form.Item >
                    <Form.Item name="remember" noStyle>
                        <Checkbox>记住我</Checkbox>
                    </Form.Item>
                    <Link className="login-form-forgot" to="/forgetPwd" id="forgetPassword">
                        忘记密码？
                    </Link>
                </Form.Item>

                <Form.Item id='buttons'>
                    <div className='myBtn'>
                        <Button type="primary" htmlType="submit" className="login-form-button"
                                onClick = {e => handleSubmit()}>
                            登录
                        </Button>
                        {/* <Button type="primary" className="login-form-button" onClick = {this.goRegister}>
                            注册
                        </Button> */}
                    </div>
                </Form.Item>
            </Form>
        </div>
    </div>
);

}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};