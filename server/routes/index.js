const routes = [
  {
    doc: 'get logs from within the service instance',
    method: 'get',
    path: '/api/logs',
    handlers: [
      (req,res) => {
        require('./models/tracelogs')
          .findAll({
            // TODO: siid
            // where: { siid },
            order: [['id', 'DESC']], limit: 1500
          })
          .then(results => res.json(results))
          .catch(error => res.status(500).json(error))
      }
    ]
  },
  {
    doc: 'create a single log within the service instance',
    method: 'post',
    path: '/api/log',
    handlers: [
      (req,res) => {
        // TODO: siid
        const { type, data, cat, siid } = req.body
        require('./models/tracelogs')
          .create({ siid, type, cat, data })
          .then(result => res.json(result))
          .catch(error => res.status(500).json(error))
        // TODO: emit on socket
      }
    ]
  }
]

routes.push({
  doc: 'get documentation',
  method: 'get',
  path: '/api/doc',
  handlers: [
    (req,res) => {
      console.log(routes)
      const docs = routes.map(({handlers, ...rest}) => rest)
      res.json(docs)
    }
  ]
})

routes.push({
  doc: 'get documentation',
  method: 'get',
  path: '/doc',
  handlers: [
    (req,res) => {
      const docs = routes.map(({handlers, ...rest}) => rest)
      const html = docs.map(route => `
        <div>
          <h1>${route.method}: ${route.path}</h1>
          ${route.doc}
        </div><br/><br/>
      `)
      console.log('>>>>>', routes, html)
      res.send(html.join(''))
    }
  ]
})

routes.push({
  doc: 'get single page app client',
  method: 'get',
  path: '/*',
  handlers: [
    // (req, res) => res.sendFile('./public/index.html')
  ]
})

module.exports = routes




// path
// handlers
// docs

// server.get('/api/logs', middelwear, requreParsm['....'] require('controller/...'))
// server.get('/api/si', middelwear, controller.ref.do)
// server.get('/docs', middelwear, controller.ref.do)
// server.get('/*', middelwear, controller.ref.do)


const routing = [
  ['get','/api/logs', ['middlewear', require('...').handler], 'get logs from api', require('...').docArgs],
  ['get','/api/logs', ['middlewear', require('entity').make('tracelogs,instance,user')], 'get logs from api', require('...').docArgs],

  {
    method: 'get',
    path: '/api/logs',
    middleware: ['...'],
    ...require('...'), //handler, requiredParams
    doc: '...',
    docOptions: '...',


  }
]
