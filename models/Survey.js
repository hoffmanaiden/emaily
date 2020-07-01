const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [RecipientSchema],
  recipientListCount: Number,
  yes: {type: Number, default: 0},
  no: {type: Number, default: 0},
  _user: {type: Schema.Types.ObjectId, ref: 'User'},
  // the _ (underscore) by convention,
  // indicates a relationship reference to another model
  dateSent: Date,
  lastResponded: Date
});

mongoose.model('surveys', surveySchema);