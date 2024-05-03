import { Form, Input, message } from 'antd';
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import '../resources/authentication.css';
import axios from 'axios';
import Spinner from '../components/Spinner';

function Register() {
    const [ loading, setLoading ] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        //console.log('Received values:', values);
        try {
            setLoading(true);
            const { name, email, password } = values;
            const response = await axios.post('/api/users/register', { name, email, password });
            setLoading(false);
            message.success(response.data);
            navigate("/login");
        } catch (error) {
            setLoading(false);
            message.error(error.response.data);
            console.log('error:', error);
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

                {/* Left column - Animation */}
                <div className="col-md-5">
                    <div className="lottie">
                        <lottie-player src="https://lottie.host/a36910c8-e773-425f-90cb-4f9272f99550/qKSfP0guDE.json" 
                        background="##FFFFFF" speed="1" loop autoplay direction="1" mode="normal"
                        ></lottie-player>
                    </div>
                </div>

                {/* Right column - Registration form */}
                <div className="col-md-4">
                    <Form layout='vertical' onFinish={onFinish}>

                        <h1>Create Account</h1>
            
                        <Form.Item label='Name' name='name' rules={[{ required: true }]}>
                            <Input type='text' />
                        </Form.Item>

                        <Form.Item label='Email' name='email' rules={[{ required: true }]}>
                            <Input type='email'/>
                        </Form.Item>

                        <Form.Item label='Password' name='password' rules={[{ required: true }]}>
                            <Input type='password'/>
                        </Form.Item>

                        <div className="d-flex justify-content-between align-items-center">
                            <Link to='/login'>Already have an account? Login</Link>
                            <button className="secondary" type='submit'>Register</button>
                        </div>
                    
                    </Form>

                </div>

            </div>
        </div>
    );
}

export default Register;