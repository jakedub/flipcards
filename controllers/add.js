const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

//New Card. Clunky and not right
router.get('/', function(req, res){
  res.render('/')
});

router.post('/', function(req, res){
  let newCard = {
    name: req.body.name,
    question: req.body.question
  }
  models.Card.create(newCard).then(function(card){
    res.redirect('/home'))
  })
});

module.exports = router;
