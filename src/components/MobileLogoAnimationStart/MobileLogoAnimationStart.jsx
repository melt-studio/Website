import React,{useEffect, useState} from 'react'
import "./MobileLogoAnimationStart.css"
import Drippy from "../../assets/images/Logo/MELT_DRIPPY.svg"

export default function MobileLogoAnimationStart(props) {
  const [pOne, setPOne] = useState("fade-in-intro-text__one")
  const [pTwo, setPTwo] = useState("fade-in-intro-text__two")
  const [pThree, setPThree] = useState("fade-in-intro-text__three")
  const [pFour, setPFour] = useState("fade-in-intro-text__four")
  const [pFive, setPFive] = useState("fade-in-intro-text__five")
  const [pSix, setPSix] = useState("fade-in-intro-text__six")
  const [pSeven, setPSeven] = useState("fade-in-intro-text__seven")
  const [pEight, setPEight] = useState("fade-in-intro-text__eight")

  useEffect(() => {
    if (props.fadeInText === "inline") {
      setTimeout(() => {
        setPOne("fade-in-intro-text__one_visible")
      }, 1700);
      setTimeout(() => {
        setPTwo("fade-in-intro-text__two_visible")
      }, 1800);
      setTimeout(() => {
        setPThree("fade-in-intro-text__three_visible")
      }, 1900);
      setTimeout(() => {
        setPFour("fade-in-intro-text__four_visible")
      }, 2000);
      setTimeout(() => {
        setPFive("fade-in-intro-text__five_visible")
      }, 2100);
      setTimeout(() => {
        setPSix("fade-in-intro-text__six_visible")
      }, 2200);
      setTimeout(() => {
        setPSeven("fade-in-intro-text__seven_visible")
      }, 2300);
      setTimeout(() => {
        setPEight("fade-in-intro-text__eight_visible")
      }, 2400);
    }
  }, [props])

  
  return (
    <div className='mobile-logo-animation-start__container'>
      <div className='drippy-logo__mobile-intro__container'>
        <img className={props.mobileIntroLogo} src={Drippy} alt="logo" />
        <div style={{display:`${props.fadeInText}`}}>
      <div
      className='mobile__info'
      // className={props.fadeInText}
      >
     
      <p className={pOne} style={{paddingTop:'60vh',paddingLeft:'5%'}}>MELT is a</p>
      <p className={pTwo} style={{position:'relative', bottom:'9vh',paddingLeft:'5%'}}>creative</p>
      <p className={pThree} style={{position:'relative', bottom:'18vh',paddingLeft:'5%'}}>studio</p>
      <p className={pFour} style={{position:'relative', bottom:'27vh',paddingLeft:'5%'}}>bringing</p>
      <p className={pFive} style={{position:'relative', bottom:'36vh',paddingLeft:'5%'}}>stories</p>
      <p className={pSix} style={{position:'relative', bottom:'45vh',paddingLeft:'5%'}}>to life</p>
      <p className={pSeven} style={{position:'relative', bottom:'54vh',paddingLeft:'5%'}}>through</p>
      <p className={pEight} style={{position:'relative', bottom:'63vh',paddingLeft:'5%'}}>design.</p>
    
      </div>
      </div>
        
      </div>
    </div>
  )
}