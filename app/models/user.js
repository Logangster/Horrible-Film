module.exports = function(app) {
	var bcrypt 	  = require('bcrypt-nodejs');
	var Sequelize = require('sequelize');
	var sequelize = app.get('sequelize');
	
	var User = sequelize.define('User', {
		userName: { 
			type: Sequelize.STRING, 
			unique: true,
			validate: {
				notEmpty: true,
			},
			allowNull: false
		},
			
		email: { 
			type: Sequelize.STRING, 
			validate: {
				isEmail: true,
			},
			allowNull: false
		},
		
		password: { 
			type: Sequelize.STRING, 
			validate: {
				notEmpty: true,
			},
			allowNull: false,
			set : function(val) {
				var hash = bcrypt.hashSync(val);
				this.setDataValue('password', hash);
			}
		}
	});
	
	return User;
};