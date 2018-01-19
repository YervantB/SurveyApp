const passport = require('passport');

module.exports = app => {
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

    app.get('/auth/google/callback', passport.authenticate('google'));

    app.get('/api/logout', (req,res) => {
        req.logout(); //passport automatically kills the cookie which keeps you signed in
        res.send(req.user);
    });

    app.get('/api/current_user', (req,res) => {
        res.send(req.user);
    })
};