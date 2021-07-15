const Joi = require('joi');

module.exports = Joi.object({
  passwordChanger: {
    oldPassword: Joi
      .string()
      .max(8)
      .max(64),

    newPassword: Joi
      .string()
      .max(8)
      .max(64),
    reNewPassword: Joi
      .string()
      .max(8)
      .max(64),
  }
});
