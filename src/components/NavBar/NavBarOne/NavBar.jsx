import React, {useState} from 'react'
import "./NavBar.css"

export default function NavBar() {
  const [isVis, setIsVis] = useState("isVisible")

  var scrollableElement = document.body; //document.getElementById('scrollableElement');

scrollableElement.addEventListener('wheel', checkScrollDirection);

function checkScrollDirection(event) {
  if (checkScrollDirectionIsUp(event)) {
    // console.log('UP');
    setIsVis("isVisible")
  } else {
    // console.log('Down');
    setIsVis("isHidden")
  }
}

function checkScrollDirectionIsUp(event) {
  if (event.wheelDelta) {
    return event.wheelDelta > 0;
  }
  return event.deltaY < 0;
}

  return (
    <div className={isVis}>
    <h2>NAV</h2>
    </div>
  )
}
