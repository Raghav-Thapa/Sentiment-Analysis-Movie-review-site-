import { NavLink } from "react-router-dom";

import { Col, Card, Badge, Row, Container } from "react-bootstrap";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import "../../../assets/css/movie.css"


const MovieList = ({ movie }) => {
    
// console.log(movie.city)
// console.log(movie.categories);

  return (
    <>
    <div style={{backgroundColor:'black'}}>
      
        <Card className="movielistcard">
          <Card.Img className=''  src={import.meta.env.VITE_IMAGE_URL+"/movies/"+movie.images[0]}></Card.Img>
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