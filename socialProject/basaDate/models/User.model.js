const { Schema, model } = require('mongoose');

const {
  dataBaseTableEnum: { GENDER, STATUS },
  ConstElements: { USER_PROFILE }
} = require('../../consts');

const profileSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true
    },
    nickName: {
      type: String,

    },
    age: {
      type: Number
    },
    gender: {
      type: String,
      enum: Object.values(GENDER)
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true
    },
    avatar: {
      type: String
    },
    album: {
      type: Array
    },
    status: {
      type: String,
      enum: Object.values(STATUS)
    },
    emailConfirmation: {
      type: String
    },
    accessToken: {
      type: String
    },
    refreshToken: {
      type: String
    }
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  }
);

module.exports = model(USER_PROFILE, profileSchema);
