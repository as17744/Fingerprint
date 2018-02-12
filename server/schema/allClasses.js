const Sequelize = require('sequelize');
const DB = require('../db/db');

const allClasses = DB.define('classes', {
    name: {
        type: Sequelize.STRING
    },
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    teacher: {
        type: Sequelize.INTEGER
    },
    start: {
        type: Sequelize.STRING
    },
    end: {
        type: Sequelize.STRING
    }
}, {
    timestamps: false
})
allClasses.sync({force: false, logging: false});

exports.getClasses = function() {
    return allClasses.findAll();
};
exports.getCertainClass = function(ids) {
    return allClasses.findAll({
        where: {
            id: ids
        }
    });
};
exports.getTeacherClass = function(id) {
    return allClasses.findAll({
        where: {
            teacher: id
        }
    });
};
exports.setCharge = function(teacher, arr) {
    return allClasses.update({
        teacher
    }, {
        where: {
            id: arr
        }
    });
};
exports.setTime = function(id, start, end) {
    return allClasses.update({
        start,
        end
    }, {
        where: {
            id
        }
    })
};