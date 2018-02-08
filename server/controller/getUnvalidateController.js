const teacher = require('../schema/teacher');
module.exports = async(ctx, next) => {
    const list = await teacher.getUnvalidate();
    ctx.body = {
        success: true,
        data: list
    }
    next();
}