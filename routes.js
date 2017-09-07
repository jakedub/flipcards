const express = require('express');
const router = express.Router();
const models = require("./models");


//Register Render Page
router.get("/register", function(req,res){
  res.render("register");
})

//Register but only create. Should be storing the password in bcrypt. Bcrypt not working.
router.post('/register', function(req,res){
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

//Login page
router.get('/login', function(req, res){
  res.render('login')
});

router.post('/login', function(req, res){
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

//Logging out and redirect to Login Page
router.get('/logout', function(req, res){
  req.session.destroy(function(err){})
  res.redirect('/login');
  console.log(req.session);
});

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


//API STUFF

//Get all cards
router.route('/card')
.get(function(req, res){
  models.Card.findAll().then(function(err, card){
    if (err){
      res.send(err);
    } else{
      res.json({card: card_id});
    }

  })
})

//Get all decks
router.route('/decks')
.get(function(req, res){
  models.Deck.findAll().then(function(err, decks){
    if (err){
      res.send(err);
    } else{
      res.json({decks: decks_id});
    }

  })
})

//Create a decks
router.route('/activities')
.post(function(req, res){
  let newDeck = {
    name: req.body.name,
    // performance: req.body.performance,
    // date: req.body.date
  }
  models.Deck.create(newDeck).then(function(err, deck){
    if (err){
      res.send(err);
    } else {
      res.json({deck});
    }
  })
})

//Create a flipcard
router.route('/card')
.post(function(req, res){
  let newCard = {
    // name: req.body.name,
    // performance: req.body.performance,
    // date: req.body.date
  }
  models.Card.create(newCard).then(function(err, card){
    if (err){
      res.send(err);
    } else {
      res.json({card});
    }
  })
})

//Edit Card
router.route('/card/:id')
.put(function(req, res){
  models.Card.update({
    // name: req.body.name
  }, {
    where: {
      // id: req.params.id
    }
  }).then(function(update){
    res.json({message:'Updated Card'});
  })
})


//Delete Cards
router.route('/card/:id')
.delete(function(req, res){
  models.Card.destroy({
    where: {
      id: req.params.id,
    }}, {
      // name: req.body.name,
      // performance: req.body.performance,
      // date: req.body.date,
      // id: req.body.id
    },
  ).then(function(removed){
    res.json({message: 'Deleted card'});
  })
})

// router.get('/hello',
//     passport.authenticate('basic', {session: false}),
//     function (req, res) {
//         res.json({"hello": req.user})
//     }
// );

router.use('/api', router);

module.exports = router;
