const Jwt = require('jsonwebtoken')
const { ServiceInstances: SI } = require('../models')

module.exports = async (req, res) => {

  let { secret } = req.body
  secret = Buffer.from(secret, 'base64').toString('utf-8')

  const serviceInstance = await SI.findOne({ where: { secret } })
  if(!serviceInstance) return res.status(403).json({ error: 'FORBIDDEN' })

  const token = Jwt.sign({ siid: serviceInstance.id }, process.env.SECRET, { expiresIn: '1d' })
  res.json({ token })

}
