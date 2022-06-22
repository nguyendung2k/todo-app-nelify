import React, { useContext } from 'react';

import { Form, Input, Button, Row, Col } from 'antd';
import { Layout } from 'antd';

import { AuthContext } from '../store/auth-context';

import styles from './Login.module.css';
import { containsWhitespace } from '../../utils/string.utils'
import { openNotification } from '../../utils/notice.utils'

const { Content } = Layout;

const Login = () => {
    const context = useContext(AuthContext)

    const onFinish = ({ username, password }) => {
        if (containsWhitespace(username) && containsWhitespace(password)) {
            openNotification('warning', 'Tài khoản & mật khẩu không được chứa khoảng trắng!!!');
        }
        context.onLogIn(username, password);
    };
    const tailLayout = {
        wrapperCol: {
            offset: 8,
            span: 16,
        },
    };

    return (
        <>
            <Layout className={styles.layout}>
                <Content>
                    <Row>
                        <Col span={8}></Col>
                        <Col span={8}>
                            <Form
                                name="basic"
                                onFinish={onFinish}
                                autoComplete="off"
                                className={styles.form}
                            >
                                <Form.Item>
                                    <h1 className={styles.h1}>Login</h1>
                                </Form.Item>
                                <Form.Item
                                    label="Username"
                                    name="username"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your username!'
                                        },
                                        {
                                            min: 5,
                                            max: 20,
                                            message: 'Min length must be at least 5 & Max length must be at least 20!',
                                        }
                                    ]}
                                    className={styles.form__item}
                                >
                                    <Input className={styles.input__username} />
                                </Form.Item>
                                <Form.Item
                                    label="Password"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your password!',
                                        },
                                        {
                                            min: 5,
                                            max: 20,
                                            message: 'Min length must be at least 6 & Max length must be at least 20!',
                                        }
                                    ]}
                                    className={styles.form__item}
                                >
                                    <Input.Password className={styles.input} />
                                </Form.Item >
                                <Form.Item {...tailLayout} >
                                    <Button
                                        className={styles.btn}
                                        type="primary"
                                        htmlType="submit"
                                    >
                                        Login
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Col>
                        <Col span={8}></Col>
                    </Row>
                </Content>
            </Layout>
        </>
    );
};

export default Login;