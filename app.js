const express = require('express')
const app = express()
// set the view engine to ejs
app.set('view engine', 'ejs');
const webRoutes = require('./routes/web');

app.use('/', webRoutes);
module.exports = app;