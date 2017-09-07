const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

//Register but only create. Should be storing the password in bcrypt. Bcrypt not working.

router.get("/", function(req,res){
  res.render("register");
})

router.post('/', function(req,res){
  let newUser = {
    username: req.body.username,
    password: req.body.password
  }
  models.User.create(newUser).then(function(user){
    req.username = user.username;
    req.password = user.password;
    res.redirect('/login');
  })
});


module.exports = router;
