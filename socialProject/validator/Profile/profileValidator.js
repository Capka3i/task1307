const Joi = require('joi');
const { dataBaseTableEnum: { GENDER }, regex: { EMAIL } } = require('../../consts');

module.exports = Joi.object({
  ProfileValidator: {
    firstName: Joi
      .string()
      .max(24)
      .required(),

    lastName: Joi
      .string()
      .max(24)
      .required(),

    nickName: Joi
      .string()
      .max(24),

    age: Joi
      .number()
      .max(3),

    gender: Joi
      .string()
      .allow(...Object.values(GENDER)),

    email: Joi
      .string()
      .regex(EMAIL)
      .required(),

    password: Joi
      .string()
      .max(8)
      .max(64)
      .required(),

    avatar: Joi
      .string()

  },

});
