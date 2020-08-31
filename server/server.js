const express = require('express')
const server = express()
const verifyBodyKeys = require('./utils/verifyBodyKeys')
const verifySiid = require('./utils/verifySiid')

server.use(require('cors')())
server.use(express.json())
server.use(require('cookie-parser')(process.env.SECRET))
server.use(express.static('public'))
server.use('/api/*', verifySiid)

server.post('/auth', verifyBodyKeys(['secret']), require('./controllers/postAuth'))
server.post('/api/log', verifyBodyKeys(['type', 'data', 'cat']), require('./controllers/postLog'))
server.get('/api/logs', require('./controllers/getLogs'))

server.listen(process.env.PORT, () => {
  console.log(`server listning on port ${process.env.PORT}`)
})
