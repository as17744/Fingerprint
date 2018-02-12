const getClasses = require('../schema/allClasses');
module.exports = async(ctx, next) => {
    const type = ctx.query.type;
    if (type) {
        const id = ctx.session.id;
        const classes = await getClasses.getTeacherClass(id);
        ctx.body = {
            success: true,
            message: '',
            data: classes
        };
    } else {
        const classes = await getClasses.getClasses();
        ctx.body = {
            success: true,
            message: '',
            data: classes
        };
    }
    next();
}