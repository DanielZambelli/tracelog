module.exports = (req,res) => {
  const { type, data, cat } = req.body
  require('../models/tracelogs')
    .create({ siid: req.siid, type, cat, data })
    .then(result => res.json(result))
    .catch(error => res.status(500).json(error))
}
