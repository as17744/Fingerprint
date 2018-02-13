const teacher = require('../schema/teacher');
module.exports = async(ctx, next) => {
    const type = ctx.query.type;
    const id = ctx.session.id;
    const check = await teacher.check(id);
    if (type) {
        ctx.body = {
            success: true,
            classes: check.classes
        } 
    } else {
        ctx.body = {
            success: true,
            status: check.status
        }
    }
    next();
}