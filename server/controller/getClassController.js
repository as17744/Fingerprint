module.exports = async(ctx, next) => {
    ctx.body = {
        success: true,
        message: 'Hello'
    };
    next();
}