const user = require('../schema/user');
module.exports = async(ctx, next) => {
    const id = ctx.query.id;
    const pass = ctx.query.pass;
    const result = await user.findUser(id);
    if (!result) {
        ctx.body = {
            success: false,
            message: '账号不存在'
        }
    } else if (pass !== result.pass) {
        ctx.body = {
            success: false,
            message: '密码错误'
        }
    } else {
        ctx.session.id = id;
        ctx.session.type = result.type;
        ctx.session.name = result.name;
        ctx.body = {
            success: true,
            message: '登陆成功',
            type: ctx.session.type
        }
    }
    next();
}