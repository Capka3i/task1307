const fs = require('fs');
const { promisify } = require('util');

const promisify1 = promisify(fs.unlinkSync);

const {
  photoService: {
    deletePhoto,
    addPhotos
  }
} = require('../service');

const { photoDirBuilder: { photoBilder } } = require('../helper');

const {
  ErrorConst: {
    OK, CANNOT_FOUND_PHOTO
  },
  ConstElements: {
    pthoto
  }
} = require('../consts');

const { ErrorHandler } = require('../Error');
const { userModule } = require('../basaDate');

module.exports = {
  getAllPhotosUser: async (req, res, next) => {
    try {
      const { user_id } = req.params;
      const { album } = await userModule.findOne({ _id: user_id });

      if (!album) {
        throw new ErrorHandler(CANNOT_FOUND_PHOTO);
      }

      const outPhotos = `photos is ${album.toString()}`;

      res.json(outPhotos);
    } catch (e) {
      next(e);
    }
  },
  deleteOnePhotoUser: async (req, res, next) => {
    try {
      const fileToRemove = req.user.album[req.body.numb];
      await deletePhoto(req);

      const pathDirCom = await photoBilder(pthoto, fileToRemove, req.user._id);

      await promisify1(pathDirCom);
      res.json(OK.message);
    } catch (e) {
      next(e);
    }
  },
  addPhoto: async (req, res, next) => {
    try {
      const { files: { photo }, user: { _id } } = req;
      if (!photo) {
        throw new ErrorHandler(CANNOT_FOUND_PHOTO);
      }
      await addPhotos(req);

      const pathDirCom = await photoBilder(pthoto, photo.name, _id);

      await photo.mv(pathDirCom);

      res.json(OK.message);
    } catch (e) {
      next(e);
    }
  }
};
