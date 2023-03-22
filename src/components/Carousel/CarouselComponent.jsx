import React from 'react'
import "./CarouselComponent.css"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

export default function CarouselComponent(props) {
  return (
    <Carousel
          useKeyboardArrows={true}
          swipeable={true}
          className='carousel'
          showStatus={false}
          infiniteLoop={true}
          showThumbs={false}
          // showArrows={false}
            >
              {props.project.fields.images.map((image, index) => (
                <div className='carousel-div' key={`project image holder ${index}`}>
                <img alt={`project ${index}`} className='carousel-image' key={`project image ${index}`} src={image.url} />
                </div>
              ))}
          
          </Carousel>
  )
}
