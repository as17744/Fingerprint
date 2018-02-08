const teacher = require('../schema/teacher');
module.exports = async(ctx, next) => {
    const id = ctx.query.id;
    await teacher.validate(id);
    ctx.body = {
        success: true,
        message: '成功授权'
    }
}