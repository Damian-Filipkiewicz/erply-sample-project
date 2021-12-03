import React from 'react'
import {IconButton} from "./IconButton";

import logoutIcon from '../assets/images/logout.png'

export const HeaderBar = () => {

  const name = localStorage.getItem('username') || 'Unknown'
  // const setSelectedLanguage = lang => localStorage.setItem('language', lang); // TODO - language change


  return <div className="header-bar">
    <div className="header-bar__account-container">
      <div className="header-bar__account-name">{name}</div>
      <IconButton className="header-bar__logout-button" img={logoutIcon}/>
    </div>
  </div>
}
