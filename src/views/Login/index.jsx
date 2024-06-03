import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import {
  Layout,
  Button,
  Form,
  Input,
  Divider,
  notification,
  message,
} from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import "@/style/view-style/login.scss";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onFinish = (values) => {
    switch (values.username) {
      case "admin":
        values.auth = 0;
        break;
      default:
        values.auth = 1;
    }
    localStorage.setItem("user", JSON.stringify(values));
    message.success("登录成功！");
    navigate("/");
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    notification.open({
      message: "欢迎使用后台管理平台",
      duration: null,
      description: "账号 admin(管理员) 其他(游客) 密码随意",
    });
    return () => {
      notification.destroy();
    };
  }, []);

  return (
    <Layout className="login animated fadeIn">
      <div className="model">
        <div className="login-form">
          <h3>后台管理系统</h3>
          <Divider />
          <Form
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "请输入账号！",
                },
              ]}
            >
              <Input
                placeholder="账号"
                prefix={<UserOutlined className="site-form-item-icon" />}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "请输入密码",
                },
              ]}
            >
              <Input.Password
                placeholder="密码"
                prefix={<LockOutlined className="site-form-item-icon" />}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={loading}
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
