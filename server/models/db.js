const Sequelize = require('sequelize')
if(!process.env.DB_URL) throw new Error('env missing DB_URL')

const Db = new Sequelize(process.env.DB_URL, {
  logging: false,
  dialect: 'postgres',
  dialectOptions: {
    dateStrings: true,
  },
  pool: {
    min: 1,
    max: 5,
    idle: 10000,
    acquire: 30000,
  },
})

module.exports = Db
