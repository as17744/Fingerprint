const Sequelize = require('sequelize');
const DB = require('../db/db');
const records = DB.define('records', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    date: {
        type: Sequelize.STRING,
        primaryKey: true
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
records.sync({force: false, logging: false});
exports.getRecords = function(ids, month) {
    return records.findAll({
        where: {
            id: ids,
            date: {
                $like: `${month}%`,
            }
        }
    })
};
exports.insertRecords = function(data) {
    return records.bulkCreate(data);
};
exports.modifyRecord = function(id, date, start, end) {
    return records.update({
        start,
        end
    }, {
        where: {
            id,
            date
        }
    })
};
exports.vacate = function(id,date) {
    return records.update({
        start: '0:0:0',
        end: '0:0:0'
    }, {
        where: {
            id,
            date
        }
    })
};
exports.findARecord = function(id, date) {
    return records.findOne({
        where: {
            id,
            date
        }
    })
};
exports.killRecords = function(date) {
    return records.destroy({
        where: {
            date
        }
    })
};