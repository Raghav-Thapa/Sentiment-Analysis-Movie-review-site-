import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import spiderbanner from "../assets/images/spiderbanner.jpg"
import SentimentList from './SentimentList';

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

      const response = await fetch('http://localhost:5000/predict', {
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
    <Carousel>
    <Carousel.Item>
      <img className='bannerimg' src={spiderbanner} alt="" />
    </Carousel.Item>
  </Carousel>
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
