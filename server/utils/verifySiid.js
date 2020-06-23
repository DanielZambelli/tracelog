const Jwt = require('jsonwebtoken')
const { ServiceInstances:SI } = require('../models')

module.exports = async (req,res,next) => {

  const authorization = req.get('Authorization')
  if(!authorization)
    return res.status(401).json({ error: 'UNAUTHORIZED' })

  const [prefix, token] = authorization.split(' ')
  if(!token)
    return res.status(401).json({ error: 'UNAUTHORIZED' })
  
  let siid = null
  try{
    const payload = Jwt.verify(token, process.env.SECRET)
    siid = payload.siid
  }catch(error){
    return res.status(403).json({ error: 'FORBIDDEN' })
  }
  
  // ensure the service instance actaully exist
  const serviceInstancesMatching = await SI.count({ where: { id: siid } })
  if(serviceInstancesMatching === 0)
    return res.status(403).json({ error: 'FORBIDDEN' })

  req.siid = siid
  next()
}
