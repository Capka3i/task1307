const nodemailer = require('nodemailer');
const EmailTemplate = require('email-templates');
const path = require('path');

const {
  ErrorConst: { WRONG_TEMPLATE }, ConstElements: {
    MAIL_TO_SENT, PASS_TO_SENT, URL_LOCAL_HOST, URL_LOCAL_HOST_PASS
  }, EmailTableEnum: { ACTIVATION_EMAIL, PASSWORD }
} = require('../consts');

const { ErrorHeader } = require('../Error');
const tamplace = require('../emailTamplace');
const { urlHelper: { urlHelperEmail } } = require('../helper');

const templaceParset = new EmailTemplate({
  views: {
    root: path.join(process.cwd(), 'emailTamplace')
  }
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: MAIL_TO_SENT,
    pass: PASS_TO_SENT
  }
});
const sentMail = async (emailUser, action, context = {}) => {
  const tamplateToSent = tamplace[action];

  const {
    firstName, lastName
  } = context;

  let someUrl;

  if (action === ACTIVATION_EMAIL) {
    someUrl = await urlHelperEmail(context, URL_LOCAL_HOST);
  } else if (action === PASSWORD) {
    someUrl = await urlHelperEmail(context, URL_LOCAL_HOST_PASS);
  }

  if (!tamplateToSent) throw new ErrorHeader(WRONG_TEMPLATE);

  const renderTemplate = await templaceParset.render(tamplateToSent.templateName, {
    emailUser,
    firstName,
    lastName,
    someUrl
  });

  await transporter.sendMail({
    from: MAIL_TO_SENT,
    to: emailUser,
    subject: tamplateToSent.subject,
    html: renderTemplate
  });
};

module.exports = {
  sentMail
};
