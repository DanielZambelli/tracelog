const { Model, DataTypes: { INTEGER, JSONB, STRING }} = require('sequelize')
const Db = require('./db')

class Tracelogs extends Model{}

Tracelogs.init({
  id: { type: INTEGER, primaryKey: true, autoIncrement: true },
  siid: { type: INTEGER, allowNull: false },
  type: {
    type: STRING,
    allowNull: false,
    validate: {
      isIn: {
        args: [['error','warning','message']],
        msg: 'type must be either of: error, warning or message',
      }
    }
  },
  cat: { type: STRING },
  data: { type: JSONB, defaultValue: {} },
},{
  sequelize: Db,
  modelName: 'tracelogs',
  freezeTableName: true,
})

module.exports = Tracelogs
