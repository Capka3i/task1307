const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const verifyPromise = promisify(jwt.verify);

const {
  ConstElements: {
    ACCESS,
    ACCESS_TOKEN_KEY,
    REFRESH_TOKEN_KEY,
    SET23D,
    SET29M,
    SET2D
  }
} = require('../consts');

module.exports = {
  genToken: () => {
    const accessToken = jwt.sign({}, ACCESS_TOKEN_KEY, { expiresIn: SET29M });
    const refreshToken = jwt.sign({}, REFRESH_TOKEN_KEY, { expiresIn: SET23D });

    return {
      accessToken,
      refreshToken
    };
  },

  verifyToken: async (token, tokenType = ACCESS) => {
    const someSercret = tokenType === ACCESS ? ACCESS_TOKEN_KEY : REFRESH_TOKEN_KEY;
    console.log(someSercret);
    await verifyPromise(token, someSercret);
  },

  tokenForEmail: async (email) => {
    const mailToken = await jwt.sign({}, email, { expiresIn: SET2D });
    return { mailToken };
  }

};
