const records = require('../schema/records');
module.exports = async(ctx, next) => {
    const date = ctx.query.date;
    await records.killRecords(date);
    ctx.body = {
        success: true,
        message: '今日数据已删除'
    }
}
