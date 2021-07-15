module.exports.userModule = require('./models/User.model');
module.exports.OAuthModule = require('./models/OAuth.model');

const mongoose = require('mongoose');

module.exports._connector = function _mongooseConnector() {
  mongoose.connect('mongodb://localhost:27017/socialProject',
    { useUnifiedTopology: true, useNewUrlParser: true });
};
