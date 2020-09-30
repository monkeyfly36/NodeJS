const Koa = require('koa')
const router = require('koa-router')()
const static = require('koa-static')
const app = new Koa()
const axios = require('axios')
const querystring = require('querystring')

app.use(static(__dirname + '/'))

const config = {
  client_id: '789fb7bb7398db3e5dae',
  client_secret: 'c0ac66fe87dad055d32048eadfeb14c979779836'
}

router.get('/github/login', async ctx => {
  // 重定向第三方服务器
  let path = `https://github.com/login/oauth/authorize?client_id=${config.client_id}`
  // 跳转第三方服务器
  ctx.redirect(path)
})

router.get('/auth/github/callback', async ctx => {
  // 去第三方拿令牌
  const { code } = ctx.query
  const { client_id, client_secret } = config
  const params = {
    code,
    client_id,
    client_secret
  }

  // 换取服务器令牌
  let ret = await axios.post('https://github.com/login/oauth/access_token', params)
  const { access_token } = querystring.parse(ret.data)
  // 通过令牌访问服务器数据
  ret = await axios.get(`https://api.github.com/user?access_token=${access_token}`)
  ctx.body = `
    <h1>Hello ${ret.data.login}</h1>
    <img src='${ret.data.avatar_url}' alt='' />
  `
})

app.use(router.routes())
app.listen(7001, () => {
  console.log('Http Running At 7001')
})