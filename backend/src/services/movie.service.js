const MovieModel = require("../models/movie.model");
const Joi = require("joi");

class MovieService {
    movieValidate = async (data) => {
        try {
            let schema = Joi.object({
                name: Joi.string().min(3).required(),
                categories: Joi.string(),
                detail: Joi.string(),
                duration: Joi.string(),
                releaseYear: Joi.string(),
                isFeatured: Joi.bool(),
                images: Joi.array().items(Joi.string()),
                status: Joi.string().valid("active",'inactive').default("inactive")
            })
            let response = schema.validate(data);
            if(response.error) {
                let msg = response.error.details[0].message;
                throw {status: 400, msg: msg}
            }
            return response.value;
        } catch(exception) {
            console.log(exception)
            throw exception
        }
    }

    getAllMovies = async ({perPage= 10, currentPage=1}) => {
        try {
            let skip = (currentPage-1) * perPage;
            
            let data = await MovieModel.find()
                .populate("categories")
                .sort({_id: -1})
                .skip(skip)
                .limit(perPage)
            return data;
        } catch(exception) {
            console.log(exception)
            throw {status: 500, msg: "Query execution failed."}
        }
    }

    getAllCount = async (filter={}) => {
        return await MovieModel.countDocuments(filter);
    }

    createMovie = async(data) => {
        try {
            let movie = new MovieModel(data);
            return await movie.save()
        } catch(exception) {
            console.log(exception)
            throw {
                status: 500, msg: "DB Query failed"
            }
        }
    }

    updateMovie = async (data, id) => {
        try {
            let response = await MovieModel.findByIdAndUpdate(id, {$set: data})
            return response
        } catch(except){
            throw except
        }
    }

    getMovieById = async(id) => {
        try {
            let movie = await MovieModel.findById(id)
                .populate("categories")
            if(movie) {
                return movie
            } else {
                throw {status: 404, msg: "Movie does not exists"}
            }
        } catch(err) {
            console.log(err)
            throw err
        }
    }
    

    deleteMovieById = async(id) => {
        try{
            let delResponse = await MovieModel.findByIdAndDelete(id)
            if(delResponse){
                return delResponse
            } else {
                throw {status: 404, msg: "Movie has been already deleted or does not exists"}
            }
        } catch(except) {
            throw except
        }
    }

    getMovieByFilter = async(filter, paging) =>  {
        try {
            let skip = (paging.currentPage-1) * paging.perPage;
            let response = await MovieModel.find(filter)
                .populate("categories")
                    .sort({_id: -1})
                    .skip(skip)
                    .limit(paging.perPage)
            return response;
        } catch(exception) {
            throw exception
        }
    }
}

module.exports = MovieService;