const vacation = require('../schema/vacation');
const records = require('../schema/records');
const teachers = require('../schema/teacher');
const request = require('../schema/request');
const students = require('../schema/students');
module.exports = async(ctx, next) => {
    const type = ctx.query.type; // type为1的时候，数据存入数据库
    const name = ctx.session.name;
    const id = ctx.session.id;
    if (+type === 1) {
        const reason = ctx.query.reason;
        const date = ctx.query.date;
        try {
            await vacation.addVacation(id, name, date, reason);
            ctx.body = {
                success: true,
                message: '请假申请发起成功'
            }
        } catch (e) {
            ctx.body = {
                success: false,
                message: '请勿重复请求'
            }
        }
    } else if (+type === 2) {
        // 2的时候为批准
        const validateId = ctx.query.id;
        const validateDate = ctx.query.date;
        const existRecord = await records.findARecord(validateId, validateDate);
        if (existRecord) {
            await records.vacate(validateId, validateDate);
        }
        await vacation.validateVacation(validateId, validateDate);
        ctx.body = {
            success: true,
            message: '批准该同学请假'
        }
    } else if (+type === 3) {
        const id = ctx.session.id;
        const teacherInf = await teachers.check(id);
        const classIds = JSON.parse(teacherInf.classes);
        const studentIds = await students.classStudents(classIds);
        const ids = [];
        studentIds.map((item) => {
            ids.push(item.id);
        });
        const reqList = await vacation.findPersonReq(ids);
        ctx.body = {
            success: true,
            reqList
        }
    } else if (+type === 4) {
        const validateId = ctx.query.id;
        const validateDate = ctx.query.date;
        const existRecord = await records.findARecord(validateId, validateDate);
        await vacation.deleteRequest(validateId, validateDate);
        ctx.body = {
            success: true,
            message: '已经拒绝本次请求'
        }
    } else if (+type === 5) {
        const id = ctx.session.id;
        const reqList = await vacation.findAllpersonReq(id);
        ctx.body = {
            success: true,
            reqList
        }
    }
};