import React, { useState, useEffect } from "react";
import { storage } from "../../utils/Storage";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAsyncMenuData } from "../../store/menuSlice";
import userApi from "@/api/userApi.js";

import { editUserData } from "../../store/userDataSlice";
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
import userAuth from "../../api/userAuth";
const Login = () => {
  const navigate = useNavigate();
  let { hasAuth } = userAuth();

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const onFinish = async (values) => {
    let params = {
      username: values.username,
      password: values.password,
    };
    let res = await userApi.login(params);
    if (res.code === 20000) {
      storage.set("token", res.data.token);
      dispatch(editUserData(res.data));
      let resMenu = await dispatch(getAsyncMenuData());
      if (resMenu.meta.requestStatus === "fulfilled") {
        message.success("登录成功！");
        navigate("/");
      } else {
        message.success("出错了！");
      }
    } else {
      message.success(res.msg);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (hasAuth()) {
      navigate("/");
      return;
    }
    notification.open({
      message: "欢迎使用后台管理平台",
      duration: null,
      description: "账号 admin(管理员) ",
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
            initialValues={{ username: "3444982748@qq.com", password: 123456 }}
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
                autoComplete="off"
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
