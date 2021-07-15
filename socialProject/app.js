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

app.listen(3000, () => {
  console.log(`lister port is ${3000}`);
});
