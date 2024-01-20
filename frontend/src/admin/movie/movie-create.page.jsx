import { Container, Card, Breadcrumb, Row, Col } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import {FaArrowLeft} from "react-icons/fa";
import movie from ".";
import { toast } from "react-toastify";
import MovieForm from "./movie-form.component";

const MovieCreateForm = () => {
    const navigate = useNavigate();

    const handleSubmit = async(values) => {
        try{
            const response = await movie.movieSvc.createMovie(values)
            toast.success(response.msg)
            navigate('/admin/movie')
        } catch(error) {
            toast.error("Cannot create movie. Retry again after reloading the page...")
        }
    }
    return (<>
        <Container fluid className="px-4">
            <Row>
                <Col sm={12} md={6}>
                    <h1 className="mt-4">Movie Create Page</h1>
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
                <Breadcrumb.Item active>Movie Create</Breadcrumb.Item>
            </Breadcrumb>

            <Card className="mb-4">
                <Card.Body>
                    <MovieForm 
                        submitAction={handleSubmit}
                    />
                </Card.Body>
            </Card>
        </Container>
    </>)
}

export default MovieCreateForm;