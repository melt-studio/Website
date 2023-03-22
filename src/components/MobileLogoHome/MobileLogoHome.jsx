import React, { useEffect} from 'react'
import "./MobileLogoHome.css"
import WaterfallAnimation from "../WaterfallAnimation/index.js"

export default function MobileLogoHome(props) {

  // console.log("clicks", props.clicks)
  useEffect(() => {
    if (props.clicks > 2) {
      // document.querySelector('.mobile-logo-home__container').classList.add('hide');
      props.setMobileIntro("mobile-logo-home__container hide")
      document.body.style.overflow = 'auto';
      props.setFadeInText("inline")
    }
    
  }, [props.clicks, props])
  

  return (
    <div
      onTouchMove={() => props.setClicks(props.clicks + 1)} //// Too Sensitive for Effect
      onMouseDown={() => props.setClicks(props.clicks + 1)}
      onClick={() => props.setClicks(props.clicks + 1)}
      className='mobile-logo-home__container'>
    <WaterfallAnimation />
    </div>
  )
}
