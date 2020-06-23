const { Tracelogs:T, ServiceInstances:SI } = require('../models')

// T
//   .findAll({ include: ['serviceInstance'] })
//   .then(rows => rows.map(row => row.toJSON()))
//   // .then(console.log)

// SI
//   .findAll({ include: ['tracelogs'] })
//   .then(rows => rows.map(row => row.toJSON()))
//   .then(results => {
//     console.log(results[0].tracelogs)
//   })
