import React from 'react'
import ReactDOM from 'react-dom/client'
import Routing from './config/routing.config.jsx'
import "bootstrap/dist/css/bootstrap.min.css"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "bootstrap"
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import "./assets/css/header.css"
import "./assets/css/reviewpage.css"
// import "../src/assets/css/header.css"
// import "../src/assets/css/banner.css"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
      <Routing/>
  </React.StrictMode>,
)
