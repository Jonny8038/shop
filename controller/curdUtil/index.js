/**
 *处理修改的公共方法
 * @param {*} model 
 * @param {*} where 
 * @param {*} params 
 * @param {*} ctx 
 * @returns 
 */
const updata = (model, where, params, ctx) => (
    model.updateOne(where, params).then(res => {
        ctx.body = {
            result: res
        }
    }).catch(err => {
        ctx.body = {
            code: 400,
            msg: '修改失败',
        }
    })
)



/**
 * 处理删除的公共的方法
 * @param {*} model 
 * @param {*} where 
 * @param {*} ctx 
 * @returns 
 */
const del = (model, where, ctx) => (
    model.deleteOne(where).then((result) => {
        ctx.body = {
            res: result
        }
    }).catch((err) => {
        ctx.body = {
            code: 400,
            msg: err
        }
    })
)


/**
 * 处理添加的公共的方法
 * @param {*} model 
 * @param {*} params 
 * @param {*} ctx 
 * @returns 
 */
const add = (model, params, ctx) => (
    model.create(params).then((res) => {
        if (res) {
            ctx.body = {
                code: 200,
                msg: '添加成功',
                data: res
            }
        } else {
            ctx.body = {
                code: 300,
                msg: '添加失败',
            }
        }

    }).catch((err) => {
        ctx.body = {
            code: 400,
            errmsg: err,
        }
    })
)



/**
 * 处理查询所有的公共的方法
 * @param {*} model 
 * @param {*} ctx 
 * @returns 
 */
const find = (model, where, ctx) => (
    model.find(where).then(result => {
        ctx.body = {
            code: 200,
            data: result
        }
    }).catch(err => {
        ctx.body = {
            code: 400,
            msg: err
        }
    })
)


const findOne = (model, where, ctx) => (
    model.findOne(where).then((result) => {
        ctx.body = {
            code: 200,
            data: result
        }
    }).catch((err) => {
        ctx.body = {
            code: 400,
            msg: err
        }
    })
)


module.exports = {
    add,
    updata,
    find,
    findOne,
    del
}