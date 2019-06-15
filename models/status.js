const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const statusSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Status Name is Required']
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: [true, 'UserId is Required']
  }
});

const Status = mongoose.model('status', statusSchema);
module.exports = Status;
