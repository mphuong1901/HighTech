import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate, Link } from "react-router-dom";
import backgroundLogin from "../Image/BackgroundLogin.png";

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
    <div style={{
      height: "100vh",
      display: "flex",
      alignItems: "center",
      backgroundImage: `url(${backgroundLogin})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}>
      <div style={{ 
        maxWidth: 550, 
        margin: "0 0 0 8%", 
        padding: "32px 50px", 
        background: "#fff", 
        borderRadius: 12, 
        boxShadow: "0 8px 24px rgba(0,0,0,0.15)" 
      }}>
        <h2 style={{ textAlign: "center", marginBottom: 24 }}>Register an account</h2>
        <Form layout="vertical" onFinish={onFinish} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please enter email!" },
            { type: "email", message: "Invalid email!" }
          ]}
          style={{ width: "100%" }}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            { required: true, message: "Please enter password!" },
            {
              pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{9,}$/,
              message: "Password must be at least 9 characters and contain both letters and numbers!"
            }
          ]}
          style={{ width: "100%" }}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm password"
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
          style={{ width: "100%" }}
        >
          <Input.Password />
        </Form.Item>
        
        {registerError && (
          <div style={{ color: "red", marginBottom: 16, textAlign: "center" }}>
            {registerError}
          </div>
        )}

        <Form.Item style={{ width: "100%" }}>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Register
          </Button>
        </Form.Item>
      </Form>
      <div style={{ textAlign: "center" }}>
        Already have an account? <Link to="/login">Login</Link>
      </div>
      </div>
    </div>
  );
}

export default Register;
