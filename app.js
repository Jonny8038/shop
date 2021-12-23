const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const koajwt = require('koa-jwt')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors')

const users = require('./routes/users')
const goods = require('./routes/goods')
const upload = require('./routes/upload')

const MongodbConnect = require('./db/index')
MongodbConnect() //连接数据库

// error handler
onerror(app)

// 中间件
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))


//处理跨域的中间件
app.use(cors())

app.use(koajwt({
  secret: 'mybooks'
}).unless({
  path: [/^\/api\/login/, /^\/api\/register/]
}))


app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// 路由挂载
app.use(users.routes(), users.allowedMethods())
app.use(goods.routes(), goods.allowedMethods())
app.use(upload.routes(), upload.allowedMethods())

// 错误处理
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app