const router = require('express').Router();
const passport = require('passport');

router.get('/', function(req, res) {
  res.json({ message: 'Express is up!' });
});
// Collection of private routes
router.use(
  '/api/trip',
  passport.authenticate('jwt', { session: false }),
  require('./private/Trips')
);
// collection of public routes
router.use('/api/user', require('./public/Accounts'));

module.exports = router;
