const router = require('express').Router();

const { authConntroller: { login, logout, refresh } } = require('../controllers');
const {
  authMidleware: {
    getUserByDynamicParam,
    checkRefToken
  },
  userMidleware: {
    statusUser
  }
} = require('../middleWare');

router.post('/login', getUserByDynamicParam('email'), statusUser, login);

router.post('/logout', logout);

router.post('/refresh', checkRefToken, refresh);

module.exports = router;
