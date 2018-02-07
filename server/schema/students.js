const Sequelize = require('sequelize');
const DB = require('../db/db');
const student = DB.define('student', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    clas: {
        type: Sequelize.STRING
    }
}, {
    timestamps: false
});
student.sync({force: false, logging: false});
exports.addStudent = function(id, clas) {
    return student.create({
        id,
        clas
    })
};