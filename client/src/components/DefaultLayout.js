import React from "react";
import "../resources/default-layout.css";
import { Dropdown, Space } from 'antd';
import { useNavigate } from "react-router";

// All the pages will be wrapped in this layout - DefaultLayout
// Anything passed to DefaultLayout will be rendered as children

function DefaultLayout(props) { // Receive all pages as props

    const user = JSON.parse(localStorage.getItem('personal-budget-app-user'));
    const navigate = useNavigate();

    const items = [
        {
            key: '1',
            label: (
                <span onClick={() => {
                    localStorage.removeItem('personal-budget-app-user');
                    navigate('/login');
                }}>Logout</span>
            )
        }
    ]

    return (
        <div className="layout">

            <div className="header d-flex justify-content-between align-items-center">
                <div>
                    <h1 className="logo">Budget Tracking</h1>
                </div>
                <div>
                    <Space direction="vertical">
                        <Space wrap>
                            <Dropdown
                                menu={{items}} placement="bottomLeft">
                                    <button className="primary">{user.name}</button>
                                </Dropdown>
                        </Space>
                    </Space>
                </div>
            </div>

            <div className="content">
                {props.children} {/* Render the page */}
            </div>
            
        </div>
    );
}

export default DefaultLayout;