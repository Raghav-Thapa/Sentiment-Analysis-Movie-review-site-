import { useCallback, useEffect, useState } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import movie from "../admin/movie";
import sentiment from "../admin/sentiments";
import { Col, Container, Row, Carousel, Badge, Form, Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
// import "../../assets/css/movie.css"

const MovieDetail = () => {
    const navigate = useNavigate();
    const params = useParams();
    let [loading, setLoading] = useState(true);
    let [detail, setDetail] = useState();
    const [sentimentText, setSentimentText] = useState('');

    let [sentiments, setSentiments] = useState([]);

    

    const loadSentiments = useCallback(async () => {
        try {
            let movieResponse = await movie.movieSvc.getMovieBySlug(params.slug);
            // console.log(movieResponse.result)
            let sentimentResponse = await sentiment.sentimentSvc.getSentimentsByMovie(movieResponse.result._id);
            setSentiments(sentimentResponse);
        } catch (exception) {
            toast.warn("Sentiments cannot be fetched");
        }
    }, [params]);
    console.log(sentiments);
    // let [qty, setQty] = useState(0);

    const loadMovieDetail = useCallback(async () => {
        try {
            let response = await movie.movieSvc.getMovieBySlug(params.slug);
            setDetail(response.result)
        } catch (exception) {
            toast.warn("Movie detail cannot be fetched")
        } finally {
            setLoading(false)
        }
    }, [params])
    useEffect(() => {
        loadMovieDetail()
        loadSentiments();
    }, [params])

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem('accessToken');
            const response = await fetch('http://localhost:5000/api/sentiment/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    text: sentimentText,
                    movieId: detail._id
                })
            });
            const data = await response.json();
            // Handle the response here
            // You might want to update the sentiments state with the new sentiment
            setSentiments([...sentiments, data]);
            setSentimentText('');  // Clear the textarea
        } catch (error) {
            console.error('Failed to submit sentiment:', error);
        }
    };

    // let loggedInuser = useSelector((root) => {
    //     return root.User.loggedInUser
    // }) 

    return (<>
        <Container className="my-5 bg-light">
            {
                loading ? <>Loading...</> : <>
                    <Row>
                        <Col sm={12} md={4}>
                            <Carousel data-bs-theme="dark">
                                {
                                    detail && detail.images.map((item, index) => (
                                        <Carousel.Item key={index}>

                                            <img src={import.meta.env.VITE_IMAGE_URL + "/movies/" + item} className="img img-fluid" />
                                        </Carousel.Item>
                                    ))
                                }
                            </Carousel>
                        </Col>
                        <Col sm={12} md={8}>
                            <h4 className="movieText">{detail.name}</h4>
                            <p>

                                {
                                    detail.categories && detail.categories.map((cat) => (

                                        <NavLink key={cat._id} to={`/category/${cat.slug}`} className={"me-3 mt-3 btn btn-sm categorybadge bhov"}>
                                            {cat.name}
                                        </NavLink>

                                    ))
                                }
                            </p>
                            <h5>Positive Sentiments:</h5>
                            {
                                sentiments && sentiments.filter(sentiment => sentiment.sentiment === 'pos').map((sentiment, index) => (
                                    <div key={index}>
                                        <p>Username: {sentiment.username}</p>
                                        <p>Text: {sentiment.text}</p>
                                        {/* <p>Sentiment: {sentiment.sentiment}</p> */}
                                        <hr />
                                    </div>
                                ))
                            }
                            <h5>Negative Sentiments:</h5>
                            {
                                sentiments && sentiments.filter(sentiment => sentiment.sentiment === 'neg').map((sentiment, index) => (
                                    <div key={index}>
                                        <p>Username: {sentiment.username}</p>
                                        <p>Text: {sentiment.text}</p>
                                        {/* <p>Sentiment: {sentiment.sentiment}</p> */}
                                        <hr />
                                    </div>
                                ))
                            }
                            <Row>
                                <Col sm={6}>
                                    <form onSubmit={handleSubmit}>
                                        <textarea value={sentimentText} onChange={e => setSentimentText(e.target.value)} />
                                        <Button variant="success" className="text-white" size="sm" type="submit">
                                            Submit Now &nbsp; <i class="fa-solid fa-angles-right fa-beat-fade"></i>
                                        </Button>
                                    </form>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="mt-4" sm={12} dangerouslySetInnerHTML={{ __html: detail.detail }}></Col>
                    </Row>
                </>
            }
        </Container>
    </>)
}

export default MovieDetail