const router = require('express').Router();

const {
  userConntroller: {
    regisration,
    activationProfile,
    removeUser,
    changeProfile,
    changePasswordSendler,
    changePassword
  }
} = require('../controllers');
const {
  userMidleware: {
    idValide,
    validRegistration,
    checkUserValidity,
    statusUser,
    changePasswordVal
  }, authMidleware: {
    checkToken
  }
} = require('../middleWare');

router.post('/registration', validRegistration, regisration);

router.put('/activation', idValide, activationProfile);

router.delete('/remove/:user_id', idValide, statusUser, checkToken, removeUser);

router.put('/changer/:user_id', idValide, statusUser, checkToken, checkUserValidity, changeProfile);

router.post('/changerpass/:user_id', idValide, statusUser, checkToken, changePasswordVal, changePasswordSendler);

router.put('/changerpass', idValide, checkToken, changePassword);

module.exports = router;
