import Carousel from 'react-bootstrap/Carousel';
import bannerimg from "../assets/images/moviebanner.jpg"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import movieimg from "../assets/images/movie.jpg"
import { NavLink } from 'react-router-dom';

const Banner = () => {
    return(<>
    <div className='backgroundd'>
      <Carousel>
      <Carousel.Item>
        <img className='bannerimg' src={bannerimg} alt="" />
      </Carousel.Item>
    </Carousel>
        
        <div className='cardalign'>
    <Card className='moviecard' style={{ width: '18rem' }}>
      <Card.Img className='cardimg' variant="top" src={movieimg} />
      <Card.Body>
        <Card.Title>Movie Title</Card.Title>
       <NavLink  to='/review'><Button variant="primary">Go somewhere</Button></NavLink> 
      </Card.Body>
    </Card>

    <Card className='moviecard' style={{ width: '18rem' }}>
      <Card.Img className='cardimg' variant="top" src={movieimg} />
      <Card.Body>
        <Card.Title>Movie Title</Card.Title>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>

    <Card className='moviecard' style={{ width: '18rem' }}>
      <Card.Img className='cardimg' variant="top" src={movieimg} />
      <Card.Body>
        <Card.Title>Movie Title</Card.Title>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>

    <Card className='moviecard' style={{ width: '18rem' }}>
      <Card.Img className='cardimg' variant="top" src={movieimg} />
      <Card.Body>
        <Card.Title>Movie Title</Card.Title>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
    </div>
    </div>
    </>)
}

export default Banner