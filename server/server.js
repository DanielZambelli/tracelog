const express = require('express')
const server = express()
const verifyBodyKeys = require('./utils/verifyBodyKeys')
const verifySiid = require('./utils/verifySiid')

server.use(require('cors')())
server.use(express.json())
server.use(require('cookie-parser')(process.env.SECRET))
server.use(express.static('public'))
server.use('/api/*', verifySiid)

/**
 * Verifies the secret and returns a Bearer token allowing subsequent requests to access api resources when Authorization header is set to: Bearer token-xxxxxx.\
 * Accepts content-type: application/json.\
 * Returns json response:
 *  * 200 OK { token: xxxxxxxxxx }
 *  * 403 FORBIDDEN if the secret did not checkout
 * @namespace POST /auth
 * @bodyparam {string} secret - service instance sercret encoded in base64
 */
server.post('/auth', verifyBodyKeys(['secret']), require('./controllers/postAuth'))

/**
 * Creates a log within the service instance.\
 * Requires authorisation @see POST /auth\
 * Accepts content-type: application/json.\
 * Returns response: 200 OK
 * @namespace POST /api/log
 * @bodyparam {string} type - error, message, warning
 * @bodyparam {string} data - the data that the log should include
 * @bodyparam {string} cat - category to make the log easily identifiable, for example "payment"
 */
server.post('/api/log', verifyBodyKeys(['type', 'data', 'cat']), require('./controllers/postLog'))

/**
 * Get latest 1500 logs from the service instance ordered by latest first.\
 * Requires authorisation @see POST /auth\
 * Accepts content-type: application/json.\
 * Returns response: 200 OK with json array of logs
 * @namespace GET /api/log
 */
server.get('/api/logs', require('./controllers/getLogs'))

server.listen(process.env.PORT, () => {
  console.log(`server listning on port ${process.env.PORT}`)
})
