const getClasses = require('../schema/allClasses');
module.exports = async(ctx, next) => {
    const classes = await getClasses.getClasses();
    ctx.body = {
        success: true,
        message: 'Hello',
        data: classes
    };
    next();
}