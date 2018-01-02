const passport = require('passport');

module.exports = (app, prefix='api') => {
  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

  app.get('/auth/google/callback',
        passport.authenticate('google'),
        (req, res) => {
          res.redirect('/surveys');
        }
 );

  app.get(`/api/logout`, (req, res)=> {
    req.logout();
    res.redirect('/');
  });
};
