const { photoDirBuilder: { photosRenamer } } = require('../helper');
const { userModule } = require('../basaDate');

module.exports = {
  deletePhoto: async (req) => {
    const { user: { _id }, body: { numb } } = req;
    const user = await userModule.findById(_id);
    user.album.splice(numb, 1);

    await userModule.updateOne({ _id }, { $set: { album: user.album } });

    return user;
  },
  addPhotos: async (req) => {
    const { user: { _id }, files: { photo } } = req;

    photo.name = photosRenamer(photo);
    // eslint-disable-next-line no-await-in-loop
    await userModule.updateOne({ _id }, { $set: { avatar: photo.name } });
    await userModule.updateOne({ _id }, { $push: { album: photo.name } });

    return photo;
  }
};
