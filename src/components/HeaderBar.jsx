import React from 'react'
import {IconButton} from "./IconButton";

import logoutIcon from '../assets/images/logout.png'

export const HeaderBar = () => {

  const name = localStorage.getItem('username') || 'Unknown'
  const setSelectedLanguage = lang => localStorage.setItem('language', lang);


  return <div className="headerBar">
    <div className="headerBar__accountContainer">
      <div className="headerBar__accountContainer__accountName">{name}</div>
      <IconButton className="headerBar__accountContainer__logoutButton" img={logoutIcon}/>
    </div>
    <div>
      <div onClick={() => setSelectedLanguage('en')}>en</div>
      <div onClick={() => setSelectedLanguage('ru')}>ru</div>
    </div>
  </div>
}
