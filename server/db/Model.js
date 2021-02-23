const Sequelize = require('sequelize')
const db = require('./db')
const crypto = require('crypto');
const _ = require('lodash');

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue('password')
    }
  },
  google_id: {
    type: Sequelize.STRING
  },
  salt: {
    type: Sequelize.STRING,
    get() {
      return() => this.getDataValue('salt')
  }
  }
})
// instance methods
User.prototype.correctPassword = function (candidatePassword) {
  // should return true or false for if the entered password matches
  return User.encryptPassword(candidatePassword, this.salt) === this.password();
};

User.prototype.sanitize = function () {
  return _.omit(this.toJSON(), ['password', 'salt']);
};

// class methods
User.generateSalt = function () {
  // this should generate our random salt
  return crypto.randomBytes(16).toString('base64');
};

User.encryptPassword = function (plainText, salt) {
  // accepts a plain text password and a salt, and returns its hash
  const hash = crypto.createHash('sha1');
  hash.update(plainText);
  hash.update(salt);
  return hash.digest('hex');
};

function setSaltAndPassword (user) {
  // we need to salt and hash again when the user enters their password for the first time
  // and do it again whenever they change it
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password, user.salt)
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)

module.exports = User
