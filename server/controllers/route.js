import express from 'express'
import tracelogs from './dbTracelogs'
import { requireFields } from '../../utils/exp/requireRequest'
import {
  getSIFromDB,
  getServiceInstanceFromRequestSecret
} from '../serviceInstance'
import { FROM_TRACELOG, sendMail } from '../../utils/mail'
import { io } from '../../utils/io'
import { Base64 } from 'js-base64'
const router = express.Router()

io.on('connection', socket => {
  socket.on('JOIN_TRACELOG_ROOM', payload => {
    const secretDecoded = payload.secret
    if(!secretDecoded) return socket.disconnect()
    socket.join(secretDecoded)
  })
})

// router.get(
//   '/api/logs',
//   getServiceInstanceFromRequestSecret,
//   async (req, res) => {
//     const { siid } = req.si
//     const logs = await tracelogs.findAll({
//       where: { siid },
//       order: [['id', 'DESC']],
//       attributes: ['type','cat','data','createdAt'],
//       limit: 1500
//     })

//     return res.json(logs)
//   }
// )

// SERVE REACT WEB APP
// router.use(express.static(`${__dirname}/build/`))
// router.get('/*', (req, res) => {
//   return res.sendFile(`${__dirname}/build/index.html`)
// })

router.post(
  '/api/verifySecret',
  requireFields(['secret']),
  async (req, res) => {
    let { secret } = req.fields
    secret = Base64.decode(secret)
    const si = await getSIFromDB(secret)
    return res.json({ valid: !!si })
  }
)

// router.post(
//   '/api/log',
//   getServiceInstanceFromRequestSecret,
//   requireFields(['type','data']),
//   async (req, res) => {
//     const { type, data, cat, notifyEmails } = req.fields
//     const { siid, secret } = req.si

//     // accept the log
//     if(!['error','warning','message'].includes(type))
//       return res.status(400).json({error: 'type must be either of error, warning or message'})

//     // save log to db and clean data for notification
//     const logRes = await tracelogs.create({ siid, type, cat, data })
//     const log = logRes.dataValues
//     log.data = JSON.parse(log.data)
//     delete log['updatedAt']
//     delete log['siid']
//     delete log['id']

//     // notify email
//     if(
//       notifyEmails &&
//       Array.isArray(notifyEmails) &&
//       notifyEmails.length > 0
//     ){
//       const subject = `${type} occurred`.toUpperCase()
//       const htmlMessage = `Your application posted a new ${type} log. <a href="https://danielzambelli.dk/tracelog/?sso=${secret}">Open Tracelog.</a>
//       <br><br><br>
//       <small>
//       ${JSON.stringify(log)}
//       </small>
//       <br><br><br>
//       Kindly <a href="https://danielzambelli.dk/tracelog">Tracelog</a>
//       `

//       for(const email of notifyEmails){
//         await sendMail(FROM_TRACELOG, email, subject, htmlMessage)
//       }
//     }

//     // notify connected socket clients
//     io.to(secret).emit('POST_LOG', log)

//     return res.status(200).json(log)
//   }
// )

export default router
