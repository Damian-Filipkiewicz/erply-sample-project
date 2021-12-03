import React from 'react'
import {IconButton} from "./IconButton";

import logoutIcon from '../assets/images/logout.png'
import {useNavigate} from "react-router-dom";

export const HeaderBar = () => {
  const navigate = useNavigate()

  const name = localStorage.getItem('username') || 'Unknown'
  const setSelectedLanguage = lang => localStorage.setItem('language', lang);


  const handleLogout = () => {
    localStorage.removeItem('sessionKey')
    localStorage.removeItem('username')
    navigate('/')
  }

  return <div className="header-bar">
    <div className="header-bar__accountContainer">
      <div className="header-bar__accountName">{name}</div>
      <IconButton className="header-bar__logoutButton" onClick={handleLogout} img={logoutIcon}/>
    </div>
    <div>
      <div onClick={() => setSelectedLanguage('en')}>en</div>
      <div onClick={() => setSelectedLanguage('ru')}>ru</div>
    </div>
  </div>
}
