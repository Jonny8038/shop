const {
    User
} = require('../models/index')


const jwt = require('jsonwebtoken')



/**
 * 用户登录接口
 * @param {*} ctx 
 */
const login = async (ctx) => {
    let {
        phone,
        pwd
    } = ctx.request.body

    await User.findOne({
            phone,
            pwd
        })
        .then(rel => {
            if (rel === null || rel === 'null') {
                ctx.body = {
                    code: 400,
                    msg: '该用户未注册'
                }
            } else {
                let token = jwt.sign({
                    phone: rel.phone,
                    _id: rel._id
                }, 'mybooks', {
                    expiresIn: 3600 * 24 * 7
                })

                ctx.body = {
                    data: rel,
                    phone,
                    code: 200,
                    msg: '登录成功',
                    token
                }
            }
        })
        .catch(err => {
            ctx.body = {
                code: 500,
                msg: '登录失败'
            }
        })

}


/**
 * 用户注册接口
 * @param {*} ctx 
 */
const register = async (ctx) => {
    let {
        phone,
        pwd
    } = ctx.request.body

    let isRegister = false

    await User.findOne({
        phone
    }).then(rel => {
        if (rel) {
            isRegister = true
        }
    }).catch(err => {
        ctx.body = {
            err
        }
    })


    if (isRegister) {
        ctx.body = {
            code: 300,
            msg: '号码已被注册'
        }
        return
    }

    await User.create({
        phone,
        pwd
    }).then(rel => {
        if (rel) {
            ctx.body = {
                code: 200,
                msg: '注册成功'
            }
        } else {
            ctx.body = {
                code: 300,
                msg: '注册失败'
            }
        }
    }).catch(err => {
        ctx.body = {
            code: 500,
            msg: '注册失败'
        }
    })
}



/**
 * 用户认证
 * @param {*} ctx 
 */
const verify = async (ctx) => {
    let token = ctx.header.authorization
    token = token.replace("Bearer ", "")

    try {
        let result = jwt.verify(token, 'mybooks')
        await User.findOne({
            _id: result._id
        }).then((rel) => {
            if (rel) {
                ctx.body = {
                    code: 200,
                    msg: '认证成功',
                    userinfo: rel
                }
            } else {
                ctx.body = {
                    code: 300,
                    msg: '认证失败'
                }
            }
        }).catch((err) => {
            ctx.body = {
                code: 500,
                msg: '认证失败'
            }
        });
    } catch (error) {
        ctx.body = {
            code: 500,
            msg: '认证失败'
        }
    }
}


/**
 * 用户修改密码
 * @param {*} ctx 
 */
const updataPwd = async (ctx) => {
    let {
        phone,
        pwd
    } = ctx.request.body

    await User.updateOne({
        phone
    }, {
        pwd
    }).then(rel => {
        if (rel.modifiedCount > 0) {
            ctx.body = {
                code: 200,
                msg: '密码修改成功'
            }
        } else {
            ctx.body = {
                code: 300,
                msg: '密码修改失败'
            }
        }
    }).catch(err => {
        ctx.body = {
            code: 500,
            msg: '密码修改失败'
        }
    })
}



/**
 * 修改用户信息
 * @param {*} ctx 
 */
const updataUserinfo = async ctx => {
    let {
        phone,
        userinfo
    } = ctx.request.body
    await User.updateOne({
        phone
    }, {
        username: userinfo.username,
        avatar: userinfo.avatar,
        sex: userinfo.sex,
        email: userinfo.email,
        address: userinfo.address,
        role: userinfo.role,
        rank: userinfo.rank,
        vip: userinfo.vip
    }).then(rel => {
        if (rel.modifiedCount > 0) {
            ctx.body = {
                code: 200,
                msg: '修改成功',
                data: userinfo
            }
        } else {
            ctx.body = {
                code: 300,
                msg: '修改失败'
            }
        }
    }).catch(err => {
        ctx.body = {
            code: 500,
            msg: '修改失败'
        }
    })
}



/**
 * 查找单个用户信息
 * @param {*} ctx 
 */
const findUserinfo = async ctx => {
    let {
        phone
    } = ctx.request.body

    await User.findOne({
        phone
    }).then(rel => {
        ctx.body = {
            code: 200,
            data: rel,
            msg: '查询成功'
        }
    }).catch(err => {
        ctx.body = {
            err
        }
    });
}


/**
 *查询所有用户
 * @param {*} ctx 
 */
const findAllusers = async ctx => {
    // console.log(ctx.query.userinfo);
    let userinfo = ctx.query.userinfo
    let role = ''

    await User.findOne({
        phone: userinfo
    }).then(res => {
        console.log(res.rank);
        role = res.role
    })

    if (role === '普通管理员' || role === '超级管理员') {
        await User.find().then(rel => {
            ctx.body = {
                code: 200,
                data: rel,
                msg: '查询成功'
            }
        })
    } else if (role === '普通用户') {
        ctx.body = {
            code: 200,
            data: null,
            msg: '查询成功'
        }
    }
}


/**
 *删除用户
 * @param {*} ctx 
 */
const deleteUser = async ctx => {
    let {
        phone
    } = ctx.request.body
    await User.remove({
        phone: phone
    }).then(rel => {
        console.log(rel);
        if (rel.deletedCount > 0) {
            ctx.body = {
                code: 200,
                data: rel,
                msg: '删除成功'
            }
        } else {
            ctx.body = {
                code: 300,
                data: rel,
                msg: '删除失败'
            }
        }
    }).catch(err => {
        ctx.body = {
            code: 500,
            data: err,
            msg: '删除失败'
        }
    })
}

module.exports = {
    login,
    register,
    verify,
    updataPwd,
    updataUserinfo,
    findUserinfo,
    findAllusers,
    deleteUser
}