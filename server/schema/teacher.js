const Sequelize = require('sequelize');
const DB = require('../db/db');
const teacher = DB.define('teacher', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    classes: {
        type: Sequelize.STRING
    },
    name: {
        type: Sequelize.STRING
    },
    status: {
        type: Sequelize.INTEGER
    }
}, {
    timestamps: false
});
teacher.sync({force: false, logging: false});
exports.getUnvalidate = function() {
    return teacher.findAll({
        where: {
            status: 0
        }
    });
};
exports.addTeacher = function(id, name, classes) {
    return teacher.create({
        id,
        name,
        classes,
        status: 0
    })
};
exports.validate = function(id) {
    return teacher.update({
        status: 1
    }, {
        where: {
            id
        }
    })
};