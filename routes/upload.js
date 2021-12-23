const multer = require('koa-multer') //文件上传组件  
const fs = require('fs')
const path = require('path')

const router = require('koa-router')()
router.prefix('/upload')


var storage = multer.diskStorage({
    //文件保存路径
    destination: function (req, file, cb) {
        const date = new Date()
        const year = date.getFullYear()
        const month = date.getMonth()
        const day = date.getDate()

        const dir = "public/uploads/" + year + month + day
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, {
                recursive: true
            })
        }
        cb(null, dir)
    },
    //修改文件名称
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
})


//加载配置
var upload = multer({
    storage: storage
});


router.post('/img', upload.single('file'), async ctx => {
    const path = ctx.request.origin + ctx.req.file.destination.replace('public', '') + '/' + ctx.req.file.filename
    ctx.body = {
        path
    }
})

router.post('/goodsimg', upload.single('goods-img'), async ctx => {
    const path = ctx.request.origin + ctx.req.file.destination.replace('public', '') + '/'  + ctx.req.file.filename
    ctx.body = {
        path
    }
})


module.exports = router