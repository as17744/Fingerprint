const _ = require('lodash');
const records = require('../schema/records');
const students = require('../schema/students');
const classes = require('../schema/allClasses');
module.exports = async(ctx, next) => {
    const id = ctx.session.id;
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const day = date.getDate();
    const searchM = `${year}-${month}-`;
    const selfRecord = await records.getRecords(id, searchM);
    const recordInf = _.map(selfRecord, (item) => {
        const obj = {};
        obj.day = +item.date.match(/\d*-\d*-(\d*)/)[1];
        if (item.start) {
            const start = item.start.split(':');
            obj.start = new Date(year, month, day, +start[0], +start[1], +start[2]);
        } else {
            obj.start = '';
        }
        if (item.end) {
            const end = item.end.split(':');
            obj.end = new Date(year, month, day, +end[0], +end[1], +end[2]);
        } else {
            obj.end = '';
        }
        return obj;
    });
    const dayNum = +new Date(year, month, 0).getDate();
    const selfInf = await students.findStudent(id);
    const clas = +selfInf.clas;
    const classInf = await classes.getCertainClass(clas);
    const startItem = classInf[0].start.split(':');
    const endItem = classInf[0].end.split(':');
    const standardStart = new Date(year, month, day, +startItem[0], +startItem[1], +startItem[2]);
    const standardEnd = new Date(year, month, day, +endItem[0], +endItem[1], +endItem[2]);
    const monthArr = [];
    for (let i = 1; i <= dayNum; i++) {
        const validDay = _.find(recordInf, (j) => {
            return j.day === i;
        });
        if (validDay) {
            if (!validDay.start || !validDay.end) {
                monthArr.push(0);
            } else {
                if (validDay.start <= standardStart && validDay.end >= standardEnd) {
                    monthArr.push(1);
                } else {
                    monthArr.push(0);
                }
            }
        } else {
            monthArr.push('');
        }
    }
    ctx.body = {
        success: true,
        data: monthArr
    };
    next();
}