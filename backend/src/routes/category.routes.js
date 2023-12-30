const router = require('express').Router()
const categoryCtrl  = require('../controller/category.controller')
const authCheck = require("../middleware/auth.middleware")
const { checkPermission } = require('../middleware/permission.middleware')
const uploader = require('../middleware/uploader.middleware')

const uploadPath = (req,res,next) =>{
    req.uploadPath = "./public/categorys/";
    next()
}

router.get("/:slug/detail",categoryCtrl.getDetailOfCategory)

router.route("/")
    .get(authCheck, checkPermission('admin'), categoryCtrl.listAllCategorys)
    .post(authCheck, checkPermission('admin'), uploadPath, uploader.single('image'),categoryCtrl.storeCategory)

router.route("/:id")
    .put(authCheck, checkPermission('admin'), uploadPath, uploader.single('image'),categoryCtrl.updateCategory)
    .delete(authCheck, checkPermission('admin'),categoryCtrl.deleteCategory)
    .get(authCheck, checkPermission("admin"), categoryCtrl.getCategoryById)

router.get('/list/home', categoryCtrl.getCategoryForHomePage)

module.exports = router;