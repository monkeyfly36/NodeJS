function updateTime() {
  this.timer = this.timer || setInterval(() => this.time = new Date().toUTCString(), 3000)
  return this.time
}

const http = require('http')
http.createServer((req, res) => {
  const { url } = req
  if(url === '/') {
    res.end(`
      <html>
        HTML Update Time: ${updateTime()}
        <script src='main.js'></script>
      </html>
    `)
  } else if(url === '/main.js') {
    const content = `document.writeln('<br>JS Update Time: ${updateTime()}')`
    // 强缓存
    // Expires--HTTP1.0
    // res.setHeader('Expires', new Date(Date.now() + 10 * 1000).toUTCString())
    // Catch-Control--HTTP1.1, 优先级>Expires, 单位:秒
    // res.setHeader('Cache-Control', 'max-age=20')

    // 协商缓存--A.约定时间, 命中返回304, 否则200;
    res.setHeader('Cache-Control', 'no-cache')
    // res.setHeader('last-modified', new Date().toUTCString())
    // if (new Date(req.headers['if-modified-since']).getTime() + 5*1000 > Date.now()) { //3s过期时间
    //   console.log('协商缓存命中...')
    //   res.statusCode = 304
    //   res.end()
    //   return
    // }
    // B.约定内容Etag
    const crypto = require('crypto')
    const hash = crypto.createHash('sha1').update(content).digest('hex')
    res.setHeader('Etag', hash)
    if (req.headers['if-none-match'] === hash) { //3s过期时间
      console.log('协商缓存命中...')
      res.statusCode = 304
      res.end()
      return
    }

    res.statusCode = 200
    res.end(content)
  } else if(url === '/favicon.ico') {
    res.end('')
  }
}).listen(3000, () => {
  console.log('HTTP Run at' + 3000)
})