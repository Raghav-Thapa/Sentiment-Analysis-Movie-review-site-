import { useCallback, useEffect, useState } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import movie from "../admin/movie";
import sentiment from "../admin/sentiments";
import { Col, Container, Row, Carousel, Badge, Form, Button, Card } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
// import "../../assets/css/movie.css"

const MovieDetail = () => {
    const navigate = useNavigate();
    const params = useParams();
    let [loading, setLoading] = useState(false);
    let [detail, setDetail] = useState();
    const [sentimentText, setSentimentText] = useState('');

    let [sentiments, setSentiments] = useState([]);

    const [positiveReviews, setPositiveReviews] = useState(0);
    const [negativeReviews, setNegativeReviews] = useState(0);

    const updateReviewCounts = () => {
        const posReviews = sentiments.filter(sentiment => sentiment.sentiment === 'positive').length;
        const negReviews = sentiments.filter(sentiment => sentiment.sentiment === 'negative').length;
    
        setPositiveReviews(posReviews);
        setNegativeReviews(negReviews);
      };

      useEffect(() => {
        updateReviewCounts();
      }, [sentiments]);
  


    const [openReviewArea, setOpenReviewArea] = useState(false)

    const handleOpenReviewArea = () => {
        setOpenReviewArea(true)
    }


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
    // console.log(sentiments);
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
            setLoading(true);
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
            if (response.status === 401) {
                toast.warn('You are not logged in. Please login to continue.');
                // navigate('/')
                return;
            }
            const data = await response.json();
            // Handle the response here
            // You might want to update the sentiments state with the new sentiment
            setSentiments([...sentiments, data]);
            setSentimentText('');  // Clear the textarea
        } catch (error) {
            console.error('Failed to submit sentiment:', error);
        } finally {
            setLoading(false);
        }
        setOpenReviewArea(false)
        
    };

 

    // let loggedInuser = useSelector((root) => {
    //     return root.User.loggedInUser
    // }) 
    const [firstName, ...lastNameArray] = detail && detail.name ? detail.name.split(' ') : '';
    const lastName = lastNameArray.join(' ');

    return (<>
        <div className='backgroundd' style={{height:'1500px'}}>

            <div>
                <Carousel>
                    {
                        detail && detail.images.map((item, index) => (
                            <Carousel.Item key={index}>

                                <img src={import.meta.env.VITE_IMAGE_URL + "/movies/" + item} className="bannerimg bannerheight" />
                            </Carousel.Item>
                        ))
                    }
                </Carousel>

                <div>
                    <div className="moviedetail">
                        <h2 className='moviename'>
                            <span className='first-word'>{firstName} </span> &nbsp;
                            <span className='second-word'>{lastName}</span>
                        </h2>
                        <button className='mt-2 mb-2' style={{ borderRadius: "7px", border: "4px solid #09b0e7" }}><i class="fa-solid fa-video"></i>&nbsp; Trailer</button>
                        <p style={{ color: 'whitesmoke' }} dangerouslySetInnerHTML={{ __html: detail && detail.detail }}></p>
                        <b style={{ color: 'whitesmoke' }}>Genre: </b>
                        <span style={{ color: '#09b0e7', textDecoration: 'none' }}>&nbsp;
                            {
                                detail && detail.categories && detail.categories.map((cat) => (
                                    <NavLink style={{ textDecoration: 'none', color: '#09b0e7' }} key={cat._id} to={`/category/${cat.slug}`}>
                                        {cat.name}
                                    </NavLink>
                                ))
                            }
                        </span><br />
                        <b style={{ color: 'whitesmoke' }}>Country: </b><span style={{ color: '#09b0e7' }}>&nbsp; United States, United Kingdom</span><br />
                        <b style={{ color: 'whitesmoke' }}>Duration: </b><span style={{ color: '#09b0e7' }}>&nbsp; 100 min</span><br />
                    </div>
                    {
                        detail && detail.images.map((item, index) => (
                            <Card className='moviecard moviecardd movieCoverOverlap' style={{ width: '18rem', border: 'none' }}>
                                <Card.Img className='cardimg cardimgg' variant="top" src={import.meta.env.VITE_IMAGE_URL + "/movies/" + item} />
                            </Card>
                        ))
                    }

                </div>
            </div>

            <div>
            <Button className="reviewButton" onClick={handleOpenReviewArea} variant="outline-warning">Write a Review</Button>
                {/* <h5 className='ms-5' style={{ color: 'white' }}>Wite a review :</h5> */}
                {openReviewArea ? <form className="reviewWritingArea" onSubmit={handleSubmit}>
                    <textarea style={{width:'200px'}} value={sentimentText} onChange={e => setSentimentText(e.target.value)} />
                    <Button disabled={loading} variant="success" className="text-white ms-3" size="sm" type="submit">
                        {loading ? 'Analyzing...' : 'Submit'} &nbsp; <i class="fa-solid fa-angles-right fa-beat-fade"></i>
                    </Button>
                </form> : <p></p> }
                

            </div>

            <div>
                <Row style={{ width: '1100px' }}>

                    <Col lg={5} className='ms-5 mt-3 textcolourr'>

                        <h4 className="positive">Total positive reviews: ({positiveReviews}) </h4>
                        <DropdownButton align={"end"} menuVariant='dark' variant='success' id="dropdown-basic-button" title="Positive Reviews">
                        {
                                sentiments && sentiments.filter(sentiment => sentiment.sentiment === 'positive').map((sentiment, index) => (
                                    <Dropdown.Item style={{ marginBottom: '20px' }} key={index} ><i class="fa-solid fa-circle-user fa-2xl"></i> &nbsp; <b>{sentiment.username}</b><br />&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; {sentiment.text}</Dropdown.Item>
                                ))
                            }
                           
                        </DropdownButton>

                    </Col>

                    <Col lg={5} className='ms-5 mt-4 textcolourr'>

                        <h4 className="negative">Total negative reviews: ({negativeReviews})</h4>

                        <DropdownButton menuVariant='dark' variant='danger' id="dropdown-basic-button" title="Negative Reviews">
                        {
                                sentiments && sentiments.filter(sentiment => sentiment.sentiment === 'negative').map((sentiment, index) => (
                                    <Dropdown.Item style={{ marginBottom: '20px' }} key={index} ><i class="fa-solid fa-circle-user fa-2xl"></i> &nbsp; <b>{sentiment.username}</b><br />&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; {sentiment.text}   </Dropdown.Item>
                                ))
                            }
                          
                        </DropdownButton>

                    </Col>

                </Row>

            </div>


        </div>

 
    </>)
}

export default MovieDetail