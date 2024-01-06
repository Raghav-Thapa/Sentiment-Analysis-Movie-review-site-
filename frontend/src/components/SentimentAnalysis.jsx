import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import spiderbanner from "../assets/images/spiderbanner.jpg"
import SentimentList from './SentimentList';
import Card from 'react-bootstrap/Card';
import movieimg from "../assets/images/spiderman.jpg"
import "../assets/css/reviewpage.css"

function SentimentAnalysis({ onSentimentAnalysis }) {
  const [text, setText] = useState('');
  const [sentiment, setSentiment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const analyzeSentiment = async (sentimentType) => {
    try {
      setLoading(true);

      const response = await fetch('http://localhost:5000/api/sentiment/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (response.ok) {
        const data = await response.json();
        setSentiment(data.sentiment);
        setText(''); // Clear the text area after analysis
        onSentimentAnalysis(sentimentType);
      } else {
        console.error('Error analyzing sentiment:', response.statusText);
      }
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='backgroundd'>

    <div>

    <Carousel>
    <Carousel.Item>
      <img className='bannerimg bannerheight' src={spiderbanner} alt="" />
    </Carousel.Item>
  </Carousel>
    <div>
      <div className="moviedetail">
      <h2 className='moviename'>
        <span className='first-word'>Movie </span> &nbsp;
        <span className='second-word'>Name</span>
      </h2>
      <button className='mt-2 mb-2' style={{borderRadius:"7px", border:"4px solid #09b0e7"}}><i class="fa-solid fa-video"></i>&nbsp; Trailer</button>
      <p style={{color:'whitesmoke'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, error iusto. Ipsa ea aspernatur impedit iusto magni labore veritatis recusandae blanditiis, nulla a magnam explicabo, amet maxime mollitia assumenda quos. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque sequi sed placeat laborum nesciunt consequuntur incidunt repudiandae tenetur, perspiciatis laudantium, sint praesentium porro, modi reiciendis similique nisi quos quis. Laboriosam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, unde, ut non natus illo, perspiciatis pariatur odit laudantium asperiores in mollitia dicta fuga fugiat iure laborum at molestias! Placeat, molestiae.</p>
      <b style={{color:'whitesmoke'}}>Genre: </b><span style={{color:'#09b0e7'}}>&nbsp; Comedy, Drama, Romance</span><br/>
      <b style={{color:'whitesmoke'}}>Country: </b><span style={{color:'#09b0e7'}}>&nbsp; United States, United Kingdom</span><br/>
      <b style={{color:'whitesmoke'}}>Duration: </b><span style={{color:'#09b0e7'}}>&nbsp; 100 min</span><br/>
      </div>
    
  <Card className='moviecard moviecardd movieCoverOverlap' style={{ width: '18rem' ,border:'none' }}>
      <Card.Img className='cardimg cardimgg' variant="top" src={movieimg} />
      <Card.Body>
        {/* <Button variant="primary">Go somewhere</Button> */}
      </Card.Body>
    </Card>
    </div>

  </div>

    <div>
      <h5 className='ms-5' style={{color:'white'}}>Wite a review :</h5>
      <textarea className='ms-5'
        placeholder="Enter text for sentiment analysis"
        value={text}
        onChange={handleTextChange}
      />
      <button className='ms-3' onClick={analyzeSentiment} disabled={loading}>
        {loading ? 'Analyzing...' : 'Analyze'}
      </button>
      {sentiment && (
        <div className='ms-5 textcolourr'>
          <h3>Analysis Results</h3>
          <p>Sentiment: {sentiment}</p>
        </div>
      )}
    </div>

        <div>
          <SentimentList/>
        </div>


    </div>

    
  );
}

export default SentimentAnalysis;
