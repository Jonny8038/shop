const router = require('koa-router')()


const {
    addgoods
} = require('../controller/goods')

router.prefix('/api')



//添加商品
router.post('/addgoods', addgoods)



module.exports = router