const mongoose = require('mongoose');

const { Schema } = mongoose;

const TripSchema = new Schema({
  title: String,
  destination: String,
  description: String,
  startDate: Date,
  endDate: Date,
  userID: String,
  category: String,
  setReminder: Boolean,
  todoItem: [
    {
      title: String,
      doneStatus: Boolean
    }
  ]
});
const Trip = mongoose.model('Trip', TripSchema);

module.exports = { Trip };
