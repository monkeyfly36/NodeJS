
test('TEST func', () => {
  const func = require('../func.js')
  const ret = func()
  expect(ret).toBe('test code')
})
