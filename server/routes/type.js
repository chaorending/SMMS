let express = require('express');
let router = express.Router();
let TypeDal=require('../db/typedal')
let typedal=new TypeDal()

router.get('/:id', function (req, res, next) {
    typedal.queryTypeById(req, res);
})
router.post('/typeList', function (req, res, next) {
    typedal.queryTypeList(req, res);
})
router.post('/insert', function (req, res, next) {
    typedal.insertType(req, res);
})

router.post('/update', function (req, res, next) {
    typedal.updateType(req, res);
})

router.post('/delete',function(req,res,nex){
    typedal.deleteType(req,res)
})

module.exports=router
