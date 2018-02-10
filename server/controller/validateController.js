const teacher = require('../schema/teacher');
const classes = require('../schema/allClasses');
module.exports = async(ctx, next) => {
    const id = ctx.query.id;
    const teacherInf = await teacher.check(id);
    const classesArr = JSON.parse(teacherInf.classes);
    const classInf = await classes.getCertainClass(classesArr);
    const valid = classInf.some((item) => {
        return item.teacher;
    });
    if (!valid) {
        await classes.setCharge(id, classesArr);
        await teacher.validate(id);
        ctx.body = {
            success: true,
            message: '成功授权'
        }
    } else {
        ctx.body = {
            success: false,
            message: '班级信息有误'
        }
    }
}