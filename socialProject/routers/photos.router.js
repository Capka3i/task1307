const router = require('express').Router();
const {
  photosConntroller: {
    getAllPhotosUser,
    deleteOnePhotoUser,
    addPhoto

  }
} = require('../controllers');

const {

  userMidleware: { idValide, statusUser },
  photoMidleware: { checkedPhoto }
} = require('../middleWare');

router.put('/:user_id', idValide, checkedPhoto, statusUser, addPhoto);

router.delete('/:user_id/:ids', idValide, statusUser, deleteOnePhotoUser);

router.get('/:user_id/photos', idValide, statusUser, getAllPhotosUser);

module.exports = router;
