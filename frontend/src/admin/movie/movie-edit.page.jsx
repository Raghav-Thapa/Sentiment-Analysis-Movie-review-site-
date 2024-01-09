import { Container, Card, Breadcrumb, Row, Col } from "react-bootstrap";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import {FaArrowLeft} from "react-icons/fa";
import movie from ".";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import MovieForm from "./movie-form.component";

const MovieEditForm = () => {
    const navigate = useNavigate();
    const params = useParams()

    const [detail, setDetail] = useState()

    const handleSubmit = async(values) => {
        try{
            if(typeof values.image !== 'object'){
                delete values.image
            }

            const response = await movie.movieSvc.updateMovie(values, params.id)
            toast.success(response.msg)
            navigate('/admin/movie')
        } catch(error) {
            // TODO: Debug for error 
            toast.error("Cannot create movie. Retry again after reloading the page...")
        }
    }

    const getMovieDetail = async () => {
        try {
            let response = await movie.movieSvc.getMovieById(params.id)
            setDetail(response.result);
        } catch(exception){
            toast.error("Movie Cannot be fetched at this moment")
            navigate('/admin/movie')
        }
    }
    useEffect(() => {
        // get Detail
        getMovieDetail()
    }, [])

    return (<>
        <Container fluid className="px-4">
            <Row>
                <Col sm={12} md={6}>
                    <h1 className="mt-4">Movie Edit Page</h1>
                </Col> 
                <Col md={6} sm={12} className="d-none d-md-block">
                    <NavLink className={"btn btn-sm btn-success mt-5 float-end"} to ="/admin/movie">
                        <FaArrowLeft/>    Go To List
                    </NavLink>
                </Col>
            </Row>
            <Breadcrumb className="mb-4">
                <Breadcrumb.Item>
                    <NavLink to="/admin">Dashboard</NavLink>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <NavLink to="/admin/movie">Movie Listing</NavLink>
                </Breadcrumb.Item>
                <Breadcrumb.Item active>Movie Edit</Breadcrumb.Item>
            </Breadcrumb>

            <Card className="mb-4">
                <Card.Body>
                    {detail && <MovieForm 
                        submitAction={handleSubmit}
                        detail={{
                            name: detail.name,
                            detail: detail.detail, 
                            categories: detail.categories.map((cat) => { return {value: cat._id, label: cat.name} }),
                            price: detail.price, 
                            city: {value: detail.city._id, label: detail.city.name},
                            // discount: detail.discount, 
                            isFeatured: detail.isFeatured, 
                            ownerId: {value: detail.ownerId._id, label: detail.ownerId.name},
                            attributes: detail.attributes,
                            status: detail.status, 
                            images: detail.images
                        }}
                    />}
                </Card.Body>
            </Card>
        </Container>
    </>)
}

export default MovieEditForm;