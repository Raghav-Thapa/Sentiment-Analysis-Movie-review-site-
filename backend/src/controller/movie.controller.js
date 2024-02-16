const MovieService = require("../services/movie.service");
const slugify = require("slugify")

class MovieController {
  _svc;
  constructor() {
    this._svc = new MovieService();
  }

  listAllMovies = async (req, res, next) => {
    try {
      let paging = {
        totalNoOfRows: await this._svc.getAllCount(),
        perPage: req.query.perPage ? Number(req.query.perPage) : 10,
        currentPage: req.query.page ? Number(req.query.page) : 1,
      };

      let data = await this._svc.getAllMovies(paging);
      res.json({
        result: data,
        status: true,
        msg: "Movie Data fetched",
        meta: paging,
      });
    } catch (exception) {
      next(exception);
    }
  };

  storeMovie = async (req, res, next) => {
    try {
      let data = req.body;
      if (req.files) {
        data.images = req.files.map((item) => {
          return item.filename;
        });
      }
      console.log(data)
      

      let validated = await this._svc.movieValidate(data);
      validated.slug = slugify(validated.name, { lower: true });

      if (validated.categories === "null") {
        validated.categories = null;
      } else {
        validated.categories = validated.categories.split(",");
      }

      let response = await this._svc.createMovie(validated);
      res.json({
        result: response,
        msg: "Movie Created successfully",
        status: true,
        meta: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  updateMovie = async (req, res, next) => {
    try {
      let data = req.body;
      let movie = await this._svc.getMovieById(req.params.id);
      let images = [];
      if (req.files) {
        images = req.files.map((item) => {
          return item.filename;
        });
      }

      data.images = [...movie.images, ...images];

      let validated = await this._svc.movieValidate(data);

      if (validated.categories === "null") {
        validated.categories = null;
      } else {
        validated.categories = validated.categories.split(",");
      }


      let response = await this._svc.updateMovie(validated, req.params.id);
      res.json({
        result: response,
        msg: "Movie Updated successfully",
        status: true,
        meta: null,
      });
    } catch (exception) {
      next(exception);
    }
  };
  
  getMovieById = async (req, res, next) => {
    try {
      let movie = await this._svc.getMovieById(req.params.id)

      res.json({
        result: movie,
        msg: "Movie fetched successfully",
        status: true,
        meta: null
      })
    } catch (except) {
      next(except)
    }
  }

  getMovieBySlug = async (req, res, next) => {
    try {
      let movie = await this._svc.getMovieByFilter(
        {
          slug: req.params.slug,
        },
        {
          perPage: 1,
          currentPage: 1,
        }
      );

      res.json({
        result: movie[0],
        msg: "Movie fetched successfully",
        status: true,
        meta: null,
      });
    } catch (except) {
      next(except);
    }
  };

  deleteMovie = async (req, res, next) => {
    try {
      let movie = await this._svc.getMovieById(req.params.id)
      let del = await this._svc.deleteMovieById(req.params.id);
      res.json({
        result: del,
        msg: "Movie deleted successfully",
        status: true,
        meta: null
      })
    } catch (except) {
      next(except)
    }
  }

  getMovieForHomePage = async (req, res, next) => {
    try {
      let filter = {
        status: "active",
      }
      let paging = {
        totalNoOfRows: await this._svc.getAllCount(filter),
        perPage: req.query.perPage ? Number(req.query.perPage) : 100,
        currentPage: req.query.page ? Number(req.query.page) : 1
      }

      let data = await this._svc.getMovieByFilter(filter, paging);
      res.json({
        result: data,
        msg: "Movie Data",
        status: true,
        meta: paging
      })
    } catch (except) {
      next(except)
    }
  }
}

const movieCtrl = new MovieController();
module.exports = movieCtrl