import React from "react";
import './HeaderBar.css';
import { Navigate } from "react-router-dom";
function HeaderBar() {
  return (
    <div className="topbar">
      <span className="topbar-center">Summer Sale For All Tech Products – OFF 50%! <a onClick={() => Navigate('home')}>ShopNow</a></span>
    </div>
  );
}
export default HeaderBar; 