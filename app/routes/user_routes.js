module.exports = function(express, app) {
	
	var bcrypt = require('bcrypt-nodejs');
	var router = express.Router();
	var User = app.get('models').User;
	var Profile = app.get('models').Profile;
	console.log(User);
	var jwt    = require('jsonwebtoken');
	var config = require('../../config');
	
	router.post('/authenticate', function(req, res) {
		//Find user to authenticate by userName
		User.find({ where: { userName: req.body.userName } }).then(function(user) {
			
			//Check if user exists
			if (user == null)
				return res.json({success:false});
			
			//Compare passwords
			var matches = bcrypt.compareSync(req.body.password, user.password);
			if (matches) {
				
				//Sign a token to send back to user since authentication was successful
				var token = jwt.sign({
					userName: user.userName,
				}, config.secret, {
					expiresInMinutes: 1440
				});

				return res.json({success: true, token: token});
			}
			else
				return res.json({success: false});	
		});
	});
	
	router.route('/users')
	
		// Get all users
		.get(function(req, res) {
			User.findAll()
			.then(
				function(users) {
					return res.json(users);		
				},
				function(err) {
					return res.json(err);
				}
			);
		})
		
		// Create new user
		.post(function(req, res) {
			
			User.create(req.body)
			.then(function(user) {
				
				Profile.create({aboutMe: 'test', favoriteFilms: '', links: ''})
				.then(function(profile) {
					user.setProfile(profile);
				});
				
				return res.json(user);
			},
			function(err) {
				return res.json(err);
			});
		})
		
	router.route('/users/:user_name')
	
		// Get user by userName
		.get(function(req, res) {
			User.findOne({ 
				where: { userName: req.params.user_name },
				include:[{ model: Profile}] 
			})
			.then(function(user) {
				if (user != null) {
					return res.json(user);
				} else {
					return res.json({ error: "Couldn't find user." });
				}
			});
		})
		
		// Remove user by userName
		.delete(function(req, res) {
			User.destroy({ where: { userName: req.params.user_name } })
			.then(function(user) {
				return res.json({success: true});
			}, function(err) {
				return res.json(err);
			});
		});
				
	return router;
};