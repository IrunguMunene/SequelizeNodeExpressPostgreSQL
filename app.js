/*
    This is the most basic working template for an express http server.
    Other functionality will be added going forth so as to handle as
    many scenarios as possible.

    The comments are helpful notes for understanding what each part does.
 */

const express = require('express');
var Handlebars = require('handlebars');
const exphbs = require('express-handlebars');
/*
    The allowInsecurePrototypeAccess is done to avoid the error:
    Handlebars: Access has been denied to resolve the property “from” 
    because it is not an “own property” of its parent.

    Installation via npm install @handlebars/allow-prototype-access.
    express-handlebars does not allow you to specify runtime-options to 
    pass to the template function. This package can help you disable 
    prototype checks for you models.

    Only do this, if you have full control over the templates that are executed in the server.
*/
var {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const bodyParser = require('body-parser');
const path = require('path');
const dbContext = require('./config/dbcontext');

// Test that the we can connect to the database
dbContext.authenticate()
    .then(() => console.log('Connection established successfully'))
    .catch(err => console.log('Unable to connect to the database.', err));

// Create the server app variable
const serverApp = express();

// Create middleware for handlebars
serverApp.engine('handlebars', exphbs({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
// serverApp.engine('handlebars', exphbs({ defaultLayout: 'main' }));
// Set view engine to handlebars
serverApp.set('view engine', 'handlebars');

// Middleware to handle form submissions. This is
// why we have the body-parser. As the name suggests 
// it parses the body of the submitted form and reads
// the url encoded data making it part of the req.body.
// This is all that is needed to enable form submission.
serverApp.use(bodyParser.urlencoded({ extended: false }));

// Set the static folder. This makes it possible to serve some
// static content for example the layout of the site,
// the main .css, the landing page/index page.
serverApp.use(express.static(path.join(__dirname, '/public')));

// Index route.
serverApp.get('/', (req, res) => res.render('index', { layout: 'landing' }));

// Create gigs routes middleware
serverApp.use('/gigs', require('./routes/gigs'));

// Create a Port variable
const PORT = process.env.PORT || 5000;

// Initialize the server by calling listen and passing the PORT variable.
serverApp.listen(PORT, () => console.log(`Server started on port ${PORT}.......`));


