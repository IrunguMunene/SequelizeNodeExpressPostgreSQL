const Sequelize = require('sequelize');
const dbContext = require('../config/dbcontext');

const Gig = dbContext.define('gig', {
    title: {
        type: Sequelize.STRING
    },
    technologies: {
        type: Sequelize.STRING
    },
    budget: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    contact_email: {
        type: Sequelize.STRING
    },
    createdAt: {
        type: Sequelize.DATE
    },
    updatedAt: {
        type: Sequelize.DATE
    }
});

module.exports = Gig;
