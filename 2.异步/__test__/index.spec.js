// 1.Callback
// test('Callback', done => {
  // const { callback } = require('../index')
//   callback()
//   // 延迟1s结束
//   setTimeout(done, 1000)
// })

// 2.Promise
// test('Promise', done => {
//   const { promise } = require('../index')
//   promise()
//   // 延迟1s结束
//   setTimeout(done, 1000)
// })

// 3.Generator
// test('Generator', done => {
//   const { generator } = require('../index')
//   generator()
//   // 延迟1s结束
//   setTimeout(done, 1000)
// })

// 4.async/await
// test('asyncAwait', done => {
//   const { asyncAwait } = require('../index')
//   asyncAwait()
//   // 延迟1s结束
//   setTimeout(done, 1000)
// })

// 5.event事件监听
test('event', done => {
  const { event } = require('../index')
  event()
  // 延迟1s结束
  setTimeout(done, 1000)
})