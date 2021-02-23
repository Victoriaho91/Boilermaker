const Sequelize = require('sequelize')
const db = require('./db')

const Model = db.define('models', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Model
