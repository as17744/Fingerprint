const request = require('../schema/request');
const records = require('../schema/records');
const teachers = require('../schema/teacher');
exports.getRequest = async(ctx, next) => {
    const id = ctx.session.id;
    const teacherInf = await teachers.check(id);
    const classIds = JSON.parse(teacherInf.classes);
    const reqData = await request.getRequest(classIds);
    ctx.body = {
        success: true,
        message: '',
        data: reqData
    }
    next();
};
exports.allowReq = async(ctx, next) => {
    const id = ctx.query.id;
    const modifyDate = ctx.query.date;
    const start = ctx.query.start;
    const end = ctx.query.end;
    await records.modifyRecord(id, modifyDate, start, end);
    await request.deleteRequest(id, modifyDate);
    ctx.body = {
        success: true,
        message: ''
    };
    next();
};
exports.deleteRequest = async(ctx, next) => {
    const id = ctx.query.id;
    const modifyDate = ctx.query.date;
    await request.deleteRequest(id, modifyDate);
    ctx.body = {
        success: true,
        message: ''
    };
    next();
};