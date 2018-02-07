const Sequelize = require('sequelize');
const DB = require('../db/db');

const allClasses = DB.define('classes', {
    name: {
        type: Sequelize.STRING
    },
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    }
}, {
    timestamps: false
})
allClasses.sync({force: false, logging: false});

exports.getClasses = function() {
    return allClasses.findAll();
}