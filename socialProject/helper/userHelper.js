module.exports = {
  userNormalizator: (userToNormalize = {}) => {
    const fieldsToRemove = [
      'password',
      'status',
      'emailConfirmation',
      'accessToken',
      'refreshToken',
      'passwordToChange'
    ];

    fieldsToRemove.forEach((filed) => {
      userToNormalize[filed] = undefined;
    });

    return userToNormalize;
  }
};
