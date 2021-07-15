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
  }
} = require('../middleWare');

router.post('/registration', validRegistration, regisration);

router.put('/activation', idValide, activationProfile);

router.delete('/remove/:user_id', idValide, statusUser, removeUser);

router.put('/changer/:user_id', idValide, statusUser, checkUserValidity, changeProfile);

router.post('/changerpass/:user_id', idValide, statusUser, changePasswordVal, changePasswordSendler);

router.put('/changerpass', idValide, changePassword);

module.exports = router;
