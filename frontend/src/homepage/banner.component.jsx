import Carousel from 'react-bootstrap/Carousel';
import bannerimg from "../assets/images/moviebanner.jpg"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import movieimg from "../assets/images/spiderman.jpg"
import avengerimg from "../assets/images/avenger.jpg"
import ironmanimg from "../assets/images/ironman.jpg"
import captainimg from "../assets/images/captain.jpg"
import thorimg from "../assets/images/thor.jpg"
import { NavLink } from 'react-router-dom';

const Banner = () => {
    return(<>
    <div className='backgroundd'>
      <Carousel>
      <Carousel.Item>
        <img className='bannerimg' src={bannerimg} alt="" />
      </Carousel.Item>
    </Carousel>      
    </div>
    </>)
}

export default Banner