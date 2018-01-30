var express = require('express');
var router = express.Router();
var UserModel = require('../model/User');
var md5 = require('md5');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/api/register', function(req, res, next) {
  var username = req.body.username;
  var pwd = req.body.pwd;
  var result = {
    code: 1,
    message: "注册成功"
  };
  UserModel.find({username:username},function(err,docs){
    if(docs.length > 0){
      result.code = -109;
      result.message = "此用户名已被注册";
      res.json(result);
      return;
    }
    var um = new UserModel();
    um.username = username;
    um.pwd = md5(pwd);
    um.save(function(err){
      if(err){
        result.code = -100;
        result.message = "注册失败";
        res.send("注册失败");
      }
      res.json(result);
    })
  })
});

router.post('/api/login', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
