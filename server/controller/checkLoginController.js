module.exports = async(ctx, next) => {
    if (ctx.session.id) {
        ctx.body = {
            success: true,
            name: ctx.session.name
        }
    } else {
        ctx.body = {
            success:false,
            message: '没有登陆态'
        }
    }
    next();
}