const teacher = require('../schema/teacher');
module.exports = async(ctx, next) => {
    // const id = ctx.query.id;
    const id = ctx.session.id;
    const check = await teacher.check(id);
    ctx.body = {
        success: true,
        status: check.status
    }
    next();
}