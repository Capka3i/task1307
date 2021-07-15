const { OAuthModule } = require('../basaDate');
const { genToken } = require('./token.service');

module.exports = {
  GToken: async (_id) => {
    const tokensAR = genToken();

    const document = await OAuthModule.create({ ...tokensAR, user: _id });

    return document;
  }
};
