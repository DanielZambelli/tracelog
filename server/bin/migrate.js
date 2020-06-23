const migrate = async () => {
  const argString = process.argv.join(' ')
  const force = argString.indexOf('force') !== -1

  const modelsToMigrate = [
    require('../models/tracelogs'),
    require('../models/serviceInstances'),
  ]

  const models = Object.values(modelsToMigrate)
  const modelNames = models.map(ref => ref.name)
  console.log('Migrating models', force ? 'with FORCE' : '')
  modelNames.forEach(name => console.log('+ '+name))
  for(const model of models){
    await model.sync({force})
  }
  process.exit()
}
migrate()
