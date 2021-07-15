module.exports = {
  USER_PROFILE: 'userProfile',
  URL_MONGODB: process.env.URL_MONGODB || 'mongodb://localhost:27017/feb-2021',
  URL_LOCAL_HOST_OR: process.env.URL_LOCAL_HOST || 'http://localhost:3000/',
  URL_LOCAL_HOST: process.env.URL_LOCAL_HOST || 'http://localhost:3000/users/activation',
  URL_LOCAL_HOST_PASS: process.env.URL_LOCAL_HOST || 'http://localhost:3000/users/changerpass',
  URL_HAF: [
    'nifnif',
    'nafnaf',
    'nufnuf',
    'some'
  ],
  ACTIVATION_EMAIL: {
    templateName: 'activatorEmail',
    subject: 'your need activate email',
  },
  REMOVE: {
    templateName: 'REMOVE',
    subject: 'your Remove PROFILE',
  },
  REGISTRATION: {
    templateName: 'registration',
    subject: 'thanks for your registration',
  },
  PASSWORD: {
    templateName: 'password',
    subject: 'you want change password',
  },
  PASSWORDCHANGE: {
    templateName: 'passwordChange',
    subject: 'you change password',
  },
  MAIL_TO_SENT: process.env.MAIL_TO_SENT || 'someMail',
  PASS_TO_SENT: process.env.PASS_TO_SENT || 'somePassword',
  PERSONAL_AUTHORIZATION: 'accessToken',
  SECRET_AUTHORIZATION: 'refreshToken',
  ACCESS_TOKEN_KEY: process.env.ACCESS_TOKEN_KEY || 'justEasyKEY',
  REFRESH_TOKEN_KEY: process.env.REFRESH_TOKEN_KEY || 'HardKEY',
  ACCESS: 'access',
  SET29M: '29m',
  SET2D: '2d',
  SET23D: '28d',
  pthoto: 'pthoto',
  user: 'user',
  staticDir: 'static',
  SEND_MAIL: 'You send mail',

  PHOTO_MAX_SIZE: 2 * 1024 * 1024, // 2MB
  PHOTOS_MIMETYPES: [
    'image/gif',
    'image/jpeg',
    'image/pjpeg',
    'image/png',
    'image/tiff',
    'image/webp'
  ],
};
