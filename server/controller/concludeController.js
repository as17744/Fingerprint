const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const excelPort = require('excel-export');
const student = require('../schema/students');
const records = require('../schema/records');
const users = require('../schema/user');
const classes = require('../schema/allClasses');
module.exports = async(ctx, next) => {
    const queryMonth = ctx.query.month;
    const uploadDir = path.join(__dirname, '../../', 'static/src/excel');
    const files =  fs.readdirSync(uploadDir);
    if (files.length > 0) {
        files.forEach(function(file){
            fs.unlinkSync(`${uploadDir}/${file}`); 
            console.log(`删除文件${uploadDir}/${file}成功`);
        });
    }
    const classId = ctx.query.id;
    const chosenClass = await classes.getCertainClass(classId);
    const myStudentsInf = await student.classStudents(classId);
    const myStudents = myStudentsInf.map((item) => {
        return item.id;
    });
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const day = date.getDate();
    const startArr = chosenClass[0].start.split(':');
    const endArr = chosenClass[0].end.split(':');
    const standardStart = new Date(year, month, day, +startArr[0], +startArr[1], +startArr[2]);
    const standardEnd = new Date(year, month, day, +endArr[0], +endArr[1], +endArr[2]);
    const searchM = queryMonth ? `${year}-${queryMonth}-` : `${year}-${month}-`;
    const studentsRecords = await records.getRecords(myStudents, searchM);
    const usersInf = await users.getAllUser();
    const details = _.map(myStudents, (id) => {
        const identityInfo = _.filter(studentsRecords, (item) => {
            return item.id === id;
        });
        let abnormal = 0;
        let duration = 0;
        let absence = 0;
        let rest = 0;
        _.map(identityInfo, (d) => {
            if (!d.start && !d.end) {
                absence ++;
            }
            if (!d.start || !d.end) {
                abnormal++;
            } else if (d.start && d.end) {
                if (d.start === d.end) {
                    rest++;
                }
                const startItem = d.start.split(':');
                const endItem = d.end.split(':');
                const start = new Date(year, month, day, +startItem[0], +startItem[1], +startItem[2]);
                const end = new Date(year, month, day, +endItem[0], +endItem[1], +endItem[2]);
                const hours = end.getTime() - start.getTime();
                if (start > standardStart || end < standardEnd) {
                    abnormal++;
                }
                duration += (hours / (1000 * 60 * 60));
            }
        });
        const obj = [];
        const userD = _.find(usersInf, (u) => {
            return u.id === id;
        });
        obj.push(userD.name);
        obj.push(`${Math.floor(duration)}`);
        obj.push(((identityInfo.length - absence) / identityInfo.length).toFixed(2));
        obj.push((abnormal / identityInfo.length).toFixed(2));
        obj.push(`${rest}`);
        return obj;
    });
    const conf = {};
    conf.cols = [{
        caption: '姓名',
        type: 'string',
        width: 40
    },
    {
        caption: '总时长',
        type: 'string',
        width: 20
    },
    {
        caption: '出勤率',
        type: 'string',
        width: 20
    },
    {
        caption: '异常率',
        type: 'string',
        width: 20
    },
    {
        caption: '请假天数',
        type: 'string',
        width: 20
    }];
    conf.rows = [].concat(details);
    const fileName = queryMonth ? `${chosenClass[0].name}${queryMonth}月考勤汇总` : `${chosenClass[0].name}${month}月考勤汇总`;
    const result = excelPort.execute(conf);
    const filePath = `${uploadDir}\\${fileName}.xlsx`;
    fs.writeFileSync(filePath, result, 'binary');
    ctx.body = {
        success: true,
        path: `http://local.zstu.com/src/excel/${fileName}.xlsx`
    }
    next();
}