import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [loading, setLoading] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const navigate = useNavigate();

  const onFinish = (values) => {
    setLoading(true);

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const emailExists = users.find(user => user.email === values.email);

    if (emailExists) {
      setLoading(false);
      setRegisterError("Email has been registered!");
      return;
    }

    const newUser = {
      email: values.email,
      password: values.password
    };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    setLoading(false);
    message.success("Registration successful!");
    setTimeout(() => {
      navigate("/login");
    }, 800);
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto", padding: 32, background: "#fff", borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
      <h2 style={{ textAlign: "center", marginBottom: 24 }}>Register an account</h2>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please enter email!" },
            { type: "email", message: "Invalid email!" }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Mật khẩu"
          rules={[
            { required: true, message: "Please enter password!" },
            {
              pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{9,}$/,
              message: "Password must be at least 9 characters and contain both letters and numbers!"
            }
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Xác nhận mật khẩu"
          dependencies={['password']}
          rules={[
            { required: true, message: "Please confirm password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Passwords do not match!'));
              }
            })
          ]}
        >
          <Input.Password />
        </Form.Item>
        
        {registerError && (
          <div style={{ color: "red", marginBottom: 16, textAlign: "center" }}>
            {registerError}
          </div>
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Register
          </Button>
        </Form.Item>
      </Form>
      <div style={{ textAlign: "center" }}>
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
}

export default Register;
