const router = require('express').Router();

const {
  userConntroller: {
    regisration,
    activationProfile,
    removeUser,
    changeProfile
  }
} = require('../controllers');
const {
  userMidleware: {
    idValide,
    validRegistration,
    checkUserValidity,
    statusUser
  }
} = require('../middleWare');

router.post('/registration', validRegistration, regisration);

router.put('/activation', idValide, activationProfile);

router.delete('/remove/:user_id', idValide, statusUser, removeUser);

router.put('/changer/:user_id', idValide, statusUser, checkUserValidity, changeProfile);

module.exports = router;
