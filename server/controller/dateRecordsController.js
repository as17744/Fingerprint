const records = require('../schema/records');
module.exports = async(ctx, next) => {
    const date = ctx.query.date;
    const dateRecords = await records.findDateRecord(date);
    ctx.body = {
        success: true,
        data: dateRecords
    }
    next();
};