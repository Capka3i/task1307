const {
  ConstElements: {
    ACTIVATION_EMAIL, REGISTRATION, REMOVE, PASSWORD,PASSWORDCHANGE
  }, EmailTableEnum
} = require('../consts');

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
  },
  [EmailTableEnum.PASSWORD]: {
    templateName: PASSWORD.templateName,
    subject: PASSWORD.subject
  },
  [EmailTableEnum.PASSWORDCHANGE]: {
    templateName: PASSWORDCHANGE.templateName,
    subject: PASSWORDCHANGE.subject
  }
};
