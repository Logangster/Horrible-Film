var express 			= require('express');
var app					= express();
var bodyParser			= require('body-parser');
var config				= require('./config');
var fs 					= require('fs');
var Sequelize			= require('sequelize');
var path				= require('path');

// SETUP DATABASE
// ============================
var models = require('./app/models');
app.set('models', models);
app.set('sequelize', models.sequelize);

// SETUP MIDDLEWARE 
// ============================
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(express.static('public'));

// SETUP ROUTES
// =============================
fs.readdirSync(__dirname + '/app/routes').forEach( function(file) {
	app.use('/api', require('./app/routes/' + file)(express, app));
});

app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname, '/public/views/index.html'));
});

app.listen(config.port);