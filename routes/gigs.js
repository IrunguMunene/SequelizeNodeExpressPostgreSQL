/*
    Create a route for /gigs. This is the basic get all gigs api path. For all the api routes
    to establish follow the GetAll, GetById, GetByName,
    Add, Update and Delete API calls, all other functions
    should be added ones this have been added.
    Each API route should have its own route file, for example
    for gigs /gigs, for developers /developers etc each on its own file.
    All methods in this route file are part of the route /gigs
*/
const express = require('express');
const router = express.Router();
const dbContext = require('../config/dbcontext');
const Gig = require('../models/Gigs');
// The like operator is used for searching, in order to use
// Sequelize like operator, sequelize is required and sequelize
// operators. 
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// GetAll Gigs. route /gigs
router.get('/', (req, res) => 
    // Use findAll sequelize method.
    Gig.findAll().then(gigs => res.render('gigs', {
            gigs
        })).catch(err => console.log('An error occurred while retrieving records.', err))
);

// A /gigs/add which is a http get method that displays the
// add gigs form.
router.get('/add', (req, res) => res.render('add'));  

// Add a gig. Route /gigs/Add. A http post method, meaning it
// does an actual insert into the database.
router.post('/add', (req, res) => {
    
    // Use destructuring to pull out the data from the submitted
    // form body. The body will contain the name of the fields as 
    // per the id attribute of the input controls. Hence its advisable
    // to give the inputs id's that correspond to the model field names.
    // The bodyparser middleware added in app.js is responsible for
    // making this happen.
    let { title, technologies, budget, description, contact_email } = req.body;

    // Do some server validation. Initialize an errors array that will hold the errors.
    let errors = [];
    if(!title){
        errors.push({ text: 'Please add a title.' });
    }
    if(!technologies){
        errors.push({ text: 'Please add a technologies.' });
    }
    if(!budget){
        errors.push({ text: 'Please add a budget.' });
    }
    if(!description){
        errors.push({ text: 'Please add a description.' });
    }
    if(!contact_email){
        errors.push({ text: 'Please add a contact email.' });
    }

    if(errors.length > 0){
        res.render('add', {
            errors,
            title, 
            technologies, 
            budget, 
            description, 
            contact_email
        });
    }else{
        if(!budget){
            budget = 'Unknown';
        }else{
            budget = `$${budget}`;
        }
        
        // Make lowercase and remove spaces after the comma.
        technologies = technologies.toLowerCase().replace(/, /g,',');
        // Insert into table call the create method on the 
        // Gig model object. This returns a promise
        Gig.create({
            title,
            technologies,
            budget,
            description,
            contact_email
        }).then(gig => res.redirect('/gigs'))
            .catch(err => console.log(err));
    }
});

router.get('/search', (req, res) =>{
    let { term } = req.query;

    term = term.toLowerCase();

    Gig.findAll({ where: { technologies: { [Op.like]: '%' + term + '%' } } })
        .then(gigs => res.render('gigs', { gigs })) // The array name should be the same as the one iterated over in the gigs handlebar.
        .catch(err => console.log('An error occurred while searching.', err));
})

module.exports = router;