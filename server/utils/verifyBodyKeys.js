module.exports = (requiredKeys) => (req,res,next) => {
  const proviedKeys = Object.keys(req.body).join(' ')
  const missingKeys = requiredKeys.filter(requiredKey => !proviedKeys.match(requiredKey))
  if(missingKeys.length > 0)
    return res.status(400).json({
      error: 'missing options',
      requiredOptions: requiredKeys,
      missingOptions: missingKeys,
    })
  return next()
}
