const mongoose = require('mongoose');
const RecipientSchema = require('./Recipient');
mongoose.Promise = global.Promise;
const {Schema} = mongoose;

const surveySchema = new Schema({
  title: String,
  subject: String,
  email:String,
  body:String,
  recipients: [RecipientSchema],
  yes:{
    type: Number,
    default: 0
  },
  no:{
    type: Number,
    default: 0
  },
  _user: {
    type:Schema.Types.ObjectId,
    ref: 'User'
  },
  dateSent: Date,
  lastResponded: Date,
});


module.exports = mongoose.model('Survey', surveySchema);
