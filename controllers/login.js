const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.get('/', function(req, res){
  res.render('login')
});

router.post('/', function(req, res){
  let username = req.body.username;
  let password = req.body.password;
  models.User.findOne({
    where: {
      username: username,
      password: password
    }
  }).then(function(user){
    if (user.password === password){
      req.session.password = password;
      req.session.userId = user.id;
      res.redirect('/home');
    } else {
      res.redirect('/register');
    }
  })
})



module.exports = router;
