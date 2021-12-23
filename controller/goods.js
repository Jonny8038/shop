const {
    Goods
} = require('../models/index')




const addgoods = async (ctx) => {

    let {
        goodsname,
        price,
        desc,
        imageArr,
        categorys
    } = ctx.request.body



    await Goods.create({
        goodsname,
        price,
        desc,
        imageArr,
        categorys
    }).then(res => {
        ctx.body = {
            res
        }
    })
    // ctx.body = {
    //     data: {
    //         goodsname,
    //         price,
    //         desc,
    //         imageArr,
    //         categorys
    //     },
    //     code: 200
    // }

    //     await Goods.create({
    //         goodsname,
    //         price,
    //         category,
    //         desc,
    //         imageArr
    //     }).then(res => {
    //         ctx.body = {
    //             res
    //         }
    //     })
}



module.exports = {
    addgoods
}