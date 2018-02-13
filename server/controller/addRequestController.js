const requests = require('../schema/request');
const students = require('../schema/students');
const classes = require('../schema/allClasses');
const users = require('../schema/user');
module.exports = async(ctx, next) => {
    const modifyDate = ctx.query.date;
    const start = ctx.query.start;
    const end = ctx.query.end;
    const id = ctx.session.id;
    const obj = {};
    const studentInf = await students.findStudent(id);
    const clas = +studentInf.clas;
    const classInf = await classes.getCertainClass(clas);
    const userInf = await users.findUser(id);
    obj.className = classInf[0].name;
    obj.classId = clas;
    obj.id = id;
    obj.date = modifyDate;
    obj.name = userInf.name;
    obj.start = start;
    obj.end = end;
    try {
        await requests.newRequest(obj);
        ctx.body = {
            success: true,
            message: ''
        }
    } catch(e) {
        ctx.body = {
            success: false,
            message: '请求已发起请勿重复请求'
        }
    }
    next();
}