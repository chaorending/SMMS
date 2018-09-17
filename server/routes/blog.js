var express = require('express');
var router = express.Router();
let Blogdal = require('../db/blogdal')
let blogdal = new Blogdal()
var multer = require('multer');
var storage = multer.diskStorage({
    //设置上传后文件路径，uploads文件夹会自动创建。
    destination: function (req, file, cb) {
        cb(null, 'upload/')
    },
    //给上传文件重命名，获取添加后缀名
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
});

var upload = multer({
    storage: storage
});

router.get('/blogList', function (req, res, next) {
    blogdal.queryBlogList(req, res);
})

router.get('/:id', function (req, res, next) {
    blogdal.queryBlogById(req, res);
})

router.post('/insert', function (req, res, next) {
    blogdal.insertBlog(req, res);
})

router.post('/update', function (req, res, next) {
    blogdal.updateBlog(req, res);
})

router.post('/upload', upload.single('file'), function (req, res, next) {
    console.log("123");
    res.send({
        path: req.file.path
    });
});


module.exports = router;