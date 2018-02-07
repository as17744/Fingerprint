const Sequelize = require('sequelize');
const DB = require('../db/db');
const teacher = DB.define('teacher', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    classes: {
        type: Sequelize.STRING
    }
}, {
    timestamps: false
});
teacher.sync({force: false, logging: false});
exports.addTeacher = function(id, classes) {
    return teacher.create({
        id,
        classes
    })
}