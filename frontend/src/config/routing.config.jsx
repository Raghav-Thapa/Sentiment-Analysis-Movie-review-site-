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
import Category from "../admin/category";
import CategoryDetail from "../pages/category.page";
import MovieDetail from "../pages/movie.page";
import AllMoviesList from "../homepage/allmovieslist.component";


const Routing = () => {
    return (<>
            <ToastContainer/>
            <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePageLayout/>}>
                    <Route index element={<HomePage />} />
                    <Route path="review" element={<MovieReview/>}></Route>
                    
                    <Route path="category/:slug" element={<CategoryDetail/>} />
                    <Route path="movies" element={<AllMoviesList/>} />
                    <Route path="movie/:slug" element={<MovieDetail/>} />
                </Route>

                <Route path="/admin" element={<AdminLayout/>}>
                    <Route index element={<>Dashboard</>} />

                    <Route path="category" element={<><Outlet /></>} >
                        <Route index element={<Category.CategoryListPage/>} />
                        <Route path="create" element={<Category.CategoryCreateForm />} />
                        <Route path=":id" element={<Category.CategoryEditForm />} />
                    </Route>

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