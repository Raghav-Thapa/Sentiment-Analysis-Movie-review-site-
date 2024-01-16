import { useParams } from "react-router-dom"
import { Container, Row, Image, Col,Card } from "react-bootstrap";
// import bgimage from "../../assets/images/header-bg.jpeg"
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import category from "../admin/category/index";
import MovieList from "../components/movie-list.component";
import { NavLink } from "react-router-dom";

const CategoryDetail = () => {
    let params = useParams();
    const [catDetail, setCatDetail] = useState();
    const [movieDetail, setMovieDetail] = useState();
    const [loading, setLoading] = useState(true);

    const loadCategoryDetail = useCallback(async() => {
        try{

            let response = await category.categorySvc.getDetailCategory(params.slug);
            // console.log(response)
            setCatDetail(response.data.categoryDetail)
            setMovieDetail(response.data.movieList)
        }  catch(exception) {
            toast.warn("Error during Category fetch...")
            console.log(exception);
        } finally{
            setLoading(false)
        }
    }, [params])
    useEffect(() => {
        loadCategoryDetail()
    }, [params])

    // console.log(setMovieDetail)
    // console.log(movieDetail)

    return (
        <>
            <div className="header-wrapper">
                <Row>
                    {/* <Image src={bgimage} alt="" fluid /> */}
                </Row>
            </div>
            <Container className="bg-light my-3">
                {
                    loading ? <>Loading....</> : <>
                        <Row>
                            <Col>
                               
                            </Col>
                        </Row>
                        
                        <Row>
                            {
                                movieDetail ? <>
                                    {
                                        movieDetail.map((movie, index) => (

                                            <Col sm={6} md={4} lg={3} className="mb-3">
                                            <Card className="">
                                              <Card.Img src={import.meta.env.VITE_IMAGE_URL+"/movies/"+movie.images[0]}></Card.Img>
                                              <Card.Body>
                                                <NavLink
                                                  to={`/movie/`+movie.slug}
                                                  style={{ textDecoration: "none", cursor: "pointer" }}
                                                >
                                                  <h4 className="movieText">
                                                    {movie.name}
                                                  </h4>
                                                </NavLink>
                                    
                                                {/* <NavLink  to={`/city/${movie.city.slug}`}  className={"citybadge bhov"}>
                                                    <i class="fa-solid fa-location-dot"></i>  {movie.city.name}
                                                  </NavLink> */}
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
                                          </Col>
                                        ))
                                    }
                                </> : <Col sm={12}><p className="text-danger">No movies available on this category!!</p></Col>
                            }
                        </Row>
                    </>
                }
            </Container>
        </>
    )
}

export default CategoryDetail