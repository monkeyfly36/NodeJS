const logTime = name => {
  console.log(`Log-${name} ` + new Date().toLocaleDateString())
}
// 1.callback
// exports.callback = () => {
//   setTimeout(() => {
//     logTime('callback1')
//     setTimeout(() => {
//       logTime('callback2')
//     },100)
//   },100)
// }

// 2.Promise
// const promise = (name, delay = 100) => new Promise(resolve => {
//   setTimeout(() => {
//     logTime(name)
//     resolve()
//   }, delay)
// })
// exports.promise = () => {
//   promise('Promise 1')
//     .then(promise('Promise 2')) // 注意写法: 无res =>
//     .then(promise('Promise 3'))
// }

// 3.Generator
// const promise = (name, delay = 100) => new Promise(resolve => {
//   setTimeout(() => {
//     logTime(name)
//     resolve()
//   }, delay)
// })
// exports.generator = () => {
//   const generator = function* (name) {
//     yield promise(name+1)
//     yield promise(name+2)
//     yield promise(name+3)
//   }
//   let co = generator => { // 迭代操作器??
//     if (it = generator.next().value) {
//       it.then(res => {
//         co(generator)
//       })
//     } else { // 执行完成
//       return
//     }
//   }
//   co(generator('Co-Generator'))
// }

// 4.async/await
// const promise = (name, delay = 100) => new Promise(resolve => {
//   setTimeout(() => { 
//     logTime(name)
//     resolve() 
//   }, delay)
// })
// exports.asyncAwait = async () => {
//   await promise('Async Await 1')
//   await promise('Async Await 2')
//   await promise('Async Await 3')
//   await promise('Async Await 4')
// }

// 5.事件监听
exports.event = async () => {
  const asyncFun = (name, delay = 100) => event => {
    setTimeout(() => { 
      logTime(name)
      event.emit('end') // 发布
    }, delay)
    return event
  }

  const arr = [asyncFun('event 1'), asyncFun('event 2'), asyncFun('event 3')]

  const { EventEmitter } = require('events')
  const event = new EventEmitter()
  let i = 0
  event.on('end', () => i < arr.length && arr[i++](event)) // 判断数组是否越界-->订阅，emit触发时执行
  event.emit('end') // 第一次触发--发布
}

