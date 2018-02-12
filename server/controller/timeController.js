const classes = require('../schema/allClasses');
module.exports = async(ctx, next) => {
    const id = ctx.query.id;
    const start = ctx.query.start;
    const end = ctx.query.end;
    await classes.setTime(id, start, end);
    ctx.body = {
        success: true,
        message: ''
    }
};