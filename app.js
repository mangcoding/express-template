const express = require('express')
const app = express()
// set the view engine to ejs
app.set('view engine', 'ejs');

// inside public directory.
app.use(express.static('public'));
app.use('/images', express.static('images'));

const webRoutes = require('./routes/web');

app.use('/', webRoutes);
module.exports = app;