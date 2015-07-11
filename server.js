var express 			= require('express');
var app					= express();
var bodyParser			= require('body-parser');
var fs 					= require('fs');
var Sequelize			= require('sequelize');
var path				= require('path');

// SETUP DATABASE/MODELS
// ============================
var models = require('./app/models');
app.set('models', models);
app.set('sequelize', models.sequelize);

// SETUP MIDDLEWARE 
// ============================
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	next();
});

// SETUP ROUTES
// =============================
fs.readdirSync(__dirname + '/app/routes').forEach( function(file) {
	app.use('/api', require('./app/routes/' + file)(express, app));
});

app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname, '/public/app/index.html'));
});

app.listen(process.env.port || 8080);