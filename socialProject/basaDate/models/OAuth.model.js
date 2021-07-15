const { Schema, model } = require('mongoose');

const { dataBaseEnum: { OAUTH, USER } } = require('../../consts');

const oAuthSchema = new Schema({
  accessToken: {
    type: String,
    required: true,
    unique: true
  },
  refreshToken: {
    type: String,
    required: true,
    unique: true
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: USER

  }
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

oAuthSchema.pre('find', function() {
this.populate('user');
});

oAuthSchema.pre('findSome', function() {
this.populate('user');
});

module.exports = model(OAUTH, oAuthSchema);
