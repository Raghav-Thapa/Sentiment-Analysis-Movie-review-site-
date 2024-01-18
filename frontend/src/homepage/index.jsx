import Banner from "./banner.component"
import MovieList from "../components/movie-list.component";
// import CategoryList from "./components/category-list.component"
import { Container, Row, Col, Button, Card, CardBody } from "react-bootstrap"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import category from "../admin/category"
import movie from "../admin/movie"
import { useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
// import "../../assets/css/movie.css"


const HomePage = () => {
    const [cats, setCats] = useState();

    const loadCategories = useCallback(async () => {
        let response = await category.categorySvc.listAllHomeCategories(20, 1);
        setCats(response.result)
    }, [])



    const [movieList, setMovieList] = useState();

    const loadMovies = useCallback(async () => {
        let response = await movie.movieSvc.listHomeMovies(24, 1)
        setMovieList(response.result)
    }, [])


    useEffect(() => {
        loadCategories()
        loadMovies()
    }, [])

    return (<>
        <Banner />
        <>
        <div className='cardalign backgroundd'>
                {
                    movieList && movieList.map((movie, index) => (
                        <NavLink to={`/movie/`+movie.slug}> <Card className='moviecard' style={{ width: '18rem' }}>
                            <Card.Img className='cardimg'  src={import.meta.env.VITE_IMAGE_URL+"/movies/"+movie.images[0]}></Card.Img>
                            
                            <Card.Body className="cardbodyy">
                            <Card.Title id="cardTitle">{movie.name}</Card.Title>
                            </Card.Body>
          </Card>
          </NavLink>

                        
                    ))
                }
         
            </div>
        </>
    </>)
}

export default HomePage