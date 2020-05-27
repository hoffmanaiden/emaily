const passport = require('passport');


module.exports = (app) => {
  // log in user
  app.get('/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  // login callback
  app.get('/auth/google/callback',
    passport.authenticate('google')
  );

  // logout
  app.get('/api/logout',
    (req, res) => {
      req.logout();
      res.send(req.user);
    } 
  )

  // currently logged in
  app.get('/api/current_user',
    (req, res) => {
      res.send(req.user);
    }
  )
}
