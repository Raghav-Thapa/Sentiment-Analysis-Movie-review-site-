import { NavLink } from "react-router-dom";

import { Col, Card, Badge, Row, Container } from "react-bootstrap";



const MovieList = ({ movie }) => {
    
// console.log(movie.city)
// console.log(movie.categories);

  return (
    <>
    <div style={{backgroundColor:'black'}}>
      
        <Card className="movielistcard">
        <NavLink to={`/movie/`+movie.slug}>  <Card.Img style={{ backgroundColor: "rgb(62, 59, 59)"}}  src={import.meta.env.VITE_IMAGE_URL+"/movies/"+movie.images[0]}></Card.Img>
        </NavLink>
          <Card.Body>
            <NavLink
              to={`/movie/`+movie.slug}
              style={{ textDecoration: "none", cursor: "pointer" }}
            >
              <h4 className="movieTextt">
                {movie.name}
              </h4>
            </NavLink>
                <p className="">      
              {
                movie.categories && movie.categories.map((cat) => (
                    
                    <NavLink key={cat._id} to={`/category/${cat.slug}`} className={"me-3 btn btn-sm categoryName"}>
                        {cat.name}
                    </NavLink>
                    
                ))
              }
            </p>

          
            <NavLink
              to={`/movie/`+movie.slug}
              className={"btn btn-sm viewmore"}
            >
              View More  <i class="fa-solid fa-angle-right"></i>
            </NavLink>
          </Card.Body>
        </Card>
      
        </div>
    </>
  );
};

export default MovieList;