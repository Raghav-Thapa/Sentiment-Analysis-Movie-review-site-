import MovieCreateForm from "./movie-create.page";
import MovieEditForm from "./movie-edit.page";
import MovieService from "./movie.service";
import MovieListPage from "./movie-list.page";

const movieSvc= new MovieService()
export default {
    MovieCreateForm,
    movieSvc,
    MovieListPage,
    MovieEditForm,
}