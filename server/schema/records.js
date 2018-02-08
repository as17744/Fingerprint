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

exports.insertRecords = function(data) {
    return records.bulkCreate(data);
};