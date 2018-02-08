const user = require('../schema/user');
module.exports = async(ctx, next) => {
    const pass = ctx.query.pass;
    const id = +ctx.session.id;
    try {
        await user.modifyPass(id, pass);
        ctx.body = {
            success: true,
            message: '密码修改成功'
        }
    } catch(e) {
        ctx.body = {
            success: false,
            message: '出错啦'
        }
    }
};