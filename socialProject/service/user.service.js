const { userModule } = require('../basaDate');

const { ErrorHeader } = require('../Error');
const {
  dataBaseTableEnum:
      {
        STATUS:
            {
              EMAIL_NOT_ACTIVE,
              ACTION,
              DELETE
            }
      },
  ErrorConst:
      {
        USER_NOT_FOUND,
        YOU_CANNOT_CHANGE_PROFILE
      },
  ConstElements:
      {
        pthoto
      }
} = require('../consts');
const { photoDirBuilder: { photoBilder, photosRenamer } } = require('../helper');
const { hash } = require('./password.service');
const { tokenForEmail, genToken } = require('./token.service');

module.exports = {
  createProfile: async (someProfile) => {
    const {
      user: {
        nickName,
        firstName,
        lastName,
        password,
        email
      },
      files: {
        avatar
      }
    } = someProfile;

    avatar.name = photosRenamer(avatar);

    const activationUuid = await tokenForEmail(email);
    const {
      accessToken,
      refreshToken
    } = await genToken();

    const hashPassword = await hash(password);
    const newVar = await userModule.create({
      ...someProfile.user,
      nickName: nickName || `${lastName}_${firstName}`,
      password: hashPassword,
      status: EMAIL_NOT_ACTIVE,
      emailConfirmation: activationUuid.mailToken,
      avatar: avatar.name[0],
      allAvatar: avatar.name,
      accessToken,
      refreshToken
    });
    if (avatar) {
      const pathDirCom = await photoBilder(pthoto, avatar.name[0], newVar._id);
    await avatar.mv(pathDirCom);
    }
    return newVar;
  },
  activationProfile: async (someVal) => {
    const {
      nifnif,
      nafnaf,
      nufnuf,
      some
    } = someVal;
    const { emailConfirmation } = await userModule.findById(some);

    if (emailConfirmation !== `${nifnif}.${nafnaf}.${nufnuf}`) {
      throw new ErrorHeader(USER_NOT_FOUND);
    }
    const newVar = await userModule.updateOne({ _id: some }, { $set: { status: ACTION } });
    return newVar.status;
  },
  removeProfile: async (someVal) => {
    const {
      user_id
    } = someVal;

    const newVar = await userModule.updateOne({ _id: user_id }, { $set: { status: DELETE } });
    return newVar.status;
  },
  changeProfile: async (someProfile) => {
    const {
      password,
      email
    } = someProfile.body;
    const { _id } = someProfile.user;
    if (email) {
      throw new ErrorHeader(YOU_CANNOT_CHANGE_PROFILE);
    }
    if (password) {
      someProfile.body.password = await hash(password);
    }
    const newVar = await userModule.findOneAndUpdate({ _id }, someProfile.body);

    return newVar;
  }

};
