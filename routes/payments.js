const isAuthenticated = require('../middlewares/isAuthenticated');
const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

module.exports = (app,prefix="api") => {  
  app.post(`${prefix}/stripe`, isAuthenticated, async (req, res) => {
    const charge = await stripe.charges.create({
        amount: 500, // 5 dollars
        currency: 'usd',
        source: req.body.id,
        description: 'Emaily Test Billing for purchasing credits'
      });
      req.user.credits+=5;
      const user = await req.user.save();
      res.send(user);
  });
};
