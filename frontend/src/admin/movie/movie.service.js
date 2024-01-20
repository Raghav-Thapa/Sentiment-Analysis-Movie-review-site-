import HttpService from "../../services/http.service"

class MovieService extends HttpService {
    
    createMovie =async (data) => {
        try {
            let response = await this.postRequest('/movie', data, {auth: true, file: true})
            return response
        } catch(exception){
            throw exception
        }
    }
    listHomeMovies = async (perpage =10, page=1) => {
        try {
            let response = await this.getRequest("/movie/list/home?perPage="+perpage+"&page="+page, {auth:true});
            return response;
        } catch(exception){
            throw exception;
        }
    }
    listAllMovies = async (perpage =10, page=1) => {
        try {
            let response = await this.getRequest("/movie?perPage="+perpage+"&page="+page, {auth:true});
            return response;
        } catch(exception){
            throw exception;
        }
    }
    deleteMovieById = async(id) => {
        try{
            let response = await this.deleteRequest("/movie/"+id, {auth: true});
            return response;
        } catch(exception) {
            throw exception
        }
    }
    getMovieById = async(id) => {
        try{
            let response = await this.getRequest("/movie/"+id, {auth: true});
            return response;
        } catch(exception) {
            throw exception
        }
    }
    getMovieBySlug = async(slug) => {
        try{
            let response = await this.getRequest("/movie/"+slug+"/detail");
            return response;
        } catch(exception) {
            throw exception
        }
    }
    updateMovie = async(data, id) => {
        try{
            let response = await this.putRequest("/movie/"+id, data, {auth: true, file: true});
            return response;
        } catch(exception) {
            throw exception
        }
    }
}
export default MovieService