const router = require('express').Router();
const { Trip } = require('../../models/trip');

router.get('/:id', (req, res) => {
  const {
    params: { id }
  } = req;
  Trip.findById({ id }, (err, trip) => {
    console.log('found one');
    res.json({ message: 'You got an id from a trip', trip });
  });
});
router.post('/', (req, res) => {
  const trip = req.body;
  Trip.create(trip, err => {
    if (err) {
      res.json({ message: 'An error has occured while creating trip.' });
    }
    res.json({ message: 'Created trip.' });
  });
});

router.delete('/:id', (req, res) => {
  const trip = req.body;

  res.json({ message: 'you deleted a trip' });
});

router.get('/', (req, res) => {
  res.json({ message: 'you got  all trips' });
});

router.put('/:id', () => {
  res.json({ message: 'you edited a trip' });
});
module.exports = router;
