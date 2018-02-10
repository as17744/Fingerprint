const users = require('../schema/user');
const teacher = require('../schema/teacher');
module.exports = async(ctx, next) => {
    const id = ctx.query.id;
    await users.deleteUser(id);
    await teacher.deleteTeacher(id);
    ctx.body = {
        success: true,
        message: '已经删除该用户'
    }
};