const { ConstElements: { PERSONAL_AUTHORIZATION }, ErrorConst: { GOOD_BYE } } = require('../consts');
const { OAuthModule } = require('../basaDate');
const { passwordService: { compare }, authService: { GToken } } = require('../service');

module.exports = {
  login: async (req, res, next) => {
    try {
      const { _id, password: passwordHasher } = req.user;
      const { password } = req.body;

      await compare(passwordHasher, password);

      const { _doc } = await GToken(_id);

      res.json({
        ..._doc,
        user: req.user,
        userID: _id
      });
    } catch (e) {
      next(e);
    }
  },
  logout: async (req, res, next) => {
    try {
      const token = req.get(PERSONAL_AUTHORIZATION);

      await OAuthModule.remove({ accessToken: token });

      res.status(GOOD_BYE.status).json(GOOD_BYE.message);
    } catch (e) {
      next(e);
    }
  },
  refresh: async (req, res, next) => {
    try {
      const { _id } = req.user;
      const { _doc } = await GToken(_id);

      res.json({
        ..._doc, user: req.user
      });
    } catch (e) {
      next(e);
    }
  },

};
