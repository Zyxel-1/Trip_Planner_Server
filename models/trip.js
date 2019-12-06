const mongoose = require('mongoose');

const { Schema } = mongoose;

const TripSchema = new Schema({
  title: String,
  Destination: String,
  Description: String,
  StartDate: Date,
  EndDate: Date,
  TodoItem: [
    {
      Title: String,
      DoneStatus: Boolean
    }
  ]
});
const Trip = mongoose.model('Trip', TripSchema);

module.exports = { Trip };
