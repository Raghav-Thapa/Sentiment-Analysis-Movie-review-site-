import HttpService from "../../services/http.service"

class SentimentService extends HttpService {

    getSentimentsByMovie = async (movieId) => {
        try {      
          let response = await this.getRequest("/sentiment/sentiments/movie/"+movieId);
          return response;
        } catch(exception){
            throw exception;
        }
      };
}
export default SentimentService