const express = require('express');  //express for node to streamline routing
const mongoose = require('mongoose'); //mongoose to interact with MongoDB database
const cookieSession = require('cookie-session'); //enable express to work with cookies
const passport = require('passport');
const keys = require('./config/keys'); //hidden keys file
require('./models/User'); //mongoose schema for 'users' collection
require('./services/passport'); //google oauth processes

//mongoose.connect('mongodb://localhost/User');
mongoose.connect(keys.mongoURI); //connect to mlab mongodb database

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //cookie lasts for 30 days(in milliseconds)
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authroutes')(app); //handle routs to google oauth

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("server running on port 5000");
});