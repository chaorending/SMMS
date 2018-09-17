var express = require('express');
var router = express.Router();
let Userdal=require('../db/userdal')
let userdal=new Userdal()

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login',function(req,res,next){
  userdal.login(req,res);
})
module.exports = router;
