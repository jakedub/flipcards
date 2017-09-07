const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

//Delete TODO needs to specify for decks/flipcards. Looking at Deck at the moment
router.post("/home/:id/delete", function (req, res) {
  models.Deck.findById(req.params.id).then(function(deck){
    deck.destroy().then(function () {
        res.redirect("/");
      })
    });
});


router.post("/home/:id/delete", function (req, res) {
  models.Card.findById(req.params.id).then(function(card){
    card.destroy().then(function () {
        res.redirect("/");
      })
    });
});

module.exports = router;
