import React, { useState, useEffect, useRef } from 'react'
import { getAllProjects } from '../../../services/projects.js';
import "./ProjectFullPage.css"
import { Fade } from "react-awesome-reveal";
import {Animated} from "react-animated-css";
import FadeInOut from '../../../components/FadeInOutAnimation/FadeInOutAnimation.jsx';
import { Helmet } from "react-helmet";
import ReactPlayer from 'react-player'
import { keyframes } from "@emotion/react";
import { useNavigate } from 'react-router-dom';
// import FooterSmaller from '../../../components/Footer/FooterSmaller/FooterSmaller.jsx';
import ProjectTitleTransition from '../../../components/ProjectTitleTransition/ProjectTitleTransition.jsx';

export default function ProjectFullPage(props) {
   const navigate = useNavigate();

  const [loaded,isLoading] = useState(false)
  const [project, setProject] = useState({})
  const [vidCursor, setVidCursor]=useState("https://res.cloudinary.com/bobalobbadingdong/image/upload/c_scale,w_80/v1677874584/MELT%20Works/MELT_WEBSITE_ICONS__Arrow-white_ehf6vp.png")
  const [vidPlay, setVidPlay] = useState(false)
  const [animatedIsVisible, setAnimatedIsVisible]=useState(true)


  useEffect(() => {
    // props.setVisible(true)
    
    if (props.projects.length) {
      console.log(props.projects)
      const proj = props.projects.find(element => "/" + element.fields.projectUrl === `${window.location.pathname}`)
      setProject(proj)
      isLoading(true)
      // console.log('loaded ONE')
        const color = `${proj.fields.colorTheme}`
        document.body.style.background = color
     if (window.innerWidth > 800) {
      setTimeout(() => {
           document.body.style.cursor = 'default';
           document.body.style.overflow = 'auto';
          setAnimatedIsVisible(false)
         }, 3200); 
        
         setTimeout(() => {
          document.querySelector('.fade-in-up-element-background__proj').classList.add('show');
          //  document.querySelector('.project__cover-photo-holder').classList.add('visible');
         }, 3600);
       
          setTimeout(() => {
            document.querySelector('.fade-in-up-element__proj').classList.add('visible');
            //  document.querySelector('.project__cover-photo-holder').classList.add('visible');
          }, 4000);
        
          setTimeout(() => {
            document.querySelector('.project-title').classList.add('show');
          }, 4200);
        
          setTimeout(() => {
            document.querySelector('.proj-description').classList.add('show');
          }, 4500);
       
       //// NOT SURE ABOUT THESE TWO....
       
      // setTimeout(() => {
            // document.querySelector('.title-ref-top').classList.add('visible'); ////// I DON"T THINK THIS DOES ANYTRHING
          // }, 4000);
      
      // setTimeout(() => {
            // document.querySelector('.footer-transition__hider').classList.add('visible');  //// ADD BACK IN IF FOOTER ADDED BACK
          // }, 2000);
      
      
       } else {
        setTimeout(() => {
          document.body.style.cursor = 'default';
          document.body.style.overflow = 'auto';
         setAnimatedIsVisible(false)
        }, 3200);

        setTimeout(() => {
          document.querySelector('.fade-in-up-element-background__proj').classList.add('show');
          // project__cover-photo-holder
        }, 4000);
       
        setTimeout(() => {
          document.querySelector('.fade-in-up-element__proj').classList.add('visible');
          // project__cover-photo-holder
        }, 4000);
        setTimeout(() => {
          document.querySelector('.project-title').classList.add('show');
        }, 4500);
      
        setTimeout(() => {
          document.querySelector('.proj-description').classList.add('show');
        }, 4500);
       
        setTimeout(() => {
          // if (document.getElementById("project-about__section-one__mobile").classList.contains('.project-about__section-one__mobile')) {
            document.querySelector('.project-about__section-one__mobile').classList.add('show');
          // }
            }, 5500);
            setTimeout(() => {
              document.querySelector('.project-about__section-three__mobile').classList.add('show');
            }, 4700);
            setTimeout(() => {
              props.setShowHamburger("hamburger__holder")
            }, 5000);
         }
            
      
     
          setTimeout(() => {
      if (loaded === false) {
          const fetchProjects = async () => {
            const projArray = await getAllProjects();
            const proj = projArray.find(element => "/" + element.fields.projectUrl === `${window.location.pathname}`)
          setProject(proj)
            isLoading(true)
            // console.log('loaded TWO')
                const color= `${proj.fields.colorTheme}`
                document.body.style.background = color
          }
          fetchProjects()
        }
        }, 1000);
      }
    // eslint-disable-next-line
  }, [props.projects, loaded])
  
 
  const ref = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return
      // console.log(loaded)
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          if (window.innerWidth > 800) {
           if (rect.top < window.innerHeight && rect.bottom > 0) {
              // console.log("Is Visible");
             document.querySelector('.project__content-holder').classList.add('hide');
             
              // document.querySelector('.proj-description').classList.remove('show');
              // document.querySelector('.project-title').classList.remove('show');
           } else {
             document.querySelector('.project__content-holder').classList.remove('hide');
            
           }
        }
      }
    }
      window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loaded]);
  

  const refTwo = useRef(null);
  useEffect(() => {
    const handleScrollTwo = () => {
      if (!ref.current) return
      // console.log(project)
      if (ref.current) {
        const rect = refTwo.current.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          // console.log("TOPP");
if (window.innerWidth > 800) {
          // document.querySelector('.project-title').classList.add('show');
          // document.querySelector('.proj-description').classList.add('show');
  document.querySelector('.project__content-holder').classList.remove('hide');
  if (document.querySelector('.images-holder').classList.contains('is-vis')) {
    document.querySelector('.images-holder').classList.add('not');
    
    setTimeout(() => {
      document.querySelector('.images-holder').classList.remove('not');
      document.querySelector('.images-holder').classList.remove('is-vis');
    }, 1000);
  }
            }
        }
      }
    }
    window.addEventListener('scroll', handleScrollTwo);
    return () => window.removeEventListener('scroll', handleScrollTwo);
  }, [project]);

  
  const hrRef = useRef(null);
  useEffect(() => {
    const handleScrollTwo = () => {
      if (!ref.current) return
      // console.log(project)
      if (ref.current) {
        const rect = hrRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          if (window.innerWidth > 800) {
            // console.log("TOPP");
            setTimeout(() => {
              if (document.getElementById("project-about__hr-line__holder").classList.contains('.fade-in-up-element')) {
                
                document.querySelector('.project-about__hr-line__holder').classList.add('grow');
              }
            }, 1000);
          } else if  (document.querySelector('.project-about__hr-line__holder').classList.contains("grow")) {
            document.querySelector('.project-about__hr-line__holder').classList.remove('grow');
          }
        }
      }
    }

    window.addEventListener('scroll', handleScrollTwo);
    return () => window.removeEventListener('scroll', handleScrollTwo);
  }, [project]);
  
  
window.addEventListener('scroll', function() {
    var element = document.querySelector('#proj-content-holder');
    if (!ref.current) return
    if (ref.current.getBoundingClientRect().y <= -580 || null) {
      
      var position = element.getBoundingClientRect();
      
      if (window.innerWidth > 800) {
      // checking whether fully visible
      // if(position.top >= 100 && position.bottom <= window.innerHeight) {
      //   document.querySelector('.fade-in-up-element__proj').classList.remove('visible');
      //   document.querySelector('.fade-in-up-element__proj').classList.add('out-up');
      // }
      
      // checking for partial visibility
      if(position.top < window.innerHeight && position.bottom >= 0) {
        // console.log('Element is partially visible in screen');
      }
        }
    }
  }); 

  window.addEventListener('scroll', function () {
    if (!ref.current) return
    if (ref.current.getBoundingClientRect().y <= -580 || null) { 
   
    var wideelement = document.querySelector('#top');
    var wideposition = wideelement.getBoundingClientRect();
    if (window.innerWidth > 800) {
    // checking whether fully visible
    if(wideposition.top >= 100 && wideposition.bottom <= window.innerHeight) {
      // console.log('Element is fully visible in screen');
    }
    
    // checking for partial visibility
    if(wideposition.top < window.innerHeight && wideposition.bottom >= 0) {
      // console.log('Element is partially visible in screen');
      // document.querySelector('.fade-in-up-element__proj').classList.remove('out-up');
      // document.querySelector('.fade-in-up-element__proj').classList.add('visible');
    }
    }  }
  });
 
  const cursorToggle = () => {
    if (vidCursor === "https://res.cloudinary.com/bobalobbadingdong/image/upload/c_scale,w_80/v1677874584/MELT%20Works/MELT_WEBSITE_ICONS__Arrow-white_ehf6vp.png") {
      setVidCursor("https://res.cloudinary.com/bobalobbadingdong/image/upload/c_scale,w_80/v1677874584/MELT%20Works/MELT_WEBSITE_ICONS__X-white_irckou.png")
    } else {
      setVidCursor("https://res.cloudinary.com/bobalobbadingdong/image/upload/c_scale,w_80/v1677874584/MELT%20Works/MELT_WEBSITE_ICONS__Arrow-white_ehf6vp.png")
  }
    
    // console.log('toggle!@')
}
 
  const toggleVidPlay = () => {
    if (vidPlay === false) {
      setVidPlay(true)
      cursorToggle()
    } else {
      setVidPlay(false)
      cursorToggle()
    }
  }

  // console.log("project", project.fields)

  // function changeOpacity() {
  //   var image = document.getElementById("cover-image");
  //   var rect = image.getBoundingClientRect();
  //   var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
  //   var visibility = (rect.bottom / viewHeight) * 100;
    
  //   if (visibility > 70) {
  //     image.style.opacity = "1";
  //   } else {
  //     image.style.opacity = (visibility / 100);
  //   }
  // }
  
  // // Call the function on scroll
  // window.addEventListener("scroll", changeOpacity);

  const customAnimation = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 50px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;
const customAnimationCloseProj = keyframes`
from {
  opacity: 0;
  transform: translate3d(0, 15px, 0);
}
to {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}
`;
const customAnimationProjectImages = keyframes`
from {
  opacity: 0;
  transform: translate3d(0, 30px, 0);
}
to {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}
`;

  const customAnimationProjectKeyWords = keyframes`
// 0%{
//   opacity: 0;
//   transform: translate3d(0, 50px, 0);
// }
// 50%{
//   opacity: .5;
//   transform: translate3d(0, 20px, 0);
// }
// 100%{
//   opacity: 1;
//   transform: translate3d(0, 0px, 0);
// }
from {
  opacity: 0;
  // transform: translate3d(0, 0px, 0, 50px);
  transform: translateY(5px);
}
to {
  opacity: 1;
  transform: translateY(0);
}
`;

  const Posterref = useRef(null);
  useEffect(() => {
    const handleScrollPoster = () => {
      if (!Posterref.current) return
      // console.log(loaded)
        if (Posterref.current) {
          const rect = Posterref.current.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
              // console.log("Is Visible");
          document.querySelector('.fade-in-up-element-background__proj').classList.add('no-more');
          setTimeout(() => {
            
            document.querySelector('.fade-in-up-element__proj').classList.add('out-up');
          }, 800);
          props.setVisible(true)
          // document.querySelector('.back-button__holder').classList.add('visible');
               } 
            }
          }
          window.addEventListener('scroll', handleScrollPoster);
          return () => window.removeEventListener('scroll', handleScrollPoster);
        }, [loaded]);

  const PosterrefTop = useRef(null);
  useEffect(() => {
    const handleScrollPosterTop = () => {
      if (!PosterrefTop.current) return
      // console.log(loaded)
        if (PosterrefTop.current) {
          const rect = PosterrefTop.current.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
              // console.log("Is Visible AGAIN");
          document.querySelector('.fade-in-up-element-background__proj').classList.remove('no-more');
          setTimeout(() => {
            
            document.querySelector('.fade-in-up-element__proj').classList.remove('out-up');
          }, 800);
          props.setVisible(false)
          // document.querySelector('.back-button__holder').classList.remove('visible');
            } 
        }
    }
    window.addEventListener('scroll', handleScrollPosterTop);
    return () => window.removeEventListener('scroll', handleScrollPosterTop);
  }, [loaded]);


  const ProjImgsRef = useRef(null);
  useEffect(() => {
    const handleScrollPosterTop = () => {
      if (!ProjImgsRef.current) return
      // console.log(loaded)
        if (ProjImgsRef.current) {
          const rect = ProjImgsRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
              // console.log("Is Visible AGAIN");
              document.querySelector('.images-holder').classList.add('is-vis');
            } 
          }
      }
      window.addEventListener('scroll', handleScrollPosterTop);
        return () => window.removeEventListener('scroll', handleScrollPosterTop);
    }, [loaded]);
  
   
    // useEffect(() => {
      // const handleScroll = () => {
      //   if (window.scrollY >= window.innerHeight) {
      //     // console.log("100vh!");
      //     props.setStickyIsVis("sticky-info")
      //     props.setVisible(true)
      //   } else {
      //     props.setVisible(false)
      //   }
      // };
  
      // window.addEventListener("scroll", handleScroll);
  
      // return () => {
      //   window.removeEventListener("scroll", handleScroll);
      // };
    // }, []);
  
  

  return (
    <div className='project__container page'>
      
      {loaded ? (
          <div className='project__background' style={{ color: `${project.fields.colorText}`, backgroundColor: `${project.fields.colorTheme}` }}>
          <div id="top" />
          <Helmet>
          <meta charSet="utf-8" />
          <title>MELLLLLLT - {project.fields.name}</title>
          </Helmet>
          
          <div style={{
            position: 'absolute',
            top: '20vh',
            height: '50px',
            width: '50px',
            // backgroundColor: "red"
          }} ref={PosterrefTop} />
          <div style={{
            position: 'absolute',
            top: '120vh',
            height: '50px',
            width: '50px',
            // backgroundColor: "red"
          }} ref={Posterref} />
            {project.fields.mainImage ? (
            <>
            <Animated 
            animationIn="fadeIn" 
            animationOut="fadeOut" 
            isVisible={animatedIsVisible}
            >
            <ProjectTitleTransition
            title={project.fields.name}
            subtitle={project.fields.description}
            colorTheme={project.fields.colorTheme}
            visibleText={true}
            colorText={project.fields.colorText}
            />
        </Animated>
              <div id="proj__cover-img-holder-tall" className='project__cover-photo-holder '>
                {window.innerWidth < 850 ? (
                  <div
                  style={{  width: '100%', display: 'flex', justifyContent: 'center', }}
                  className='fade-in-up-element-background__proj'>
                  <img id="cover-image" className=" fade-in-up-element__proj" src={project.fields.mainImage[0].url} alt="cover" />
                  </div>
                ): (
                  <div
                  style={{ backgroundColor: project.fields.cursorColor, width: '100%', display: 'flex', justifyContent: 'center', }}
                  className='fade-in-up-element-background__proj'>
                  <img id="cover-image" className=" fade-in-up-element__proj" src={project.fields.mainImage[0].url} alt="cover" />
                  </div> 
                )}
                
               
                
                
              
              </div> 
              <div
                className="title-ref-top"
                style={{
                position: 'absolute',
                top: '80vh',
                height: '50px',
                width: '50px',
                // backgroundColor: "red"
              }} ref={refTwo} />

              
              
                
              </>
          
          ) : (
              <>
                  {project.fields.mainVid ? (
                  <>
                  <Animated 
                  animationIn="fadeIn" 
                  animationOut="fadeOut" 
                  isVisible={animatedIsVisible}
                  >
                  <ProjectTitleTransition
                  title={project.fields.name}
                  subtitle={project.fields.description}
                  colorTheme={project.fields.colorTheme}
                  visibleText={true}
                  colorText={project.fields.colorText}
                  />
              </Animated>
                  <div style={{
                    position: 'absolute',
                    top: '70vh',
                    height: '50px',
                    width: '50px',
                    // backgroundColor: "red"
                  }} ref={refTwo} />
                    <div className='project__cover-photo-wide-holder'>
                      
                      <FadeInOut >
                        <div
                          onClick={() => toggleVidPlay()}
                          id='embed-cont'
                          className='embed-container'
                          style={{ cursor:`url(${vidCursor}), auto` }}>
                          
                          <ReactPlayer
                            style={{backgroundColor:project.fields.cursorColor}}
                          className="fade-in-up-element__proj"
                            width='100vw'
                            height="100vh"
                            url={project.fields.mainVid[0].url}
                            // url="https://res.cloudinary.com/bobalobbadingdong/video/upload/v1673907034/Cherry/Cherry%20Clients/Graphic%20Assets/P1022_CRIME_SCENE_S03_OPEN_R06_4444_CROP_hokk8v.mp4"
                            // onStart={() => }
                            playing={vidPlay}
                          />
                          
                          
                      </div>
                      </FadeInOut>
                    </div>
                    </>
                ) : (
                  <div></div>
                  )}
                  </>
            
          )}  

          <div className='project__content-holder'>
          <div id="project-about__hr-line__holder" className='project-about__hr-line__holder'>
         
           
         
            </div>

            <div ref={hrRef} className='project__text-holder '>
              
           
              
            <div className='project__about-sections'>
                
                <div className='project-about__section-one'>
                  
                  {project.fields.projectCopy && 
                    <>
                    <Fade
                    keyframes={customAnimation}
                      opposite
                  direction="up"
                  duration={3000}
                  delay={0}
                  triggerOnce={true}
                  fraction={0}
                    >
                    <h1 className='project-title '>{project.fields.name}</h1>
                
                
                    <h3 className='proj-description '>{project.fields.description}</h3>
                        <h1 className='jumbo-text'>{project.fields.projectCopy}</h1>
                      
                    
                    </Fade>
                  </>
                  }
                 
                  
                </div>
                
                <div id="project-about__section-one__mobile" className='project-about__section-one__mobile'>
                  {project.fields.projectCopy && 
                    <>
                    <h1 className='project-title show'>{project.fields.name}</h1>
                    <h3 className='proj-description '>{project.fields.description}</h3>
                    <h1 className='jumbo-text' >{project.fields.projectCopy}
                    </h1>
                    </>
                 }
                </div>
                  
                
                  
                <div className='project-about__section-three'>
                   {project.fields.projectScope && (
                    <>
                <Fade
                  direction="up"
                  duration={1500}
                  delay={1000}
                  triggerOnce={true}
                  fraction={0}
                  >
                  <h1 className='project_scope'>Project Scope</h1>
                  </Fade>
                  <div className='project-about__section-two-mobile'><hr className='hr-line' style={{ backgroundColor: `${project.fields.colorText}` }} /></div>
                  <Fade
                  keyframes={customAnimationProjectKeyWords}
                  className='project__tags'
                  cascade
                  // direction="left"
                  duration={700}
                  delay={1500}
                  triggerOnce={true}
                  fraction={0}
            >
                  {project.fields.projectScope.map((tag) => (
                    <div key={`tag: ${tag}`} >
                    <h3 key={`tag h3: ${tag}`}  className='project__tags' >{tag}</h3>
                    <div id='proj-content-holder'/>
                    </div>
                    ))}
                    </Fade>
                  </>
                  )}
                  {project.fields.projectCollaborators && (
                    <div  className='credit-section '>
                    <div className='only-on-mobile'> 
                      <hr
                        className='hr-line'
                        style={{ backgroundColor: `${project.fields.colorText}` }}
                      />
                    </div>
                      <Fade
                        cascade={true}
                        direction="up"
                        duration={1500}
                        delay={1000}
                        triggerOnce={false}
                        fraction={0}
                      >
                        <h1 className='project_scope'>Collaborators</h1>
                        {project.fields.projectCollaborators.map((collaborator, index) => (
                          <div key={`${collaborator}+${index}+holder`}>
                          <h3 key={collaborator+index} className='project-collaborators'>{collaborator}</h3>
                          </div>
                    ))}
                      </Fade>
                      
                    </div>
                  )}
                  
                 
                  

                </div>



                <div className='project-about__section-three__mobile'>
                 {project.fields.projectScope && (
                    <>
                  <h1 className='project_scope'>Project Scope</h1>
                  
                  <div className='project-about__section-two-mobile'><hr className='hr-line' style={{ backgroundColor: `${project.fields.colorText}` }} /></div>
                 
                    {project.fields.projectScope.map((tag) => (
                      <div className='project__tags' key={`tag: ${tag}`} >
                       
                      <h3 key={`tag h3: ${tag}`} className='project__tags'>{tag}</h3>
                        
                        <div id='proj-content-holder'/>
                      </div>
                    ))}
                    </>
                  )}
                  
                  
                  {project.fields.projectCollaborators && (
                    <div  className='credit-section '>
                    <div className='only-on-mobile'>
                       
                    <hr
                      className='hr-line'
                      style={{ backgroundColor: `${project.fields.colorText}` }}
                    />
                          
                          </div>
                      
                    <h1 className='project_scope'>Collaborators</h1>
                    <hr
                      className='hr-line'
                      style={{ backgroundColor: `${project.fields.colorText}`, marginTop:'-12px', marginBottom:"20px" }}
                    />
                    {project.fields.projectCollaborators.map((collaborator, index) => (
                      <div style={{display:'flex', flexDirection:'column'}} key={`${collaborator}+${index}+holder`}>
                      <h3 key={collaborator+index} className='project-collaborators'>{collaborator}</h3>
                      </div>
                ))}
                     
                    </div>
                  )}
                 
                  

                </div>



              </div>
              
              {project.fields.mainVid && <div className="space-wid-after-collab" />}
              
            </div>
          </div>
          <div className="proj-img-ref-div"
            style={{
              // Fades in Out Images
            position: 'relative',
            top: '40vh',
            height: '50px',
            width: '50px',
            // backgroundColor: "blue"
            }} 
          ref={ProjImgsRef} />
          {project.fields.mainVid ? (
            <>
            <div style={{
              width: '50px',
              height: '50px',
              // backgroundColor: 'blue',
              position: "relative",
                top: "320px",
              marginBottom:'10vh'
            }} ref={ref} />
            </>
          ) : (
              
              <div style={{ 
              // Fades in Out Copy
              width: '50px',
              height: '50px',
              // backgroundColor: 'green',
              position: "relative",
              top:"350px",
            }} ref={ref} />
          )}
          <div className='images-holder'>
            
            {window.innerWidth > 800 ? (
              <>
              {project.fields.images.map((image, index) => (
                <div key={`project-div ${index}`} className="project-image__holder">
                  <Fade   
                keyframes={customAnimationProjectImages}
              opposite
              direction="up"
              duration={2000}
              delay={0}
              triggerOnce={false}
              fraction={0}
                >
                {image.type === "video/mp4" ? (
                  <>
                  <ReactPlayer
                            // style={{backgroundColor:project.fields.cursorColor}}
                            // className="fade-in-up-element__proj"
                            width='90vw'
                            height="auto"
                            url={image.url}
                            // url="https://res.cloudinary.com/bobalobbadingdong/video/upload/v1673907034/Cherry/Cherry%20Clients/Graphic%20Assets/P1022_CRIME_SCENE_S03_OPEN_R06_4444_CROP_hokk8v.mp4"
                            // onStart={() => }
                            // playing={vidPlay}
                          controls
                        />
                  </>
                ) : (
                    <>
                      <img className='project__images' key={`project ${index}`} alt={`project ${index}`} src={image.url} />
                    </>
                )}
                  </Fade>
                
                </div>
              ))}
              </>
            ) : (
                <>
                  {project.fields.mobileImages ? (
                    <>
                    {project.fields.mobileImages.map((image, index) => (
                      <div key={`project-div ${index}`} className="mobile-project-image__holder">
                        <Fade   
                      keyframes={customAnimationProjectImages}
                    opposite
                    direction="up"
                    duration={2000}
                    delay={0}
                    triggerOnce={false}
                    fraction={0}
                      >
                        <img className='project__images' key={`project ${index}`} alt={`project ${index}`} src={image.url} />
                        </Fade>
                      
                      </div>
                    ))}
                    </>
                  ) : (
                      <>
                      {project.fields.images.map((image, index) => (
                        <div key={`project-div ${index}`} className="project-image__holder">
                          <Fade   
                        keyframes={customAnimationProjectImages}
                      opposite
                      direction="up"
                      duration={2000}
                      delay={0}
                      triggerOnce={false}
                      fraction={0}
                          >
                            {image.type === "video/mp4" ? (
                              <>
                              <ReactPlayer
                            // style={{backgroundColor:project.fields.cursorColor}}
                            // className="fade-in-up-element__proj"
                            width='90vw'
                            height="auto"
                            url={image.url}
                            // url="https://res.cloudinary.com/bobalobbadingdong/video/upload/v1673907034/Cherry/Cherry%20Clients/Graphic%20Assets/P1022_CRIME_SCENE_S03_OPEN_R06_4444_CROP_hokk8v.mp4"
                            // onStart={() => }
                            // playing={vidPlay}
                                  controls
                        />
                              </>
                            ) : (
                                <>
                                  <img className='project__images' key={`project ${index}`} alt={`project ${index}`} src={image.url} />
                                 
                                </>
                            )}
                          </Fade>
                        
                        </div>
                      ))}
                      </>
                )}
                
                </>
          )}
         
            
           


            </div>
          
            <Fade
            keyframes={customAnimationCloseProj}
              opposite
          direction="up"
          duration={3000}
          delay={0}
          triggerOnce={false}
          fraction={0}
          >
          
            <div className='back-button__container-holder'>
            <div className='back-button__container'>
                <div
                onClick={() => {
                  /// Hide Nav Bar
                navigate(-1);
                props.setBackgroundColor("#000000")
              }}
                onMouseEnter={()=>{
                  const hoverFill = document.querySelector(".close-project-underline");
                  hoverFill.classList.add("hovered")
                }}  
                onMouseLeave={()=>{
                  const hoverFill = document.querySelector(".close-project-underline");
                  hoverFill.classList.add("mouse-leave")
                  setTimeout(() => {
                    hoverFill.classList.remove("mouse-leave")
                    hoverFill.classList.remove("hovered")
                  }, 300);
                }}  
                  className="back-button_holder"
                >
            <p
                    style={{
                      // color: `${project.fields.colorText}`
                      color: "white"
                    }} className='close-proj__text'>CLOSE PROJECT</p>
                      <div className='close-project-underline'>
                    <hr
                    style={{ backgroundColor: `white` }}
                      // style={{ backgroundColor: `${project.fields.colorText}` }}
                    />
            </div>
            </div>
        </div>
            </div>
            </Fade>
        </div>
       
      ) : (
          <h1>loading...</h1>
      )}
      
    </div>
  )
}

// <div className='footer-transition__hider'>
//           <FooterSmaller
//           color={props.navTextColor}          
//           />
//           </div>