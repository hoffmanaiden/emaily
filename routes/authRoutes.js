const passport = require('passport');

module.exports = (app) => {
  // log in user
  app.get('/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  // login callback
  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/home');
    }
  );

  // logout
  app.get('/api/logout',
    (req, res) => {
      req.logout();
      res.redirect('/');
    } 
  )

  // currently logged in
  app.get('/api/current_user',
    (req, res) => {
      res.send(req.user);
    }
  )
}
