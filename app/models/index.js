var fs = require('fs');
var path = require('path');
var config = require('../../config');
var Sequelize = require('sequelize');
var sequelize = new Sequelize(config.database);
sequelize.sync({ force: true });

fs.readdirSync(__dirname)
	.filter(function (file) {
	return file !== 'index.js';
})
.forEach(function (model) {
	var model = sequelize.import(path.join(__dirname, model));
	module.exports[model.name] = model;
});

(function(m) {
	m.User.hasOne(m.Profile);
	m.Profile.belongsTo(m.User);
})(module.exports);

module.exports.sequelize = sequelize;