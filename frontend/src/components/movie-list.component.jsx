import { NavLink } from "react-router-dom";

import { Col, Card, Badge, Row } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import "../../../assets/css/movie.css"


const MovieList = ({ movie }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        // nextArrow: <NextArrow />,
        // prevArrow: <PrevArrow />,

    };
    
// console.log(movie.city)
// console.log(movie.categories);

  return (
    <>
    <div className='cardalign'>
        <Card className="moviecard" style={{ width: '18rem' }}>
          {/* <Card.Img className='cardimg'  src={import.meta.env.VITE_IMAGE_URL+"/movies/"+movie.images[0]}></Card.Img> */}
          <Card.Body>
            <NavLink
              to={`/movie/`+movie.slug}
              style={{ textDecoration: "none", cursor: "pointer" }}
            >
              <h4 className="movieText">
                {movie.name}
              </h4>
            </NavLink>
                <p style={{marginTop:'10px'}}>      
              {
                movie.categories && movie.categories.map((cat) => (
                    
                    <NavLink key={cat._id} to={`/category/${cat.slug}`} className={"me-3 btn btn-sm categorybadge bhov"}>
                        {cat.name}
                    </NavLink>
                    
                ))
              }
            </p>

          
            <NavLink
              to={`/movie/`+movie.slug}
              className={"btn btn-sm viewmore bhov"}
            >
              View More  <i class="fa-solid fa-beat fa-angle-right"></i>
            </NavLink>
          </Card.Body>
        </Card>
        </div>
    </>
  );
};

export default MovieList;