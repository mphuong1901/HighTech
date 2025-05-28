import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function Login() {
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const onFinish = (values) => {
    setLoading(true);

    const { email, password } = values;
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const user = users.find(u => u.email === email && u.password === password);

    setTimeout(() => {
      setLoading(false);

      if (!user) {
        setLoginError("Incorrect account or password!");
      } else {
        login(user);
        message.success("Log in successfully!");
        navigate("/home");
      }
    }, 800);
  };

  return (
    <div style={{
      maxWidth: 350,
      margin: "40px auto",
      padding: 32,
      background: "#fff",
      borderRadius: 12,
      boxShadow: "0 2px 12px #eee"
    }}>
      <h2 style={{ textAlign: "center", marginBottom: 24 }}>Đăng nhập</h2>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Please enter email!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Mật khẩu"
          rules={[{ required: true, message: "Please enter password!" }]}
        >
          <Input.Password />
        </Form.Item>
        {loginError && (
          <div style={{ color: "red", marginBottom: 16, textAlign: "center" }}>
            {loginError}
          </div>
        )}
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Login
          </Button>
        </Form.Item>
      </Form>
      <div style={{ textAlign: "center" }}>
        Don't have an account? <Button type="link" onClick={() => navigate("/register")}>Register</Button>
      </div>
    </div>
  );
}

export default Login;
