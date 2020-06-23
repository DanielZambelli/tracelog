const { Model, DataTypes: { INTEGER, JSONB, STRING }} = require('sequelize')
const Db = require('./db')

class ServiceInstances extends Model{}

ServiceInstances.init({
  id: { type: INTEGER, primaryKey: true, autoIncrement: true },
  secret: { type: STRING, allowNull: false, unique: true },
},{
  sequelize: Db,
  modelName: 'service_instances',
  freezeTableName: true,
})

module.exports = ServiceInstances
