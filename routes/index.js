var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/', function(req, res){
  res.render('index',{
    pretty: true
  });
});


router.get("/api/name", function(req,res){
  res.json({
    name: 'YEP'
  });
});

router.get("/view1", function(req,res){
  res.render('partials/partial1',{
    pretty: true
  });
});

router.get("/view2", function(req,res){
  res.render('partials/partial2',{
    pretty: true
  });
});

router.get("/cc", function(req,res){
  res.render('partials/contentcontrol',{
    pretty: true
  });
});

router.get("/admin", function(req,res){
  res.render('partials/admincontrol',{
    pretty: true
  });
});

module.exports = router;
