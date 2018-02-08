const student = require('../schema/students');
module.exports = async(ctx, next) => {
    const students = await student.getStudents();
    const ids = students.map((item) => {
        return '' + item.id;
    });
    ctx.body = {
        success: true,
        data: ids
    }
    next();
}