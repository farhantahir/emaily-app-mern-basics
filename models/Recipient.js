const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const {Schema} = mongoose;

const RecipientSchema = new Schema({
  email: String,
  responded: {
    type: Boolean,
    default: false,
  },
});


module.exports = RecipientSchema;
