const router = require('express').Router();
const jwtDecode = require('jwt-decode');
const { Trip } = require('../../models/trip');

router.get('/:id', (req, res) => {
  const {
    params: { id }
  } = req;
  Trip.findById({ _id: id }, (err, trip) => {
    if (err) {
      console.log(err);
    }
    res.json(trip);
  });
});
router.post('/', (req, res) => {
  const trip = req.body;
  Trip.create(trip, err => {
    if (err) {
      res.json({ message: 'An error has occured while creating trip.' });
    }
    res.json({ message: 'Successfully created trip' });
  });
});

router.delete('/:id', (req, res) => {
  const {
    params: { id }
  } = req;
  Trip.deleteOne({ _id: id }, err => {
    if (err) {
      res.status(400).send(`An error has occurred`);
    }
    res.json({ message: 'Successfully deleted a trip' });
  });
});

router.get('/', (req, res) => {
  const { _id } = jwtDecode(req.headers.authorization);
  Trip.find({ UserID: _id }, (err, trips) => {
    const list = trips.map(trip => ({ id: trip._id, title: trip.title }));
    res.json(list);
  });
});

router.put('/', async (req, res) => {
  const updatedTrip = req.body;
  const result = await Trip.replaceOne({ _id: updatedTrip._id }, updatedTrip);
  if (result.n === 0) {
    res.json({ message: 'Could not find trip' });
  } else {
    res.json({ message: 'Successfully updated trip' });
  }
});
module.exports = router;
