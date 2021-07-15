const Joi = require('joi');
const { dataBaseTableEnum: { GENDER }, } = require('../../consts');

module.exports = Joi.object({
  changeProfileValidator: {

    firstName: Joi
      .string()
      .max(24),

    lastName: Joi
      .string()
      .max(24),

    nickName: Joi
      .string()
      .max(24),

    age: Joi
      .number()
      .max(3),

    gender: Joi
      .string()
      .allow(...Object.values(GENDER)),

    password: Joi
      .string()
      .max(8)
      .max(64),

    avatar: Joi
      .string()

  }

});
