const Sequelize = require('sequelize');
const DB = require('../db/db');
const user = DB.define('users', {
    name: {
        type: Sequelize.STRING
    },
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    pass: {
        type: Sequelize.STRING
    },
    type: {
        type: Sequelize.INTEGER,
        primaryKey: true
    }
}, {
    timestamps: false
});
user.sync({force: false, logging: false});
exports.getAllUser = function() {
    return user.findAll();
};
exports.findIdUsers = function(ids) {
    return user.findAll({
        where: {
            id: ids
        }
    });
};

exports.findUser = function(id) {
    return user.findOne({
        where: {
            id
        }
    });
};

exports.addUser = function(name, id, pass, type) {
    return user.create({
        name,
        pass,
        id,
        type
    });
};
exports.deleteUser = function(id) {
    return user.destroy({
        where: {
            id
        }
    })
};
exports.modifyPass = function(id, pass) {
    return user.update({
        pass
    }, {
        where: {
            id
        }
    })
}