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
}, async (accessToken, refreshToken, profile, done) => {

    const existingUser = await User.findOne({googleID: profile.id}) //async(promise) to find user with matching googleID
            
    if(existingUser) {
        //do not create a new record
        console.log('user with googleId-'+ existingUser.googleID + '- already exists');
        return done(null, existingUser);
    }
    //create new record 
    const user = await new User({ 
        googleID: profile.id,
        last_name: profile.name.familyName,
        first_name: profile.name.givenName,
        member_since: new Date(Date.now())
    }).save(err => { 
        if(err) return err; 
    })
    done(null,user);
    
    console.log("done:",done);
}));