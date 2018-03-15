const records = require('../schema/records');
module.exports = async(ctx, next) => {
    const punchRecords = JSON.parse(ctx.query.records);
    const date = new Date();
    const year = date.getFullYear(); 
    const month = date.getMonth()+1;
    const day = date.getDate();
    const today = `${year}-${month}-${day}`;
    const noon = new Date(year, month, day, 12, 0, 0);
    punchRecords.map((item) => {
        item.id = +item.id;
        item.date = today;
        let onlyPunchTime = 0;
        if (item.start) {
            item.start = item.start.split(' ')[1];
            const frag = item.start.split(':');
            onlyPunchTime = new Date(year, month, day, +frag[0], +frag[1], +frag[2]);
        } else {
            item.start = '';
        }
        if (item.end) {
            item.end = item.end.split(' ')[1];
        } else if (item.start && onlyPunchTime > noon){
            item.end = item.start;
            item.start = '';
        } else {
            item.end = '';
        }
    });
    try {
        await records.insertRecords(punchRecords);
        ctx.body = {
            success: true,
            message: '数据导入成功'
        }
    } catch(e) {
        ctx.body = {
            success: false,
            message: '发生错误'
        }
    }
}