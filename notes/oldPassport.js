const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => done(null,user));
});



passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy:true
}, (accessToken, refreshToken, profile, done) => {
    /** NOTE **/
    /* mongodb findOne is a query middleware, it iterates through the collection in the 
       database asyncronously.  It then catches the ?first? record/document which has a 
       property to match with the parameter object passed into findOne.  
       You .then() catch the record, which is just an object, and perform an operation with it.
    */
    User.findOne({googleID: profile.id}) //async(promise) to find user with matching googleID
        .then((existingUser) => { 
            if(existingUser) {
                //do not create a new record
                console.log('user with googleId-'+ existingUser.googleID + '- already exists');
                done(null, existingUser);
            }
            else{
                //create new record 
                new User({ 
                    googleID: profile.id,
                    last_name: profile.name.familyName,
                    first_name: profile.name.givenName,
                    member_since: new Date(Date.now())
                })
                .save(err => { 
                    if(err) return err; 
                })
                .then(user => done(null,user));

                console.log('new user created!');
            }
        })
        console.log("done:",done);
}));