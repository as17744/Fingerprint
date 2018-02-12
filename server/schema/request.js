const Sequelize = require('sequelize');
const DB = require('../db/db');

const request = DB.define('requests', {
    className: {
        type: Sequelize.STRING
    },
    classId: {
        type: Sequelize.INTEGER
    },
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    date: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },
    start: {
        type: Sequelize.STRING
    },
    end: {
        type: Sequelize.STRING
    }
}, {
    timestamps: false
});
request.sync({force: false, logging: false});
exports.getRequest = function(classId) {
    return request.findAll({
        where: {
            classId
        }
    });
};
exports.newRequest = function(data) {
    return request.create(data);
};
exports.deleteRequest = function(id, date) {
    return request.destroy({
        where: {
            id,
            date
        }
    });
};