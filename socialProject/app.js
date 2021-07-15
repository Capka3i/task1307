const express = require('express');
const uploadFile = require('express-fileupload');
// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config({ path: '../.env' });

const { userRouter, authRouter, photoRouter } = require('./routers');
const { _connector } = require('./basaDate');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

_connector();

app.use(uploadFile());

app.use('/auths', authRouter);
app.use('/photos', photoRouter);
app.use('/users', userRouter);
app.use('*', _notFoundHandler);
app.use(_hadleErrors);

app.listen(3000, () => {
  console.log(`lister port is ${3000}`);
});

// eslint-disable-next-line no-unused-vars
function _hadleErrors(err, req, res, next) {
  res
    .json({
      errorMessage: err.message || 'Unknown error',
      errorStatus: err.status || 0
    });
}

function _notFoundHandler(err, req, res, next) {
  next({
    status: err.code || 404,
    message: err.message || 'Rout not fond'
  });
}
