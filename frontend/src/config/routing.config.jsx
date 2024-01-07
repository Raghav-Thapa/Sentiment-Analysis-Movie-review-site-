import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../homepage"
import HomePageLayout from "../homepage/home.layout"
import SentimentAnalysis from "../components/SentimentAnalysis";
import MovieReview from "../components/moviereview.page";
import RegisterPage from "../auth/register.page";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"


const Routing = () => {
    return (<>
            <ToastContainer/>
            <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePageLayout/>}>
                    <Route index element={<HomePage />} />

                    <Route path="review" element={<MovieReview/>}></Route>

                </Route>

                <Route path="/register" element={<RegisterPage/>} />

                
            </Routes>
           
            </BrowserRouter>
    </>)
}

export default Routing