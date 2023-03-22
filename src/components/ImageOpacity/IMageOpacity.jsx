import React, { useState, useEffect, useRef } from 'react';
// import "./ImageOpacity.css"
import "../../screens/Project/ProjectFullPage/ProjectFullPage.css"

const ImageOpacity = ({ src, alt, proj, hoverEvent, goToProject, hoverLeaveEvent, className }) => {
  const [classToChange, setClassToChange]=useState(className)
  const [chosen, setChosen] = useState(false)
  const [opacity, setOpacity] = useState(0);
  // const [width, setWidth] = useState('10%');
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio === 0) {
          setOpacity(0);
          // setWidth('10%');
        } else {
          setOpacity(entry.intersectionRatio);
          // setWidth(`${entry.intersectionRatio * 100}%`);
        }
      },
      { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] }
    );
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [imgRef]);

  return (
    <div style={{ opacity }}>
      
      {chosen  ? (
        <>
        <img
        className={classToChange}
        onMouseEnter={() => hoverEvent(proj.fields.colorTheme, "none")}
        // onClick={() => goToProject(proj.fields.projectUrl)}
        onMouseLeave={hoverLeaveEvent}
        ref={imgRef}
        src={src}
        alt={alt}
        // style={{
        //   position: 'fixed',
        //   left: `30%`,
        //   top: `0`,
        //   transition: ' all 2s'
        // }}
      />
        </>
      ): (
          <>
          <img
        className={classToChange}
        onMouseEnter={() => hoverEvent(proj.fields.colorTheme, "none")}
              onClick={
                () => {
                  setClassToChange("class-change")
                  setChosen(true);
                  setTimeout(() => {
                    goToProject(proj.fields.projectUrl)
                  }, 1000);
                }
              }
        onMouseLeave={hoverLeaveEvent}
        ref={imgRef}
        src={src}
        alt={alt}
        style={{
          position: 'relative',
          left: `${proj.fields.yAxis}%`,
          top: `${proj.fields.xAxis}px`,
          width: `${proj.fields.width}vw`,
          cursor:'pointer'
        }}
      />
          </>
      )}
      
    </div>
  );
};

export default ImageOpacity;

