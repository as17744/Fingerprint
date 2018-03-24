const _ = require('lodash');
const teachers = require('../schema/teacher');
const students = require('../schema/students');
const users = require('../schema/user');
const records = require('../schema/records');
const classesDate = require('../schema/allClasses');
const timeCompare = require('../common/timeCompare');
module.exports = async(ctx, next) => {
    const clas = ctx.query.clas;
    const type = ctx.query.type;
    const flag = ctx.query.num;
    const sign = ctx.query.sign;
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const day = date.getDate();
    const searchM = `${year}-${month}-`;

    const userId = ctx.session.id; // 获取教师id
    const teacherInf = await teachers.check(userId); // 教师信息
    const classes = JSON.parse(teacherInf.classes); // 教师所负责班级
    const dutyStudents = await students.classStudents(classes); //教师负责的所有学生
    const ids = dutyStudents.map((item) => item.id); // 负责所有学生的学号
    const monthRecords = await records.getRecords(ids, searchM); // 本月所有学生打卡记录
    const classInf = await classesDate.getCertainClass(classes); //教师负责的所有班级的信息
    const len = monthRecords.length; //总打卡数量
    const usersInf = await users.findIdUsers(ids);
    let storeArr = [];
    let punchTime = 0;
    dutyStudents.map((p) => {
        let absence = 0;
        let rest = 0;
        let abnormal = 0;
        const obj = {};
        obj.clas = p.clas;
        obj.id = p.id;
        const studentName = _.filter(usersInf, (u) => u.id === obj.id)[0].name;
        obj.name = studentName;
        const classBelong = _.filter(classInf, (clas) => clas.id === +obj.clas); //该学生所属班级的信息
        obj.className = classBelong[0].name;
        const startItems = classBelong[0].start.split(':');
        const endItems = classBelong[0].end.split(':');
        // 该班级的考勤时间
        const standardStart = new Date(year, month, day, +startItems[0], +startItems[1], +startItems[2]);
        const standardEnd = new Date(year, month, day, +endItems[0], +endItems[1], +endItems[2]);
        const personInf = _.filter(monthRecords, (record) => record.id === p.id);
        personInf.map((dItem) => {
            punchTime++;
            if (!dItem.start && !dItem.end) {
                absence++;
                abnormal++;
            } else if (!dItem.start || !dItem.end) {
                abnormal++;
            } else if (dItem.start && dItem.end && dItem.end === dItem.start) {
                rest++;
            } else {
                const earlier = timeCompare.timeCompare(dItem.start, standardStart);
                const later = !timeCompare.timeCompare(dItem.end, standardEnd);
                if (!earlier || !later) {
                    abnormal++;
                }
            }
        });
        obj.abnormal = abnormal;
        obj.rest = rest;
        obj.absence = absence;
        storeArr.push(obj);
    });
    const days = len / ids.length;
    let dataArr = [];
    if (clas && type) {
        dataArr = dataArr.concat(_.filter(storeArr, (a) => {
            if (+sign === 1) {
                return (a.clas === clas) && a[type] <= flag;
            } else if (+sign === 2) {
                return (a.clas === clas) && a[type] >= flag;
            }
        }));
    } else if (clas && !type) {
        dataArr = dataArr.concat(_.filter(storeArr, (a) => a.clas === clas));
    } else if (!clas && type) {
        dataArr = dataArr.concat(_.filter(storeArr, (a) => {
            if (+sign === 1) {
                return a[type] <= flag;
            } else if (+sign === 2) {
                return a[type] >= flag;
            } 
        }));
    } else {
        dataArr = dataArr.concat(storeArr);
    }
    ctx.body = {
        success: true,
        days,
        data: dataArr
    }
}