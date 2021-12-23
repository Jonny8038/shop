const mongoose = require('mongoose')
/**
 * 用户规则
 */
const userSchema = new mongoose.Schema({
    phone: { //手机号
        type: Number,
        required: true
    },
    pwd: { //密码
        type: String,
        required: true,
        select: false
    },
    username: { //用户名
        type: String,
        default: '',
        max: 8
    },
    avatar: { //头像
        type: String,
        default: ''
    },
    sex: { //性别
        type: String,
        default: ''
    },
    email: { //邮箱
        type: String,
        default: ''
    },
    address: { //地址
        type: String,
        default: ''
    },
    rank: { //级别 1-3  3-最高
        type: Number,
        default: 1
    },
    role: { //角色
        type: String,
        default: '普通用户'
    },
    vip: {
        type: String,
        default: '否'
    }

})

/**
 * 商品
 */
const goodsSchema = new mongoose.Schema({
    goodsname: { //商品名
        type: String,
        required: true
    },
    price: { //价格
        type: Number,
        required: true
    },
    imageArr: { //商品图片
        type: Array,
        required: true
    },
    categorys: { //分类
        type: String,
        required: true
    },
    desc:{//简介
        type:String,
        required:true
    }

})


const User = mongoose.model('User', userSchema) //用户模型
const Goods = mongoose.model('Goods', goodsSchema) //商品模型

module.exports = {
    User,
    Goods
}