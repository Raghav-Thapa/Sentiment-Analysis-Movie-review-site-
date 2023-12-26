import React, { useState, useEffect } from 'react';
import SentimentAnalysis from './SentimentAnalysis';
import ShowSentiment from './showSentiments';
import { Container, Row, Image, Col,Card } from "react-bootstrap";

const SentimentList = () => {
  const [positiveSentiments, setPositiveSentiments] = useState([]);
  const [negativeSentiments, setNegativeSentiments] = useState([]);
  const [positiveCount, setPositiveCount] = useState(0); // Initialize counts to 0
  const [negativeCount, setNegativeCount] = useState(0);

  useEffect(() => {
    async function fetchSentiments() {
      try {
        const response = await fetch('http://localhost:5000/sentiments');
        if (response.ok) {
          const data = await response.json();
          setPositiveSentiments(data.positiveSentiments);
          setNegativeSentiments(data.negativeSentiments);
          setPositiveCount(data.positiveSentiments.length); // Update counts from fetched data
          setNegativeCount(data.negativeSentiments.length);
        } else {
          console.error('Error fetching sentiments:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching sentiments:', error);
      }
    }

    fetchSentiments();
  }, []);

  const updateSentimentCounts = (sentimentType) => {
    if (sentimentType === 'Positive') {
      setPositiveCount(positiveCount + 1);
    } else if (sentimentType === 'Negative') {
      setNegativeCount(negativeCount + 1);
    }
  };



  return (
    
      <Row style={{width:'1100px'}}>

        <Col lg = {5} className='ms-5 mt-3 textcolourr'>
        
      <h4>Total positive reviews: ({positiveCount})</h4>
      <h5 style={{color:"green",marginTop:'40px'}}>Positive Reviews :</h5><br/>
      <ul style={{listStyle:'none'}}>
        {positiveSentiments.map((sentiment) => (
          <li style={{marginBottom:'20px'}} key={sentiment._id}><i class="fa-solid fa-circle-user fa-2xl"></i> &nbsp; <b>User name</b><br/>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; {sentiment.text}</li>
        ))}
        
      </ul>
     
        </Col>

        <Col lg={5} className='ms-5 mt-4 textcolourr'>
        
      <h4>Total negative reviews: ({negativeCount})</h4>
      <h5 style={{color:"red",marginTop:'40px'}}>Negative Reviews : </h5><br/>
      <ul style={{listStyle:'none'}}>
        {negativeSentiments.map((sentiment) => (
          <li style={{marginBottom:'20px'}} key={sentiment._id}><i class="fa-solid fa-circle-user fa-2xl"></i> &nbsp; <b> User name </b><br/>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; {sentiment.text}</li>
        ))}

     
      </ul>
       {/* Add SentimentAnalysis component and pass the update function */}
       {/* <SentimentAnalysis onSentimentAnalysis={updateSentimentCounts} /> */}
       {/* <showSentiment/> */}
       {/* <ShowSentiment/> */}
      
        </Col>

      </Row>
    

  
  );
}

export default SentimentList;
