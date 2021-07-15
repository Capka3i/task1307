module.exports = {

  CANNOT_FOUND_PHOTO: {
    statusCode: 404,
    message: 'Cannot found photos',
    code: 404
  },
  REQUEST_ENTITY_TOO_LARGE: {
    statusCode: 413,
    message: 'Request Entity Too Large. Max size 2 Mb',
    code: 413
  },
  EMAIL_IS_ALREADY_REGISTERED: {
    status: 401,
    message: 'EMAIL IS ALREADY REGISTERED',
    code: 401.1
  },
  EMAIL_NOT_ACTIVE: {
    status: 403.2,
    message: 'Email address not active ',
    code: 403
  },
  GOOD_BYE: {
    status: 204,
    message: 'Good Bye',
    code: 204
  },
  OK: {
    status: 200,
    message: 'OK',
    code: 200
  },
  TOKEN_NOT_FOUND: {
    status: 404,
    message: 'TOKEN NOT FOUND',
    code: 404.2
  },
  USER_NOT_FOUND: {
    status: 404.1,
    message: 'USER NOT FOUND',
    code: 404
  },
  USER_REMOVE: {
    status: 404.2,
    message: 'USER DELETE',
    code: 404
  },

  WRONG_EMAIL_OR_PASSWORD: {
    status: 403.1,
    message: 'Wrong email or password',
    code: 403
  },
  WRONG_TEMPLATE: {
    status: 404,
    message: 'Wrong TEMPLATE',
    code: 404
  },
  YOU_CANNOT_CHANGE_PROFILE: {
    status: 404,
    message: 'You cannot change the email',
    code: 404.3
  },
};
