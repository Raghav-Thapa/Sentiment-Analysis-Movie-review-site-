import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../homepage"
import HomePageLayout from "../homepage/home.layout"
import SentimentAnalysis from "../components/SentimentAnalysis";
import MovieReview from "../components/moviereview.page";
import RegisterPage from "../auth/register.page";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import AdminLayout from "../admin/admin.layout";
import Movie from "../admin/movie";
import { Outlet } from "react-router-dom";


const Routing = () => {
    return (<>
            <ToastContainer/>
            <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePageLayout/>}>
                    <Route index element={<HomePage />} />
                    <Route path="review" element={<MovieReview/>}></Route>
                </Route>

                <Route path="/admin" element={<AdminLayout/>}>
                    <Route index element={<>Dashboard</>} />

                    <Route path="movie" element={<><Outlet /></>} >
                        <Route index element={<Movie.MovieListPage/>} />
                        <Route path="create" element={<Movie.MovieCreateForm />} />
                        <Route path=":id" element={<Movie.MovieEditForm />} />
                    </Route>
                   
                </Route>

                <Route path="/register" element={<RegisterPage/>} />

                
            </Routes>
           
            </BrowserRouter>
    </>)
}

export default Routing