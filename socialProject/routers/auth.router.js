const router = require('express').Router();

const { authConntroller: { login, logout, refresh } } = require('../controllers');
const {
  authMidleware: {
    getUserByDynamicParam,
    checkToken,
    checkRefToken
  },
  userMidleware: {
    statusUser
  }
} = require('../middleWare');

router.post('/login', getUserByDynamicParam('email'), statusUser, login);

router.post('/logout', checkToken, logout);

router.post('/refresh', checkRefToken, refresh);

module.exports = router;
