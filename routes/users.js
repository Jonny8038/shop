const router = require('koa-router')()


const {
  login,
  register,
  verify,
  updataPwd,
  findUserinfo,
  updataUserinfo,
  findAllusers,
  deleteUser
} = require('../controller/users')

router.prefix('/api')


//用户登录
router.post('/login', login)

// 用户注册
router.post('/register', register)

// 用户认证
router.post('/verify', verify)

// 用户修改密码
router.post('/updataPwd', updataPwd)

// 查找单个用户信息
router.post('/findUserinfo', findUserinfo)

// 查找所有用户信息
router.get('/findAllusers', findAllusers)

//修改用户信息
router.post('/updataUserinfo', updataUserinfo)

//删除用户
router.post('/deleteUser', deleteUser)


module.exports = router