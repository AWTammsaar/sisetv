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

router.get('/app/:page', function (req, res, next) {
  res.render('index', {title: req.page});
});


router.get("/api/name", function(req,res){
  res.json({
    name: 'YEP'
  });
});

router.get("/partials/view1", function(req,res){
  res.render('partials/partial1',{
    pretty: true
  });
});

router.get("/partials/view2", function(req,res){
  res.render('partials/partial2',{
    pretty: true
  });
});

router.get("/partials/cc", function(req,res){
  res.render('partials/contentcontrol',{
    pretty: true
  });
});

router.get("/partials/admin", function(req,res){
  res.render('partials/admincontrol',{
    pretty: true
  });
});

module.exports = router;
