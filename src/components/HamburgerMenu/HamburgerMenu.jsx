import React from 'react'
import HamburgerInfo from '../HamburgerInfo/HamburgerInfo'
import "./HamburgerMenu.css"
export default function HamburgerMenu(props) {
  return (
    <div className='hamburger-menu__container'>
      <div className='hamburger-info__holder'>
        <HamburgerInfo setFadeInText={props.setFadeInText} setShowHamburger={props.setShowHamburger} HamburgerMenuLinkClickAbout={props.HamburgerMenuLinkClickAbout}HamburgerMenuLinkClickWork={props.HamburgerMenuLinkClickWork} />
      </div>
    </div>
  )
}
