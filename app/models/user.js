module.exports = function(sequelize, Sequelize) {
	
	var bcrypt 	  = require('bcrypt-nodejs');

	var User = sequelize.define('User', {
		userName: { 
			type: Sequelize.STRING, 
			unique: true,
			validate: {
				notEmpty: true,
				isAlphanumeric: true,
				len: [5,23]
			},
			allowNull: false
		},
			
		email: { 
			type: Sequelize.STRING, 
			validate: {
				isEmail: true,
				notEmpty: true
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