var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var sequelize = new Sequelize(process.env.DATABASE_URL || 'postgresql://logangsta@localhost:5432/horrible_film');
sequelize.sync();

//Import all the models except for the index.js file
fs.readdirSync(__dirname)
	.filter(function (file) {
	return file !== 'index.js';
})
.forEach(function (model) {
	var model = sequelize.import(path.join(__dirname, model));
	module.exports[model.name] = model;
});

//Define relationships here
(function(m) {
	m.user.hasOne(m.profile);
	m.profile.belongsTo(m.user);
	m.user.hasMany(m.review);
	m.review.belongsTo(m.user);
	m.film.hasMany(m.review);
	m.review.belongsTo(m.film);
})(module.exports);

module.exports.sequelize = sequelize;