const logJson = (rows) => {
  console.log(rows.map(row => row.toJSON()))
}

const seed = async () => {

  const { ServiceInstances:SI, Tracelogs } = require('../models')
  const shouldSeed = await SI.count().then(count => count === 0)
  console.log('should seed', shouldSeed)
  if(!shouldSeed) return

  let serviceInstances = await SI.bulkCreate([
    { secret: 'MIICWwIBAAKBgQDfm74vhu9M2x1fXc+t56q77/jnV/TQ77CwC0KQmiICKwrzubWs' },
    { secret: '7dMgL53Ze4t5jwJZ6WHnCWphxQIndCCFuPsK0FiQ5EOQfHhgdVcj5zFUB5mPh6k0' }
  ])
  logJson(serviceInstances)

  await Promise.all(
    serviceInstances.map(serviceInstance => {
      return Tracelogs.bulkCreate([
        { siid: serviceInstance.id, type: 'error', cat: 'payment-system', data: { msg: 'invalid creditcard', card: 'xxx-xxx-avcx', digits: 'avcx', carrier: 'BANK-OF-SC' }},
        { siid: serviceInstance.id, type: 'error', cat: 'payment-system', data: { msg: 'invalid creditcard', card: 'xxx-xxx-1234', digits: '1234', carrier: 'BANK-OF-SC' }},
        { siid: serviceInstance.id, type: 'warning', cat: 'user', data: { msg: 'invalid login attempt', email: 'jd@google.com' }},
        { siid: serviceInstance.id, type: 'warning', cat: 'user', data: { msg: 'invalid login attempt', email: 'jd@google.com' }},
        { siid: serviceInstance.id, type: 'warning', cat: 'user', data: { msg: 'invalid login attempt', email: 'jd@google.com' }},
        { siid: serviceInstance.id, type: 'warning', cat: 'user', data: { msg: 'invalid login attempt', email: 'jd@google.com' }},
        { siid: serviceInstance.id, type: 'warning', cat: 'user', data: { msg: 'invalid login attempt', email: 'jd@google.com' }},
        { siid: serviceInstance.id, type: 'warning', cat: 'user', data: { msg: 'invalid login attempt', email: 'jd@google.com' }},
        { siid: serviceInstance.id, type: 'warning', cat: 'user', data: { msg: 'invalid login attempt', email: 'jd@google.com' }},
        { siid: serviceInstance.id, type: 'warning', cat: 'user', data: { msg: 'invalid login attempt', email: 'jd@google.com' }},
        { siid: serviceInstance.id, type: 'warning', cat: 'user', data: { msg: 'invalid login attempt', email: 'jd@google.com' }},
        { siid: serviceInstance.id, type: 'warning', cat: 'user', data: { msg: 'invalid login attempt', email: 'jd@google.com' }},
        { siid: serviceInstance.id, type: 'warning', cat: 'user', data: { msg: 'invalid login attempt', email: 'jd@google.com' }},
        { siid: serviceInstance.id, type: 'warning', cat: 'user', data: { msg: 'invalid login attempt', email: 'jd@google.com' }},
        { siid: serviceInstance.id, type: 'warning', cat: 'user', data: { msg: 'invalid login attempt', email: 'jd@google.com' }},
        { siid: serviceInstance.id, type: 'error', cat: 'payment-system', data: { msg: 'invalid creditcard', card: 'xxx-xxx-avcx', digits: 'avcx', carrier: 'BANK-OF-SC' }},
        { siid: serviceInstance.id, type: 'error', cat: 'payment-system', data: { msg: 'invalid creditcard', card: 'xxx-xxx-1234', digits: '1234', carrier: 'BANK-OF-SC' }},
        { siid: serviceInstance.id, type: 'warning', cat: 'user', data: { msg: 'invalid login attempt', email: 'jd@google.com' }},
        { siid: serviceInstance.id, type: 'warning', cat: 'user', data: { msg: 'invalid login attempt', email: 'jd@google.com' }},
        { siid: serviceInstance.id, type: 'warning', cat: 'user', data: { msg: 'invalid login attempt', email: 'jd@google.com' }},
        { siid: serviceInstance.id, type: 'warning', cat: 'user', data: { msg: 'invalid login attempt', email: 'jd@google.com' }},
        { siid: serviceInstance.id, type: 'warning', cat: 'user', data: { msg: 'invalid login attempt', email: 'jd@google.com' }},
        { siid: serviceInstance.id, type: 'warning', cat: 'user', data: { msg: 'invalid login attempt', email: 'jd@google.com' }},
        { siid: serviceInstance.id, type: 'warning', cat: 'user', data: { msg: 'invalid login attempt', email: 'jd@google.com' }},
        { siid: serviceInstance.id, type: 'warning', cat: 'user', data: { msg: 'invalid login attempt', email: 'jd@google.com' }},
        { siid: serviceInstance.id, type: 'warning', cat: 'user', data: { msg: 'invalid login attempt', email: 'jd@google.com' }},
        { siid: serviceInstance.id, type: 'warning', cat: 'user', data: { msg: 'invalid login attempt', email: 'jd@google.com' }},
        { siid: serviceInstance.id, type: 'warning', cat: 'user', data: { msg: 'invalid login attempt', email: 'jd@google.com' }},
        { siid: serviceInstance.id, type: 'warning', cat: 'user', data: { msg: 'invalid login attempt', email: 'jd@google.com' }},
        { siid: serviceInstance.id, type: 'warning', cat: 'user', data: { msg: 'invalid login attempt', email: 'jd@google.com' }},
        { siid: serviceInstance.id, type: 'error', cat: 'payment-system', data: { msg: 'invalid creditcard', card: 'xxx-xxx-avcx', digits: 'avcx', carrier: 'BANK-OF-SC' }},
        { siid: serviceInstance.id, type: 'error', cat: 'payment-system', data: { msg: 'invalid creditcard', card: 'xxx-xxx-1234', digits: '1234', carrier: 'BANK-OF-SC' }},
        { siid: serviceInstance.id, type: 'warning', cat: 'user', data: { msg: 'invalid login attempt', email: 'jd@google.com' }},
        { siid: serviceInstance.id, type: 'warning', cat: 'user', data: { msg: 'invalid login attempt', email: 'jd@google.com' }},
        { siid: serviceInstance.id, type: 'warning', cat: 'user', data: { msg: 'invalid login attempt', email: 'jd@google.com' }},
        { siid: serviceInstance.id, type: 'warning', cat: 'user', data: { msg: 'invalid login attempt', email: 'jd@google.com' }},
        { siid: serviceInstance.id, type: 'warning', cat: 'user', data: { msg: 'invalid login attempt', email: 'jd@google.com' }},
        { siid: serviceInstance.id, type: 'warning', cat: 'user', data: { msg: 'invalid login attempt', email: 'jd@google.com' }},
        { siid: serviceInstance.id, type: 'warning', cat: 'user', data: { msg: 'invalid login attempt', email: 'jd@google.com' }},
        { siid: serviceInstance.id, type: 'warning', cat: 'user', data: { msg: 'invalid login attempt', email: 'jd@google.com' }},
        { siid: serviceInstance.id, type: 'warning', cat: 'user', data: { msg: 'invalid login attempt', email: 'jd@google.com' }},
        { siid: serviceInstance.id, type: 'warning', cat: 'user', data: { msg: 'invalid login attempt', email: 'jd@google.com' }},
        { siid: serviceInstance.id, type: 'warning', cat: 'user', data: { msg: 'invalid login attempt', email: 'jd@google.com' }},
        { siid: serviceInstance.id, type: 'warning', cat: 'user', data: { msg: 'invalid login attempt', email: 'jd@google.com' }},
        { siid: serviceInstance.id, type: 'warning', cat: 'user', data: { msg: 'invalid login attempt', email: 'jd@google.com' }},
        { siid: serviceInstance.id, type: 'error', cat: 'payment-system', data: { msg: 'invalid creditcard', card: 'xxx-xxx-avcx', digits: 'avcx', carrier: 'BANK-OF-SC' }},
        { siid: serviceInstance.id, type: 'error', cat: 'payment-system', data: { msg: 'invalid creditcard', card: 'xxx-xxx-1234', digits: '1234', carrier: 'BANK-OF-SC' }},
        { siid: serviceInstance.id, type: 'warning', cat: 'user', data: { msg: 'invalid login attempt', email: 'jd@google.com' }},
        { siid: serviceInstance.id, type: 'warning', cat: 'user', data: { msg: 'invalid login attempt', email: 'jd@google.com' }},
        { siid: serviceInstance.id, type: 'warning', cat: 'user', data: { msg: 'invalid login attempt', email: 'jd@google.com' }},
        { siid: serviceInstance.id, type: 'warning', cat: 'user', data: { msg: 'invalid login attempt', email: 'jd@google.com' }},
        { siid: serviceInstance.id, type: 'warning', cat: 'user', data: { msg: 'invalid login attempt', email: 'jd@google.com' }},
        { siid: serviceInstance.id, type: 'warning', cat: 'user', data: { msg: 'invalid login attempt', email: 'jd@google.com' }},
        { siid: serviceInstance.id, type: 'warning', cat: 'user', data: { msg: 'invalid login attempt', email: 'jd@google.com' }},
        { siid: serviceInstance.id, type: 'warning', cat: 'user', data: { msg: 'invalid login attempt', email: 'jd@google.com' }},
        { siid: serviceInstance.id, type: 'warning', cat: 'user', data: { msg: 'invalid login attempt', email: 'jd@google.com' }},
        { siid: serviceInstance.id, type: 'warning', cat: 'user', data: { msg: 'invalid login attempt', email: 'jd@google.com' }},
        { siid: serviceInstance.id, type: 'warning', cat: 'user', data: { msg: 'invalid login attempt', email: 'jd@google.com' }},
        { siid: serviceInstance.id, type: 'warning', cat: 'user', data: { msg: 'invalid login attempt', email: 'jd@google.com' }},
        { siid: serviceInstance.id, type: 'warning', cat: 'user', data: { msg: 'invalid login attempt', email: 'jd@google.com' }},
      ]).then(logJson)
    })
  )
}
seed().then(() => process.exit())
