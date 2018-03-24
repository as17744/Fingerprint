const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const excelPort = require('excel-export');
const student = require('../schema/students');
const records = require('../schema/records');
const classes = require('../schema/allClasses');
const users = require('../schema/user');
module.exports = async(ctx, next) => {
    const uploadDir = path.join(__dirname, '../../', 'static/src/excel');
    const files =  fs.readdirSync(uploadDir);
    if (files.length > 0) {
        files.forEach(function(file){
            fs.unlinkSync(`${uploadDir}/${file}`); 
            console.log(`删除文件${uploadDir}/${file}成功`);
        });
    }
    const queryMonth = ctx.query.month;
    const classId = ctx.query.id;
    const myStudentsInf = await student.classStudents(classId);
    const myStudents = myStudentsInf.map((item) => {
        return item.id;
    });
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const day = date.getDate();
    const searchM = queryMonth ? `${year}-${queryMonth}-` : `${year}-${month}-`;
    const studentsRecords = await records.getRecords(myStudents, searchM);
    const classInf = await classes.getCertainClass(classId);
    const startTime = classInf[0].start.split(':');
    const endTime = classInf[0].end.split(':');
    const standardStart = new Date(year, month, day, +startTime[0], +startTime[1], +startTime[2]);
    const standardEnd = new Date(year, month, day, +endTime[0], +endTime[1], +endTime[2]);
    const userInf = await users.getAllUser();
    const recordArr = _.map(studentsRecords, (item) => {
        const obj = {};
        obj.id = item.id;
        obj.name = _.find(userInf, (i) => {
            return i.id === obj.id;
        }).name;
        obj.date = +item.date.match(/\d*-\d*-(\d*)/)[1];
        if (!item.start || !item.end) {
            obj.status = '异常';
        } else {
            const s = item.start.split(':');
            const e = item.end.split(':');
            const itemStart = new Date(year, month, day, +s[0], +s[1], +s[2]);
            const itemEnd = new Date(year, month, day, +e[0], +e[1], +e[2]);
            if (itemStart <= standardStart && itemEnd >= standardEnd) {
                obj.status = '正常';
            } else {
                obj.status = '异常';
            }
        }
        return obj;
    });
    const fileName = queryMonth ? `${classInf[0].name}${queryMonth}月考勤报表` : `${classInf[0].name}${month}月考勤报表`;
    const m = new Date(year, month, 0);
    const dayNum = m.getDate();
    const conf = {};
    conf.cols = [{
        caption: '',
        type: 'string',
        width: 40
    }];
    for(let i=0; i < dayNum; i++) {
        const option = {};
        option.caption = `${i+1}`;
        option.type = 'string';
        option.width = 20;
        conf.cols.push(option);
    }
    const detailArray = _.map(myStudentsInf, (item) => {
        const arr = [];
        const name = _.find(userInf, (i) => {
            return i.id === item.id;
        }).name;
        arr.push(`${item.id}${name}`);
        const itemArray = _.filter(recordArr, (ii) => {
            return ii.id === item.id;
        });
        for (let j = 1; j <= dayNum; j++) {
            const dailyStatus = _.find(itemArray, (jj) => {
                return jj.date === j;
            });
            if (dailyStatus) {
                arr.push(dailyStatus.status);
            } else {
                arr.push('');
            }
        }
        return arr;
    });
    conf.rows = [].concat(detailArray);
    const result = excelPort.execute(conf);
    const filePath = `${uploadDir}\\${fileName}.xlsx`;
    fs.writeFileSync(filePath, result, 'binary');
    ctx.body = {
        success: true,
        path: `http://local.zstu.com/src/excel/${fileName}.xlsx`
    }
}