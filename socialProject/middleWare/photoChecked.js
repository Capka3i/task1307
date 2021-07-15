const {
  ErrorConst:
{
  REQUEST_ENTITY_TOO_LARGE
},
  ConstElements: {
    PHOTO_MAX_SIZE,
    PHOTOS_MIMETYPES,
  }
} = require('../consts');
const { ErrorHeader } = require('../Error');

module.exports = {
  checkedPhoto: (req, res, next) => {
    try {
      let filesArray;

      if (req.files) {
        filesArray = Object.values(req.files);

        const photos = [];

        for (const filesElement of filesArray) {
          const { name, size, mimetype } = filesElement;

          if (PHOTOS_MIMETYPES.includes(mimetype)) {
            if (size > PHOTO_MAX_SIZE) {
              throw new ErrorHeader(REQUEST_ENTITY_TOO_LARGE);
            }
            photos.push(name);
          }
        }
        req.photos = photos;
      }
      next();
    } catch (e) {
      next(e);
    }
  }
};
