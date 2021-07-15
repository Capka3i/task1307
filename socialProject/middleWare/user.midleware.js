const {
  ErrorConst:
    {
      EMAIL_IS_ALREADY_REGISTERED,
      USER_NOT_FOUND,
      EMAIL_NOT_ACTIVE,
      USER_REMOVE
    },
  dataBaseTableEnum:
      {
        STATUS:
            {
              ACTION,
              DELETE
            }
      }
} = require('../consts');
const { ErrorHeader } = require('../Error');
const { profileValidator, profileChangeValidator } = require('../validator');
const { userModule } = require('../basaDate');

module.exports = {
  validRegistration: async (req, res, next) => {
    try {
      const { error } = profileValidator.validate(req.body);

      if (!error) {
        throw new Error(error.details[0].message);
      }

      const { email } = req.body;

      const query = await userModule.findOne({ email });
      if (query) {
        throw new ErrorHeader(EMAIL_IS_ALREADY_REGISTERED);
      }

      req.user = req.body;

      next();
    } catch (e) {
      next(e);
    }
  },
  idValide: async (req, res, next) => {
    try {
      const user = req.query.some || req.params.user_id;
      const baseDateElement = await userModule.findById(user);

      if (!baseDateElement) {
        throw new ErrorHeader(USER_NOT_FOUND);
      }

      req.user = baseDateElement;
      next();
    } catch (e) {
      next(e);
    }
  },
  checkUserValidity: (req, res, next) => {
    try {
      const { error } = profileChangeValidator.validate(req.body);

      if (!error) {
        throw new Error(error.details[0].message);
      }

      next();
    } catch (e) {
      next(e);
    }
  },
  statusUser: (req, res, next) => {
    try {
      const { status } = req.user;

      if (status !== ACTION) {
        if (status === DELETE) {
          throw new ErrorHeader(USER_REMOVE);
        }

        throw new ErrorHeader(EMAIL_NOT_ACTIVE);
      }

      next();
    } catch (e) {
      next(e);
    }
  },
};
