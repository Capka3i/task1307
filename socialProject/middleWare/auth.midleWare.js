const {
  ConstElements:
    {
      PERSONAL_AUTHORIZATION,
      SECRET_AUTHORIZATION
    },
  ErrorConst: { TOKEN_NOT_FOUND }
} = require('../consts');
const { ErrorHeader } = require('../Error');
const { OAuthModule, userModule } = require('../basaDate');
const { tokenService: { verifyToken } } = require('../service');

module.exports = {
  checkMailPassword: (req, res, next) => {
    try {
    console.log('-----------------');
      const { error } = userModule.validate(req.body);
      if (error) {
        throw new Error(error.details[0].message);
      }

      next();
    } catch (e) {
      next(e);
    }
  },
  getUserByDynamicParam: (param, path = 'body', someKey = param) => async (req, res, next) => {
    try {
      const value = req[path][param];

      req.user = await userModule.findOne({ [someKey]: value }).select('+password');

      next();
    } catch (e) {
      next(e);
    }
  },
  checkToken: async (req, res, next) => {
    try {
      const token = req.get(PERSONAL_AUTHORIZATION);
    console.log(req,222222222,token);
      await verifyToken(token);

      const findOne = await OAuthModule.findOne({ accessToken: token });

      if (!findOne) {
        throw new ErrorHeader(TOKEN_NOT_FOUND);
      }
      req.userToken = findOne;
      next();
    } catch (e) {
      next(e);
    }
  },
  checkRefToken: async (req, res, next) => {
    try {
      const refTok = req.get(SECRET_AUTHORIZATION);
      const perTok = req.get(PERSONAL_AUTHORIZATION);

      const findOne = await OAuthModule.findOneAndDelete({
        [PERSONAL_AUTHORIZATION]: perTok,
        [SECRET_AUTHORIZATION]: refTok
      });
    console.log(findOne);
      if (!findOne) {
        throw new ErrorHeader(TOKEN_NOT_FOUND);
      }

      req.user = findOne;

      next();
    } catch (e) {
      next(e);
    }
  }

};
