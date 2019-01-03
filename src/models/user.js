const sequelize = require('sequelize');
const crypt = require('crypto');

const User = sequelize.define('users', {
  id: { type: sequelize.INTEGER },
  name: { type: sequelize.STRING },
  email: { type: sequelize.STRING },
  password: {
    type: sequelize.STRING,
    set(password) {
      this.setDataValue('salt', crypto.randomBytes(16).toString('hex'));
      this.setDataValue('password', crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex'));
    }
  },
  salt: { type: sequelize.STRING },
});

User.prototype.validatePassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.password === hash;
};

module.exports = User;
