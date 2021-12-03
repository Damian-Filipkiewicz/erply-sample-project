import React from 'react'
import {IconButton} from "./IconButton";

import logoutIcon from '../assets/images/logout.png'
import {useNavigate} from "react-router-dom";

export const HeaderBar = () => {
  const navigate = useNavigate()

  const name = localStorage.getItem('username') || 'Unknown'
  // const setSelectedLanguage = lang => localStorage.setItem('language', lang); // TODO - language change

  const handleLogout = () => {
    localStorage.removeItem('sessionKey')
    localStorage.removeItem('username')
    navigate('/login')
  }

  return <div className="header-bar">
    <div className="header-bar__account-container">
      <div className="header-bar__account-name">{name}</div>
      <IconButton className="header-bar__logout-button" onClick={handleLogout} img={logoutIcon}/>
    </div>
  </div>
}
