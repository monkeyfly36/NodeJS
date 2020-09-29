var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

// 响应用户发送消息
io.on('connection', function(socket) {
  console.log('a user connected')
  
  socket.on('chat message', msg => { // 订阅来自客户端的信息
    console.log('chat message', msg)
    io.emit('chat message', msg) // 广播所有人--必须服务器下发, 否则客户端收不到
  })
  socket.on('disconnect ', () => {
    console.log('disconnect...')
  })
})

http.listen(3000, () => {
  console.log('HTTP Runnind At 3000')
})