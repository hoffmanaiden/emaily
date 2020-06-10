const keys = require('../config/keys')
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require('../middleware/requireLogin');

module.exports = (app) => {
  app.post('/api/stripe', requireLogin, async (req, res) => {
    // this charge is a 'successful' response from stripe
    // indicating we can give the user credits
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 for 5 credits',
      source: req.body.id
    });
    // we have access to req.user (user model)
    // because of passport in index.js
    req.user.credits += 5;
    const user = await req.user.save();
    res.send(user);
  })
}