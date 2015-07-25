module.exports = function(sequelize, Sequelize) {
	
	var Review = sequelize.define('review', {
		
		reviewTitle: {
			type: Sequelize.TEXT,
			validate: {
				notEmpty: true
			},
			allowNull: false	
		},
		
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