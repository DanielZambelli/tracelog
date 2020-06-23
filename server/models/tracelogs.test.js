const Tracelogs = require('./tracelogs')

describe(Tracelogs, () => {

  const TEST_ID = 'test-tracelogs-1'

  afterAll(async () => {
    await Tracelogs.destroy({ where: { siid: TEST_ID } })
  })

  it('requires siid', async () => {
    const ps = Tracelogs.build({ siid: undefined, type: 'message' }).save()
    await expect(ps).rejects.toThrow('notNull Violation: tracelogs.siid cannot be null')
  })

  it('validates type: bad', async () => {
    const ps = Tracelogs.build({ siid: TEST_ID, type: 'bad-type' }).save()
    await expect(ps).rejects.toThrow('type must be either of: error, warning or message')
  })

  const validTypes = ['message','error','warning']
  validTypes.forEach((type) => {
    it(`validates type: ${type}`, async () => {
      const res = await Tracelogs.build({ siid: TEST_ID, type }).save()
      expect(res.id).toBeDefined()
    })
  })

})
