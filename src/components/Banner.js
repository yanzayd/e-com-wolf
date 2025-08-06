import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from 'next/image'

function Banner() {
  return (
    <div className='relative top-[-33px]'>
        <div className='absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20'/>
        <Carousel
          autoPlay
          infiniteLoop
          showStatus={false}
          showIndicators={false}
          showThumbs={false}
          interval={5000}
        >
            <div>
                <Image
                    src="https://links.papareact.com/gi1"
                    alt=""
                    width={1600}
                    height={600}
                    style={{ objectFit: "cover" }}
                />
            </div>
            
            <div>
                <Image
                    src="https://links.papareact.com/6ff"
                    alt=""
                    width={1600}
                    height={600}
                    style={{ objectFit: "cover" }}
                />
            </div>
            
            <div>
                <Image
                    src="https://links.papareact.com/7ma"
                    alt=""
                    width={1600}
                    height={600}
                    style={{ objectFit: "cover" }}
                />
            </div>
        </Carousel>
    </div>
  )
}

export default Banner