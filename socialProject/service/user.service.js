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
        YOU_CANNOT_CHANGE_PROFILE,
        WRONG_NEW_PASSWORD,
      },
  ConstElements:
      {
        pthoto
      }
} = require('../consts');
const { photoDirBuilder: { photoBilder, photosRenamer } } = require('../helper');
const { hash, compare } = require('./password.service');
const { tokenForEmail } = require('./token.service');

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
    if (avatar) {
      avatar.name = photosRenamer(avatar);
    }
    const activationUuid = await tokenForEmail(email);

    const hashPassword = await hash(password);
    const newVar = await userModule.create({
      ...someProfile.user,
      nickName: nickName || `${lastName}_${firstName}`,
      password: hashPassword,
      status: EMAIL_NOT_ACTIVE,
      emailConfirmation: activationUuid.mailToken,
      avatar: avatar.name,
      album: avatar.name,
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

    const newVar = await userModule.updateOne({ _id: some }, { $set: { status: ACTION, emailConfirmation: null } });
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
  },
  changePasswordCrea: async (someProfile) => {
    const { user: { password, _id }, body: { oldPassword, newPassword, reNewPassword } } = someProfile;
    if (reNewPassword !== newPassword) {
      throw new ErrorHeader(WRONG_NEW_PASSWORD);
    }
    await compare(password, oldPassword);
    const activationUuid = await tokenForEmail(newPassword);

    await userModule.updateOne(
      { _id },
      { passwordToChange: reNewPassword, emailConfirmation: activationUuid.mailToken }
    );
    const newVar = await userModule.findOne({ _id });
    return newVar;
  },
  activationNewPass: async (someVal) => {
    const {
      query: {
        nifnif, nafnaf, nufnuf, some,
      }, user: { passwordToChange }
    } = someVal;
    const { emailConfirmation } = await userModule.findById(some);
    const hashPassword = await hash(passwordToChange);

    if (emailConfirmation !== `${nifnif}.${nafnaf}.${nufnuf}`) {
      throw new ErrorHeader(USER_NOT_FOUND);
    }

    await userModule.updateOne(
      { _id: some },
      {
        $set:
    {
      password: hashPassword,
      emailConfirmation: null,
      passwordToChange: null
    }
      }
    );

    const query = await userModule.findOne({ _id: some });
    return query;
  }

};
