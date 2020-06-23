module.exports = (req,res) => {
  require('../models/tracelogs')
    .findAll({
      where: { siid: req.siid },
      order: [['id', 'DESC']], limit: 1500
    })
    .then(results => res.json(results))
    .catch(error => res.status(500).json(error))
}
