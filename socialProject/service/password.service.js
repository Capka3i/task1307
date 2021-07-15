const bcrypt = require('bcrypt');

const { ErrorHeader } = require('../Error');
const { ErrorConst: { WRONG_EMAIL_OR_PASSWORD } } = require('../consts');

module.exports = {
  compare: (asherPassword, password) => {
    const compare = bcrypt.compare(asherPassword, password);

    if (!compare) throw new ErrorHeader(WRONG_EMAIL_OR_PASSWORD);
  },
  hash: (password) => bcrypt.hash(password, 10)
};
