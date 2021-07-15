const router = require('express').Router();
const {
  photosConntroller: {
    getAllPhotosUser,
    deleteOnePhotoUser,
    addPhoto

  }
} = require('../controllers');

const {
  authMidleware: { checkToken },
  userMidleware: { idValide, statusUser },
  photoMidleware: { checkedPhoto }
} = require('../middleWare');

router.put('/:user_id', idValide, checkToken, checkedPhoto, statusUser, addPhoto);

router.delete('/:user_id', idValide, checkToken, statusUser, deleteOnePhotoUser);

router.get('/:user_id/photos', idValide, checkToken, statusUser, getAllPhotosUser);

module.exports = router;
