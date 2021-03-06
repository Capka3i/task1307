const {
  userService: {
    createProfile,
    activationProfile,
    removeProfile,
    changeProfile,
      changePasswordCrea,
      activationNewPass
  }, emailService: { sentMail }
} = require('../service');
const { userHelper: { userNormalizator } } = require('../helper');
const {
  ConstElements: { SEND_MAIL },
  EmailTableEnum: {
    ACTIVATION_EMAIL, REGISTRATION, REMOVE, PASSWORD,PASSWORDCHANGE
  }, ErrorConst: { OK }
} = require('../consts');

module.exports = {
  regisration: async (req, res, next) => {
    try {
      const newVar = await createProfile(req);
      await sentMail(newVar.email, ACTIVATION_EMAIL, newVar);
      res.json(userNormalizator(newVar));
      next();
    } catch (e) {
      next(e);
    }
  },
  activationProfile: async (req, res, next) => {
    try {
      const {

        firstName,
        lastName,
        nickName,
        email
      } = req.user;

      await activationProfile(req.query);

      await sentMail(email, REGISTRATION, {
        firstName,
        lastName,
        nickName,
      });

      res.status(OK.status, OK.message).json(OK.status);
    } catch (e) {
      next(e);
    }
  },
  removeUser: async (req, res, next) => {
    try {
      const {
        firstName,
        lastName,
        nickName,
        email
      } = req.user;

      await removeProfile(req.params);

      await sentMail(email, REMOVE, {
        firstName,
        lastName,
        nickName,
      });

      res.status(OK.status).json(OK.message);
    } catch (e) {
      next(e);
    }
  },
  changeProfile: async (req, res, next) => {
    try {
      await changeProfile(req);

      res.status(OK.status).json(OK.message);
    } catch (e) {
      next(e);
    }
  },
  changePasswordSendler: async (req, res, next) => {
    try {
      const { email } = req.user;
      const newVar = await changePasswordCrea(req);
      await sentMail(email, PASSWORD, newVar);

      res.status(OK.status).json(SEND_MAIL);
    } catch (e) {
      next(e);
    }
  },
  changePassword: async (req, res, next) => {
    try {
      const {
        email
      } = req.user;
      const newVar = await activationNewPass(req);
      await sentMail(email, PASSWORDCHANGE, newVar);

      res.status(OK.status, OK.message);
    } catch (e) {
      next(e);
    }
  },
};
