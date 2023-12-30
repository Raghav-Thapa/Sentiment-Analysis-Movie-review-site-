const router = require('express').Router()
const  movieCtrl  = require('../controller/movie.controller')
const authCheck = require("../middleware/auth.middleware")
const { checkPermission } = require('../middleware/permission.middleware')
const uploader = require('../middleware/uploader.middleware')

const uploadPath = (req,res,next) =>{
    req.uploadPath = "./public/movies/";
    next()
}

router.get("/:slug/detail", movieCtrl.getMovieBySlug);

router.route("/")
    .get(authCheck, checkPermission(['admin', 'seller']), movieCtrl.listAllMovies)
    .post(authCheck, checkPermission(['admin', 'seller']), uploadPath, uploader.array('images'),movieCtrl.storeMovie)

router.route("/:id")
    .put(authCheck, checkPermission(['admin', 'seller']), uploadPath, uploader.single('image'),movieCtrl.updateMovie)
    .get(authCheck, checkPermission(['admin', 'seller']), movieCtrl.getMovieById)
    .delete(authCheck, checkPermission(['admin', 'seller']),movieCtrl.deleteMovie)

router.get('/list/home', movieCtrl.getMovieForHomePage)

module.exports = router;