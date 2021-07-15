const { ConstElements: { ACTIVATION_EMAIL, REGISTRATION, REMOVE }, EmailTableEnum } = require('../consts');

module.exports = {

  [EmailTableEnum.ACTIVATION_EMAIL]: {
    templateName: ACTIVATION_EMAIL.templateName,
    subject: ACTIVATION_EMAIL.subject
  },
  [EmailTableEnum.REMOVE]: {
    templateName: REMOVE.templateName,
    subject: REMOVE.subject
  },
  [EmailTableEnum.REGISTRATION]: {
    templateName: REGISTRATION.templateName,
    subject: REGISTRATION.subject
  }
};
