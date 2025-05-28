import React, { useState } from "react";
import { Dropdown, Menu, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useAuth } from "./AuthContext";

function UserMenu() {
  const { user, logout } = useAuth();
  const [visible, setVisible] = useState(false);

  const handleMenuClick = (e) => {
    if (e.key === "logout") {
      logout();
      setVisible(false);
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="logout">Đăng xuất</Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={["click"]} visible={visible} onVisibleChange={setVisible}>
      <Avatar style={{ backgroundColor: "#DB4444", cursor: "pointer" }} icon={<UserOutlined />} />
    </Dropdown>
  );
}

export default UserMenu;