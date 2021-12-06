import React from 'react';
import { useNavigate } from "react-router-dom";
import logoutIcon from '../assets/images/logout.png';
import { IconButton } from "./IconButton";

export const HeaderBar = () => {
  const navigate = useNavigate();

  const name = localStorage.getItem('username') || 'Unknown';

  const handleLogout = () => {
    localStorage.removeItem('sessionKey');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return <div className="header-bar">
    <div className="header-bar__account-container">
      <div className="header-bar__account-name">{name}</div>
      <IconButton className="header-bar__logout-button" onClick={handleLogout} img={logoutIcon}/>
    </div>
  </div>;
};
