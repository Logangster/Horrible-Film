module.exports = function(sequelize, Sequelize) {
	
	var Film = sequelize.define('film', {
		filmTitle: { 
			type: Sequelize.STRING, 
			allowNull: false,
			validate: {
				notEmpty: true
			},
			unique: true
		}
	});
	
	return Film;
};