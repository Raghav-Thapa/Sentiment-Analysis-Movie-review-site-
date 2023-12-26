import React, { useState, useEffect } from 'react';
import SentimentAnalysis from './SentimentAnalysis';
import { Outlet, NavLink  } from "react-router-dom"
import SentimentList from './SentimentList';


function ShowSentiment() {

  return (
    <div>
       
        <a href={SentimentList}> <button>Show Sentiment</button></a>
    </div>
  );
}

export default ShowSentiment;
