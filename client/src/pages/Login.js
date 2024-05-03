import { Form, Input, message } from 'antd';
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import '../resources/authentication.css';
import axios from 'axios';
import Spinner from '../components/Spinner';

function Login() {
    const [ loading, setLoading ] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        // console.log('Received values:', values);
        try {
            setLoading(true);
            const { email, password } = values;
            const response = await axios.post('/api/users/login', { email, password });
            // console.log('response.data', response.data);
            if (response.status === 200) {
                setLoading(false);
                message.success('Login Successful!');
                // localStorage.setItem('personal-budget-app-user', JSON.stringify({...response.data, password: null}))
                localStorage.setItem('personal-budget-app-user', JSON.stringify(response.data))
                navigate("/")
            } else {
                setLoading(false);
                message.error('Login failed!');
            }
        } catch (error) {
            setLoading(false);
            message.error(error.response.data);
            console.log(error);
        }
    }

    useEffect(() => {
        if (localStorage.getItem('personal-budget-app-user')) {
            navigate('/')
        }
    }, [navigate]);

    return (
        <div className="register">

            {loading && <Spinner />}

            <div className="row justify-content-center align-items-center w-100 h-100">

                {/* Left column - Login Form */}
                <div className="col-md-4">
                    <Form layout='vertical' onFinish={onFinish}>

                        <h1>Login</h1>

                        <Form.Item label='Email' name='email'>
                            <Input placeholder='Enter your email' />
                        </Form.Item>

                        <Form.Item label='Password' name='password'>
                            <Input placeholder='Enter your password' type='password'/>
                        </Form.Item>

                        <div className="d-flex justify-content-between align-items-center">
                            <Link to='/register'>Don't have an account? Register</Link>
                            <button className="secondary" type='submit'>Login</button>
                        </div>
                    
                    </Form>

                </div>

                {/* Right column - Animation */}
                <div className="col-md-5">
                    <div className="lottie">
                        <lottie-player src="https://lottie.host/a36910c8-e773-425f-90cb-4f9272f99550/qKSfP0guDE.json" 
                        background="##FFFFFF" speed="1" loop autoplay direction="1" mode="normal"
                        ></lottie-player>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Login;