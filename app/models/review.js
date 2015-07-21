module.exports = function(sequelize, Sequelize) {
	
	var Review = sequelize.define('review', {
		reviewBody: {
			type: Sequelize.TEXT,
			validate: {
				notEmpty: true
			},
			allowNull: false
		},
		
		rating: {
			type: Sequelize.INTEGER,
			
		}
	});
	
	return Review;
}