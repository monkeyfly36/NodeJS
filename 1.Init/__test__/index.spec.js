// 1.helloworld
// test('测试 helloworld', () => {
//   const ret = require('../index')
//   expect(ret).toBe('helloworld')
// })

// 2.文件名生成
// test('测试 文件名生成', () => {
//   const { getTestFileName } = new(require('../index'))()
//   const ret = getTestFileName('/abc/class.js')
//   expect(ret).toBe('/abc/__test__/class.spec.js')
// })

// 3.测试代码生成
// test('测试 代码生成', () => {
//   const { genTestSource } = new(require('../index'))()
//   const ret = genTestSource('func', 'class')
//   expect(ret).toBe(`
// test('TEST func', () => {
//   const func = require('../class')
//   const ret = func()
//   expect(ret).toBe('test code')
// })
//   `
//   )
// })

// 4.生成Jest文件
const fs = require('fs')
test('集成测试 生成Jest文件', () => {
  // 准备环境
  // 删除测试环境
  fs.rmdirSync(__dirname + '/data/__test__', { recursive: true })
  const src = new(require('../index'))()
  src.genJestSource(__dirname + '/data')
})