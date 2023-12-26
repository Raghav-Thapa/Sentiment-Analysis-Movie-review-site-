import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../homepage"
import HomePageLayout from "../homepage/home.layout"
import SentimentAnalysis from "../components/SentimentAnalysis";
import MovieReview from "../components/moviereview.page";


const Routing = () => {
    return (<>
            <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePageLayout/>}>
                    <Route index element={<HomePage />} />

                    <Route path="review" element={<MovieReview/>}></Route>

                </Route>

                
            </Routes>
            </BrowserRouter>
    </>)
}

export default Routing