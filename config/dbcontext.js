const Sequelize = require('sequelize');

const dbContext = new Sequelize('codegig', 'postgres', '#*Y3shu@*#', {
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: 0,

    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

module.exports = dbContext;