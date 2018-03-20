const Sequelize = require('sequelize');
const DB = require('../db/db');
const vacation = DB.define('vacations', {
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
    reason: {
        type: Sequelize.STRING
    },
    status: {
        type: Sequelize.INTEGER,
        primaryKey: true
    }
}, {
    timestamps: false
});
vacation.sync({force: false, logging: false});
exports.findAllpersonReq = function(id) {
    return vacation.findAll({
        where: {
            id
        }
    });
};
exports.findPersonReq = function(id) {
    return vacation.findAll({
        where: {
            status: 0,
            id
        }
    });
};
exports.findDateRequests = function(date) {
    return vacation.findAll({
        where: {
            date,
            status: 1
        }
    });
};
exports.addVacation = function(id, name, date, reason) {
    return vacation.create({
        id,
        date,
        name,
        reason,
        status: 0
    })
};
exports.validateVacation = function(id, date) {
    return vacation.update({
        status: 1
    }, {
        where: {
            id,
            date
        }
    });
};
exports.deleteRequest = function(id, date) {
    return vacation.destroy({
        where: {
            id,
            date
        }
    })
};