module.exports = function(sequelize, Sequelize) {
	
	var Profile = sequelize.define('Profile', {
		aboutMe: {
			type: Sequelize.TEXT,
			allowNull: false
		},
		
		favoriteFilms: {
			type: Sequelize.STRING,
			allowNull: false
		},
		
		links: {
			type: Sequelize.STRING,
			allowNull: false
		}
	});
	
	return Profile;
}