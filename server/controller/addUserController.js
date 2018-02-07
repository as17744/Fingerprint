const user = require('../schema/user');
const student = require('../schema/students');
const teacher = require('../schema/teacher');
module.exports = async(ctx, next) => {
    const name = ctx.query.name;
    const id = ctx.query.id;
    const pass = ctx.query.pass;
    const type = ctx.query.type;
    const classes = ctx.query.classes;
    const clas = ctx.query.clas;
    try {
        await user.addUser(name, id, pass, type);
        if (+type === 1) {
            await student.addStudent(id, clas);
        } else if (+type === 2) {
            await teacher.addTeacher(id, classes);
        }
        ctx.body = {
            success: true,
            message: '注册成功'
        };
    } catch(e) {
        ctx.body = {
            success: false,
            message: '该账号已经存在'
        };
    }
    next();
}