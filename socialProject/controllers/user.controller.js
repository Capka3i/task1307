const {
  userService: {
    createProfile,
    activationProfile,
    removeProfile,
    changeProfile
  }, emailService: { sentMail }
} = require('../service');
const { userHelper: { userNormalizator } } = require('../helper');
const { EmailTableEnum: { ACTIVATION_EMAIL, REGISTRATION, REMOVE }, ErrorConst: { OK } } = require('../consts');

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

      res.status(OK.status, OK.message);
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
      const newVar = await changeProfile(req);

      res.status(OK.status).json(userNormalizator(newVar));
    } catch (e) {
      next(e);
    }
  },
};
