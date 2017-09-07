const path = require('path');
const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express');
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const routes = require("./routes");
const models = require('./models');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const bcrypt = require('bcryptjs');
// const hash = bcrypt.hashSync(password, 8);

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');
app.use("/css", express.static("./public"));

app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator());

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.use(routes);

passport.use(new BasicStrategy(
  function(username, password, done) {
      const userPassword = users[username];
      if (!userPassword) { return done(null, false); }
      if (userPassword !== password) { return done(null, false); }
      return done(null, username);
  }
));

//Controllers
const addController = require('./controllers/add');
const deleteController = require('./controllers/delete');
const editController = require('./controllers/edit');
const registerController = require('.controllers/register');
const loginController = require('./controllers/login');
const homeController = require('./controllers/home');
app.use('/add', addController);
app.use('/delete', deleteController);
app.use('/edit', editController);
app.use('/register', registerController);
app.use('/login', loginController);
app.use('/home', homeController);

//Logging Out
app.get('/logout', function(req, res){
  req.session.destroy(function(err){})
  res.redirect('/login');
  console.log(req.session);
});

app.listen(3000, function(){
  console.log("Flip those cards!");
})
