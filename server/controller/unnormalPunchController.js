const _ = require('lodash');
const records = require('../schema/records');
const students = require('../schema/students');
const classes = require('../schema/allClasses');
const timeCompare = require('../common/timeCompare');
module.exports = async(ctx, next) => {
    const id = ctx.session.id;
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const day = date.getDate();
    const searchM = `${year}-${month}-`;
    const recordsInf = await records.getRecords(id, searchM);
    const selfInf = await students.findStudent(id);
    const clas = +selfInf.clas;
    const classInf = await classes.getCertainClass(clas);
    const startItem = classInf[0].start.split(':');
    const endItem = classInf[0].end.split(':');
    const standardStart = new Date(year, month, day, +startItem[0], +startItem[1], +startItem[2]);
    const standardEnd = new Date(year, month, day, +endItem[0], +endItem[1], +endItem[2]);
    const noon = new Date(year, month, day, 12, 0, 0);
    const data = _.filter(recordsInf, (res) => {
        if (res.start && res.end) {
            const earlier = timeCompare.timeCompare(res.start, standardStart);
            const later = !timeCompare.timeCompare(res.end, standardEnd);
            if ((earlier && later) || res.start === res.end) {
                return false;
            }
            return true;
        } else {
            return true;
        }
    });
    ctx.body = {
        success: true,
        data
    }
    next();
}