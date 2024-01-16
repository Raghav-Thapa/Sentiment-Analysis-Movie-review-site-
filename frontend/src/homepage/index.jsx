import Banner from "./banner.component"
import MovieList from "../components/movie-list.component";
// import CategoryList from "./components/category-list.component"
import { Container, Row, Col, Button, Card } from "react-bootstrap"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import category from "../admin/category"
import movie from "../admin/movie"
import { useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
// import "../../assets/css/movie.css"

export const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, backgroundColor: "#bf9959", borderRadius: "50%" }}
            onClick={onClick}
        >
            Next
        </div>
    );
};

export const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, backgroundColor: "#bf9959", borderRadius: "50%" }}
            onClick={onClick}
        >
            Prev
        </div>
    );
};

const HomePage = () => {
    const [cats, setCats] = useState();

    const loadCategories = useCallback(async () => {
        let response = await category.categorySvc.listAllHomeCategories(20, 1);
        setCats(response.result)
    }, [])

    

    const [movieList, setMovieList] = useState();

    const loadMovies = useCallback(async() => {
        let response = await movie.movieSvc.listHomeMovies(24, 1)
        setMovieList(response.result)
      }, [])


    useEffect(() => {
        loadCategories()
        loadMovies()
    }, [])

    const movieSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,

    };

    return(<>
    <Banner/>
    <>
        <Container fluid className="my-5 bg-light">
                <Row className="p-3">
                    <Col><h4 style={{ color: "#bf9959" }} className="text-center titlee">PROPERTIES FOR EVERYONE</h4></Col>
                </Row>

                <Row className="my-3 bg-light">
                    <div style={{ padding: "40px" }} >
                        <Slider {...movieSettings}>

                            {
                               movieList && movieList.map((movie, index) => (
                                <MovieList 
                                  key={index}
                                  movie={movie}
                                />
                                ))
                            }
                        </Slider>
                    </div>
                </Row>
            </Container>

        </>
    </>)
}

export default HomePage