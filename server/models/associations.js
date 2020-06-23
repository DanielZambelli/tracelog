const ServiceInstances = require('./serviceInstances')
const Tracelogs = require('./tracelogs')

ServiceInstances.hasMany(Tracelogs, {
  foreignKey: 'siid',
  constraints: false,
  as: 'tracelogs'
})

Tracelogs.belongsTo(ServiceInstances, {
  foreignKey: 'siid',
  constraints: false,
  as: 'serviceInstance'
})
